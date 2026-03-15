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
        <div className=" bg-white overflow-auto w-[20rem] backdrop-blur absolute right-0 top-[9rem] z-20 border">
          <div>
            <h1 className="bg-black text-white text-center font-bold">
              CART
              <button
                className="bg-black text-3xl text-white p-10"
                onClick={() => {
                  setDrawerIsVisible(false);
                }}
              >
                <IoIosArrowForward />
              </button>
            </h1>
          </div>
          {cart && cart.length > 0 ? (
            <>
              {cart?.map((item, idx) => (
                <div>
                  <div className=" border-b  py-5 " key={item?.product_id}>
                    <div className="flex justify-between items-center mx-4">
                      <div>
                        <img
                          src={item?.img}
                          alt={item?.name}
                          className="w-12 h-12 object-cover"
                        />
                      </div>{" "}
                      <div className="mt-5 flex-1 ml-3">
                        <h1 className="text-base text-black ">{item?.name}</h1>
                        <p className="text-s text-black">${item?.price}</p>
                        <div>
                          <button
                            onClick={() => removeFromCart(item?.product_id)}
                          >
                            <AiOutlineDelete />
                          </button>
                        </div>
                        <div>
                          <div className="border flex items-center">
                            <button
                              className="text-base text-black p-1"
                              onClick={() => {
                                updateQuantity(
                                  item?.product_id,
                                  Math.max(1, item?.quantity - 1),
                                );
                              }}
                            >
                              <IoIosArrowDown />
                            </button>
                            <span className="px-2">{item?.quantity}</span>
                            <button
                              className="text-base text-black p-1"
                              onClick={() => {
                                updateQuantity(
                                  item?.product_id,
                                  item?.quantity + 1,
                                );
                              }}
                            >
                              <IoIosArrowUp />
                            </button>
                          </div>
                        </div>
                        <div className="text-base text-black">
                          ${item?.total_price}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div>
                <button
                  className="bg-black text-white mt-5 px-10 py-3 ml-5"
                  onClick={() => {}}
                >
                  {" "}
                  SubTotal
                  <span className="text-base text-black right-2 absolute">
                    ${grandTotal}.00
                  </span>
                </button>
                <div className="relative">
                  <button
                    className="bg-black text-white text-center  mt-5 px-20 py-3 ml-5"
                    onClick={() => setPlaceOrder(true)}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
