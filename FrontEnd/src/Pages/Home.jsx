import React from 'react';
import { Typography} from '@mui/material';

function Home() {
  return (
    <main
        style={{
          backgroundImage: 'url("../../images/HomePageBusImage.jpg")',
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          height: "84vh",
        }}
      >
        <Typography variant="h4" align="center" sx={{ mt: 4 }}>
          Welcome to the  Bus Ticket Booking System!
        </Typography>
        <Typography variant="body1" align="center" sx={{ mt: 2 }}>
          Plan your travel and book your tickets easily and securely.
        </Typography>
      </main>
  )
}

export default Home