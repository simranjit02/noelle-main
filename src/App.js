
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Navbar from './HomePage/components/Navbar';
import HomePage from './HomePage';


import Footer from './HomePage/components/Footer';
import Search from './HomePage/components/Search';
import AllMakeup from './AllProducts/components/AllMakeup';
import NewProducts from './AllProducts/components/NewProducts';
import BestSellers from './AllProducts/components/BestSellers';
import Face from './AllProducts/components/Face';
import Lips from './AllProducts/components/Lips';
import Eyes from './AllProducts/components/Eyes';
import Cart from './AllProducts/components/Cart';

function App() {
  return (
    <>
    {/*  */}
  {/* <Navbar /> */}
  {/* <HomePage /> */}
  {/* <AllMakeup /> */}
  {/* <NewProducts /> */}
  {/* <BestSellers /> */}
  {/* <Face /> */}
  {/* <Lips /> */}
  {/* <Eyes /> */}


  {/*  */}
  {/* <nav>
        <ul>
          <li>
            <Link to="/">SHOP ALL</Link>
            <Link to="New">New</Link>
            <Link to="Best Sellers">BEST SELLERS</Link>
            <Link to="/Face">FACE</Link>
            <Link to="/Lips">LIPS</Link>
            <Link to="/Eyes">EYES</Link>
            
          </li>
        </ul>
      </nav> */}
      <Search />
<Navbar/>
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
