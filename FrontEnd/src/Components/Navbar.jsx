import { AppBar, Box, Button, Stack, Toolbar, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { NavLink, Route, Routes, useLocation , useNavigate } from 'react-router-dom';
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import MyBookings from "../Pages/myBookings";
import LoginDialog from './Login';
import RegisterDialog from './Register';
import { useSelector, useDispatch } from "react-redux";
import { setUser } from '../redux/reducers/auth';

const Navbar = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const location = useLocation(); // Get current URL
  const navigate = useNavigate();
  
  const user= useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  
  // Handlers for Login Dialog
  const toggleLogin = () => setOpenLogin(prev => !prev);

  // Handlers for Register Dialog
  const toggleRegister = () => setOpenRegister(prev => !prev);

  // Handle Logout User
  const handleLogout = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Logging out...');
    try {
      const { data } = await axios.get('http://localhost:8000/api/v1/user/logout', { withCredentials: true });
      dispatch(setUser(false));
      toast.success(data.message, { id: toastId });
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Something went wrong', { id: toastId });
    }
  };

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/v1/user/check-auth', { withCredentials: true });
        if (data.isAuthenticated) {
          dispatch(setUser(true));
        }
      } catch (error) {
        dispatch(setUser(false));
      }
    };

    checkUserStatus();
  }, []);

  return (
    <>
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ backgroundColor: '#1976d2', padding: '1px 0' }}>
        <Toolbar>
          {/* Left Links */}
          <Box sx={{ flexGrow: 1 }}>
            <Stack direction="row" spacing={6}>
              <Typography component={NavLink} to="/" sx={navLinkStyle(location.pathname === '/')}>
                Home
              </Typography>
              <Typography component={NavLink} to="/about" sx={navLinkStyle(location.pathname === '/about')}>
                About
              </Typography>
              <Typography component={NavLink} to="/contact" sx={navLinkStyle(location.pathname === '/contact')}>
                Contact
              </Typography>
            </Stack>
          </Box>

          {/* Right Side - Auth Buttons */}
          {user ? (
            <Stack direction="row" spacing={4}>
              <Typography component={NavLink} to="/bookings" sx={{ ...navLinkStyle(location.pathname === '/bookings'), padding: '6px 16px' }}>
                My Bookings
              </Typography>
              <Button variant="outlined" color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Stack>
          ) : (
            <Stack direction="row" spacing={4}>
              <Button variant="outlined" color="inherit" onClick={toggleRegister}>
                Register
              </Button>
              <Button variant="outlined" color="inherit" onClick={toggleLogin}>
                Login
              </Button>
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      {/* Define Routes for About, Contact, and Home */}
      <Routes>
        <Route path="/about" element={<About />} /> {/* About route */}
        <Route path="/contact" element={<Contact />} /> {/* Contact route */}
        <Route path="/bookings" element={<MyBookings />} /> {/* Contact route */}
      </Routes>

      {/* Login Dialog */}
      <LoginDialog
        open={openLogin}
        handleClose={toggleLogin}
      />

      {/* Register Dialog */}
      <RegisterDialog
        open={openRegister}
        handleClose={toggleRegister}
      />
    </>
  );
};

// NavLink Styling with Conditional Active State
const navLinkStyle = (isActive) => ({
  color: isActive ? 'orange' : 'white', // Change color if active
  fontSize: '18px', // Increase font size if active
  textDecoration: 'none',
  display: 'inline-block', // Prevents layout shift
  transition: 'all 0.3s ease-in-out', // Smooth animation
  '&:hover': { transform: isActive ? '' : 'scale(1.3)' }
});

export default Navbar;
