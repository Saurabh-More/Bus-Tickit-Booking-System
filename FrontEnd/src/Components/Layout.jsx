import { Outlet, useLocation } from 'react-router-dom';
import  Navbar from "../Components/Navbar";

function Layout() {
  const location = useLocation();

  // Define a mapping of paths to components
  const pages = {
    '/about': <></>,
    '/contact': <></>,
    '/bookings': <></>,
  };

  return (
    <div>
      <Navbar/>
      {pages[location.pathname] || <Outlet />}
    </div>
  );
}

export default Layout;
