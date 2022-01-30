import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Detail from "./Pages/Detail";
const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/product/:id" element={<Detail />} />
    </Routes>
  );
};
export default MainRouter;
