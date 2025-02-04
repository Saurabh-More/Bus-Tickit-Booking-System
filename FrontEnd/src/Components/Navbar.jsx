import { AppBar, Box, Button, Stack, Toolbar, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import MyBookings from "../Pages/myBookings";
import LoginDialog from './Login';
import RegisterDialog from './Register';

const Navbar = () => {
  const [user, setUser] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const location = useLocation(); // Get current URL

  // Handlers for Login Dialog
  const handleLoginOpen = () => setOpenLogin(true);
  const handleLoginClose = () => setOpenLogin(false);

  // Handlers for Register Dialog
  const handleRegisterOpen = () => setOpenRegister(true);
  const handleRegisterClose = () => setOpenRegister(false);

  // Handle Logout User
  const handleLogout = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Logging out...');
    try {
      const { data } = await axios.get('http://localhost:8000/api/v1/user/logout', { withCredentials: true });
      setUser(false);
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Something went wrong', { id: toastId });
    }
  };

  // Handle login success
  const handleLoginSuccess = () => {
    setUser(true);
    handleLoginClose();
  };

  // Handle register success
  const handleRegisterSuccess = () => {
    setUser(true);
    handleRegisterClose();
  };

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/v1/user/check-auth', { withCredentials: true });
        if (data.isAuthenticated) {
          setUser(true);
        }
      } catch (error) {
        setUser(false);
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
              <Button variant="outlined" color="inherit" onClick={handleRegisterOpen}>
                Register
              </Button>
              <Button variant="outlined" color="inherit" onClick={handleLoginOpen}>
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
        handleClose={handleLoginClose}
        handleSignUp={handleRegisterOpen}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Register Dialog */}
      <RegisterDialog
        open={openRegister}
        handleClose={handleRegisterClose}
        onRegisterSuccess={handleRegisterSuccess}
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
