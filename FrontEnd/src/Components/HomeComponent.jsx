// import React, { useState,useEffect } from 'react';
// import { toast } from 'react-hot-toast';
// import axios from 'axios';
// import { AppBar, Toolbar, Typography, Button } from '@mui/material';
// import LoginDialog from './Login'; // Assuming LoginDialog is in the same directory
// import RegisterDialog from './Register'; // Assuming RegisterDialog is in the same directory

// const HomePage = () => {
//   const [openLogin, setOpenLogin] = useState(false);
//   const [openRegister, setOpenRegister] = useState(false);
//   const [user, setUser] = useState(false); // Set user state to manage login status
  
//   // Handlers for Login Dialog
//   const handleLoginOpen = () => setOpenLogin(true);
//   const handleLoginClose = () => setOpenLogin(false);
  
//   // Handlers for Register Dialog
//   const handleRegisterOpen = () => setOpenRegister(true);
//   const handleRegisterClose = () => setOpenRegister(false);
  
//   // Handle Logout User
//   const handleLogout = async (e) => 
//     {
//     e.preventDefault();
//     const toastId = toast.loading('Logging out...');
//     try 
//     {
//       // Sending logout request to backend
//       const { data } = await axios.get('http://localhost:8000/api/v1/user/logout', {withCredentials: true});
      
//       setUser(false); // Reset user state to false
//       toast.success(data.message, { id: toastId }); // Display success toast
//     } 
//     catch (error) 
//     {
//       toast.error(error?.response?.data?.error || 'Something went wrong',{ id: toastId });
//     }
//   };


//   // Handle login success
//   const handleLoginSuccess = () => {
//     setUser(true); // Set user state to true upon successful login
//     handleLoginClose(); // Close the login dialog
//   };

//   // Handle register success
//   const handleRegisterSuccess = () => {
//     setUser(true); // Set user state to true upon successful register
//     handleRegisterClose(); // Close the register dialog
//   };


//   useEffect(() => {
//     const checkUserStatus = async () => {
//       try 
//       {
//         const { data } = await axios.get('http://localhost:8000/api/v1/user/check-auth', {
//           withCredentials: true, // Send cookies with the request
//         });

//         if (data.isAuthenticated) 
//         {
//           setUser(true);
//         }
//       } 
//       catch (error) 
//       {
//         setUser(false); 
//       }
//     };

//     checkUserStatus();
//   }, []);



//   return (
//     <div>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             Bus Ticket Booking System
//           </Typography>
//           {
//             user ? (
//               <>
//                 <Button color="inherit">
//                   My Bookings
//                 </Button>
//                 <Button color="inherit" onClick={handleLogout}>
//                   Logout
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Button color="inherit" onClick={handleLoginOpen}>
//                   Login
//                 </Button>
//                 <Button color="inherit" onClick={handleRegisterOpen}>
//                   Register
//                 </Button>
//               </>
//             )
//           }
//         </Toolbar>
//       </AppBar>

//       <main
//         style={
//     user
//       ? {
//           backgroundImage: 'url("../../images/HomePageBusImage.jpg")',
//           backgroundSize: "contain",
//           backgroundRepeat: "no-repeat",
//           height: "84vh",
//         }
//       : {}
//   }
//       >
      
//         <Typography variant="h4" align="center" sx={{ mt: 4 }}>
//           Welcome to the  Bus Ticket Booking System!
//         </Typography>
//         <Typography variant="body1" align="center" sx={{ mt: 2 }}>
//           Plan your travel and book your tickets easily and securely.
//         </Typography>
//       </main>

//       {/* Login Dialog */}
//       <LoginDialog
//         open={openLogin}
//         handleClose={handleLoginClose}
//         handleSignUp={handleRegisterOpen} // Open Register Dialog from Login Dialog
//         onLoginSuccess={handleLoginSuccess} // Pass login success handler to LoginDialog
//       />

//       {/* Register Dialog */}
//       <RegisterDialog
//         open={openRegister}
//         setUser={setUser}
//         handleClose={handleRegisterClose}
//         onRegisterSuccess={handleRegisterSuccess}
//       />
//     </div>
//   );
// };

// export default HomePage;
