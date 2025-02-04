import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";


import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
function App() {

  return (
    <>
      {/* React Router Setup */}
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Toaster position="bottom-center" />
      </BrowserRouter>
    </>
  );
}

export default App;
