import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import {
  finalOrder,
  cartProducts,
  finalPrice,
  drawer,
} from "../../store/jotaistore";
import useCart from "../../hooks/useCart";
// import Search from './components/Search';
import {
  IoIosArrowUp,
  IoIosArrowDown,
  IoIosArrowForward,
} from "react-icons/io";
import { HiUserCircle, HiShoppingCart } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";

const Navbar = () => {
  const navigate = useNavigate();
  const [cartButton, setCartButton] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [select, setSelect] = useState({});
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [checkOut, setProductInfo] = useAtom(cartProducts);
  const [totalPrice, setTotalPrice] = useAtom(finalPrice);
  const [drawerIsVisible, setDrawerIsVisible] = useAtom(drawer);
  console.log("drawerIsVisible", drawerIsVisible);
  console.log("Cart from useCart:", cart);
  // const[drawerIsVisible2,setDrawerIsVisible2] =useState(false);

  const array = [
    {
      link: "Home",
      url: "/",
    },
    {
      link: "All Makeup",
      url: "/AllMakeup",
    },
    {
      link: "New",
      url: "/NewProducts",
    },
    {
      link: "Best Sellers",
      url: "BestSellers",
    },
    {
      link: "Eyes",
      url: "/Eyes",
    },
    {
      link: "Lips",
      url: "/Lips",
    },
    {
      link: "Face",
      url: "/Face",
    },
  ];
  const [boughtProducts, setBoughtProducts] = useAtom(finalOrder);
  const [finalresult] = useAtom(finalPrice);
  console.log("", boughtProducts);

  const [orders, setOrders] = useState([]);
  const [grandTotal, setGrandTotal] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [placeOrder, setPlaceOrder] = useState("false");
  console.log("placeOrder", placeOrder);
  const addItems = (select) => {
    const productExist = orders?.find((item) => item.id === select.id)?.id;

    if (productExist) {
      setOrders(
        orders.map((item) =>
          item.id === select.id
            ? {
                ...item,
                quantity: (item?.quantity && Number(item?.quantity) + 1) || 1,
              }
            : { ...item },
        ),
      );
    }
  };
  const delItems = (select) => {
    const productExist = orders?.find((item) => item.id === select.id)?.id;
    if (productExist) {
      setOrders(
        orders.map((item) =>
          item.id === select.id
            ? { ...item, quantity: (item?.quantity && item?.quantity - 1) || 1 }
            : { ...item },
        ),
      );
    }
  };

  useEffect(() => {
    let total = 0;
    if (cart && cart.length > 0) {
      total = cart.reduce((sum, item) => sum + (item?.total_price || 0), 0);
    }
    setGrandTotal(total);
  }, [cart]);

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userNameStored = localStorage.getItem("userName");
    setIsLoggedIn(loggedIn);
    if (loggedIn && userNameStored) {
      setUserName(userNameStored);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setUserName("");
    navigate("/");
  };

  return (
    <div className="primary_color p-7 bg-[#593735] ">
      <div className=" ">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl text-white ml-5 font-bold">Noelle</h1>
          </div>
          <div className="w-[50%] flex justify-between">
            {/* <ul className=" flex justify-between  text-l    w-full ">
              <li className=" text-white hover:text-[#6a4a4c] ">SHOP ALL</li>
              <li className=" text-white hover:text-[#6a4a4c] ">HOME</li>
              <li className=" text-white hover:text-[#6a4a4c] ">BESTSELLERS</li>
              <li className=" text-white hover:text-[#6a4a4c] ">FACE</li>
              <li className=" text-white hover:text-[#6a4a4c] ">LIPS</li>
              <li className=" text-white hover:text-[#6a4a4c] ">EYES</li>
            </ul> */}
            {array?.map((item) => (
              <div className=" flex  text-xl  w-auto ">
                <NavLink
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? " text-white underline underline-offset-4 "
                        : "text-white"
                    } `
                  }
                  to={item?.url}
                >
                  {item?.link}
                </NavLink>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center gap-4 mr-5">
            <div
              className="text-4xl text-white cursor-pointer hover:text-[#b8a09f] transition"
              onClick={() => !isLoggedIn && navigate("/login")}
              title={isLoggedIn ? `Logged in as ${userName}` : "Click to login"}
            >
              <HiUserCircle />
            </div>
            {isLoggedIn ? (
              <>
                <div className="flex flex-col text-center">
                  <h3 className="text-xs md:text-sm text-white cursor-pointer hover:text-[#b8a09f] transition">
                    {userName}
                  </h3>
                  <p
                    className="text-xs text-[#b8a09f] cursor-pointer hover:underline"
                    onClick={handleLogout}
                  >
                    Logout
                  </p>
                </div>
              </>
            ) : (
              <div className="flex text-white cursor-pointer text-xs md:text-sm">
                <NavLink
                  to="/login"
                  className="hover:text-[#b8a09f] transition hover:underline"
                >
                  Log in
                </NavLink>
                <span className="mx-2">/</span>
                <NavLink
                  to="/register"
                  className="hover:text-[#b8a09f] transition hover:underline"
                >
                  Sign up
                </NavLink>
              </div>
            )}
            <div className="text-2xl text-white cursor-pointer">
              <button
                className=""
                onClick={() => {
                  setDrawerIsVisible(!drawerIsVisible);
                }}
              >
                <HiShoppingCart />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ------------------------------------------drawer---------------------------------------- */}

      {/* <div className=""> */}
      {drawerIsVisible ? (
        <div className="bg-white overflow-hidden w-full sm:w-80 md:w-96 backdrop-blur fixed right-0 top-[6rem] z-20 border shadow-lg max-h-[calc(100vh-6rem)] flex flex-col rounded-none sm:rounded">
          <div>
            <h1 className="bg-black text-white text-center font-bold text-lg px-4 py-3 flex items-center justify-between">
              CART
              <button
                className="bg-black text-2xl text-white p-0 ml-2 hover:text-gray-300 transition"
                onClick={() => {
                  setDrawerIsVisible(false);
                }}
                title="Close cart"
              >
                <IoIosArrowForward />
              </button>
            </h1>
          </div>

          {cart && cart.length > 0 ? (
            <>
              {/* Scrollable cart items */}
              <div className="overflow-y-auto flex-1">
                {cart?.map((item, idx) => (
                  <div key={item?.product_id}>
                    <div className="border-b py-4 px-3">
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-shrink-0">
                          <img
                            src={item?.img}
                            alt={item?.name}
                            className="w-14 h-14 object-cover rounded"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h1 className="text-sm font-semibold text-black truncate">
                            {item?.name}
                          </h1>
                          <p className="text-xs text-gray-600 mt-1">
                            ${parseFloat(item?.price).toFixed(2)}
                          </p>

                          {/* Quantity Controls */}
                          <div className="mt-2">
                            <div className="border flex items-center w-fit rounded">
                              <button
                                className="text-sm text-black p-1.5 hover:bg-gray-100"
                                onClick={() => {
                                  updateQuantity(
                                    item?.product_id,
                                    Math.max(1, item?.quantity - 1),
                                  );
                                }}
                                title="Decrease"
                              >
                                <IoIosArrowDown size={14} />
                              </button>
                              <span className="px-2 text-sm font-semibold">
                                {item?.quantity}
                              </span>
                              <button
                                className="text-sm text-black p-1.5 hover:bg-gray-100"
                                onClick={() => {
                                  updateQuantity(
                                    item?.product_id,
                                    item?.quantity + 1,
                                  );
                                }}
                                title="Increase"
                              >
                                <IoIosArrowUp size={14} />
                              </button>
                            </div>
                          </div>

                          {/* Price and Delete */}
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-sm font-semibold text-black">
                              $
                              {parseFloat(
                                item?.total_price ||
                                  item?.price * item?.quantity,
                              ).toFixed(2)}
                            </p>
                            <button
                              onClick={() => removeFromCart(item?.product_id)}
                              className="text-red-500 hover:text-red-700 text-lg transition"
                              title="Remove item"
                            >
                              <AiOutlineDelete />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sticky footer with subtotal and checkout */}
              <div className="border-t bg-gray-50 p-4 space-y-3">
                <div className="flex justify-between items-center px-2">
                  <span className="font-semibold text-black">Subtotal:</span>
                  <span className="text-lg font-bold text-[#593735]">
                    ${parseFloat(grandTotal || 0).toFixed(2)}
                  </span>
                </div>
                <button
                  className="w-full bg-black text-white font-bold py-2 px-3 rounded hover:bg-gray-800 transition text-sm"
                  onClick={() => setPlaceOrder(true)}
                >
                  Place Order
                </button>
                <button
                  className="w-full border-2 border-black text-black font-bold py-2 px-3 rounded hover:bg-gray-100 transition text-sm"
                  onClick={() => {
                    setDrawerIsVisible(false);
                  }}
                >
                  Continue Shopping
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-6">
              <p className="text-gray-500 text-center">Your cart is empty</p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
