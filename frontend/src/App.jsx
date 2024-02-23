import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AddBlog from "./pages/Add-Blog";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Homepage />} />
        <Route path={"/addblog"} element={<AddBlog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
