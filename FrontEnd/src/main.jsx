import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { CssBaseline } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
import { UserContextProvider } from "./context/UserContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <HelmetProvider>
          <CssBaseline/>
          <div onContextMenu={(e) => e.preventDefault()}>
          <UserContextProvider>
            <App />
          </UserContextProvider>
          </div>
        </HelmetProvider>
  </StrictMode>,
)
