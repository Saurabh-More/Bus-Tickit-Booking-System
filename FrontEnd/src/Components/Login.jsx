import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import {
  Button,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const LoginDialog = ({open,handleClose, handleSignUp, onLoginSuccess}) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const HandleLogin = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    const toastId = toast.loading('Logging In...');
    setIsSubmitting(true);

    if (!username || !password) {
      toast.error('Please fill in all fields.', { id: toastId });
      setTimeout(() => setIsSubmitting(false), 4000); // Re-enable the button
      return;
    }

    try {
      // Sending login data to the backend
      const { data } = await axios.post('http://localhost:8000/api/v1/user/login', {
        username: username,
        password: password,
      },{withCredentials: true});

      console.log("Data : ",data);

      // Success message and dialog close
      toast.success(data.message, { id: toastId });
      onLoginSuccess(); // Notify HomePage of successful login
      handleClose(); // Close the login dialog

    } catch (error) {
      toast.error(
        error?.response?.data?.error || 'Something Went Wrong',
        { id: toastId }
      );
    } finally {
      setTimeout(() => setIsSubmitting(false), 4000); // Reset state
    }
  };


  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" PaperProps={{ sx: { minHeight: '350px', minWidth: '350px' } }}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'grid',
            gap: '2rem',
            marginTop: '1rem',
          }}
        >
          <TextField
            label="UserName"
            variant="outlined"
            id="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            variant="outlined"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error" variant="contained" sx={{ marginRight: '3rem', marginBottom: '2.5rem' }}>
          Cancel
        </Button>
        <Button
          onClick={HandleLogin}
          variant="contained"
          disabled={isSubmitting}
          sx={{
            marginRight: '3.5rem',
            marginBottom: '2.5rem',
            backgroundColor: 'green', // Green color for the button
            '&:hover': {
              backgroundColor: 'darkgreen', // Darker green on hover
            },
          }}
        >
          Log In
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
