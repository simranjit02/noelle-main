import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./HomePage/components/Navbar";
import HomePage from "./HomePage";

import Footer from "./HomePage/components/Footer";
import AllMakeup from "./AllProducts/components/AllMakeup";
import NewProducts from "./AllProducts/components/NewProducts";
import BestSellers from "./AllProducts/components/BestSellers";
import Face from "./AllProducts/components/Face";
import Lips from "./AllProducts/components/Lips";
import Eyes from "./AllProducts/components/Eyes";
import Cart from "./cart/Cart";

// Auth imports
import Register from "./auth/Register";
import Login from "./auth/Login";

function App() {
  return (
    <>
      {/* Auth Routes - no Navbar/Footer */}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      {/* Main routes with Navbar/Footer */}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/AllMakeup" element={<AllMakeup />} />
        <Route path="/NewProducts" element={<NewProducts />} />
        <Route path="/BestSellers" element={<BestSellers />} />
        <Route path="/Lips" element={<Lips />} />
        <Route path="/Face" element={<Face />} />
        <Route path="/Eyes" element={<Eyes />} />
        <Route path="/Cart" element={<Cart />} />

        {/* <Route path="/Axios/:userId" element={<UserProfile />}></Route> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
