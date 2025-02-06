import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import {Button,Box,TextField,Dialog,DialogActions,DialogContent,DialogTitle} from "@mui/material";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/auth";


const RegisterDialog = ({ open, handleClose}) => {
  const [username, setUserName] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const HandleRegister = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    const toastId = toast.loading("Registering...");
    setIsSubmitting(true);

    // Validation
    if (!username || !name || !password) {
      toast.error("Please fill in all fields.", { id: toastId });
      setTimeout(() => setIsSubmitting(false), 4000); // Re-enable the button
      return;
    }

    try {
      // Sending registration data to the backend
      const { data } = await axios.post("http://localhost:8000/api/v1/user/register", {
        name,
        username,
        password,
      },{withCredentials: true});

      // Success message and close dialog
      toast.success(data.message, { id: toastId });
      dispatch(setUser(true));
      handleClose();
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "Something Went Wrong",
        { id: toastId }
      );
    } finally {
      setTimeout(() => setIsSubmitting(false), 4000);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" PaperProps={{
      sx: { minHeight: "450px", minWidth: "350px" },
    }}>
      <DialogTitle>Register</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "grid",
            gap: "2rem",
            marginTop: "1rem",
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            label="UserName"
            variant="outlined"
            id="UserName"
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
            type="password"
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="error"
          variant="contained"
          sx={{
            marginRight: "3rem",
            marginBottom: "3rem",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={HandleRegister}
          variant="contained"
          disabled={isSubmitting}
          sx={{
            marginRight: "2rem",
            marginBottom: "3rem",
            backgroundColor: "green", // Green color for the button
            "&:hover": {
              backgroundColor: "darkgreen", // Darker green on hover
            },
          }}
        >
          Register
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterDialog;
