import React from "react";
// import Navbar from './components/Navbar';
import Header from "./HomePage/components/Header";
// import Footer from './components/Footer';
import FollowUs from "./HomePage/components/FollowUs";
import BestSellers from "./HomePage/components/BestSellers";
import ShopLips from "./HomePage/components/ShopLips";
import Trending from "./HomePage/components/Trending";
import DiscoverProducts from "./HomePage/components/DiscoverProducts";
import Skin from "./HomePage/components/Skin";

const HomePage = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Header />
      <BestSellers />
      <ShopLips />
      <Trending />
      <DiscoverProducts />
      <Skin />
      <FollowUs />
    </div>
  );
};

export default HomePage;
