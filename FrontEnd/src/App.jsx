import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";


import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import UserDetails from "./Pages/userDetails";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import MyBookings from "./Pages/myBookings";

function App() {

  return (
    <>
      {/* React Router Setup */}
      <BrowserRouter>
        <Routes>
          <Route  element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/bookings" element={<MyBookings/>}/>
            <Route path="/userDetails/:name" element={<UserDetails />}/>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster position="bottom-center" />
      </BrowserRouter>
    </>
  );
}

export default App;
