import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import useCart from "../../hooks/useCart";

import {
  cartProducts,
  finalOrder,
  finalPrice,
  drawer,
} from "../../store/jotaistore";

// import { useAtom } from "jotai";
import axios from "axios";
import { motion } from "framer-motion";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowUp,
  IoIosArrowDown,
  IoIosHeartEmpty,
  IoIosAdd,
} from "react-icons/io";
import { GrFormSubtract } from "react-icons/gr";
import HomePage from "../../HomePage";
// import { useNavigate } from "react-router-dom";
const Cart = () => {
  // const navigate=useNavigate();
  const { cart, loading, error, updateQuantity, removeFromCart } = useCart();
  const [cartItems, setCartItems] = useState([]);
  console.log("cartItems from hook:", cart);
  const [isSecondImageVisible, setIsSecondImageVisible] = useState(null);
  //   const [home,setHome] =useState(false);
  const [onClickIcon, setOnClickIcon] = useState(false);
  const [onClickProduct, setOnClickProduct] = useState(false);
  const [onClickShipping, setOnClickShipping] = useState(false);
  const [select, setSelect] = useState({});
  const [orders, setOrders] = useState([]);
  console.log("orders", orders);
  const [checkOut, setProductInfo] = useAtom(cartProducts);
  console.log("checkOut", checkOut);
  const [boughtItems, setBoughtItems] = useAtom(finalOrder);
  // console.log('boughtItems', boughtItems)
  // const [peritem, setPeritem] = (boughtItems.Price*boughtItems.quantity)
  const [totalPrice, setTotalPrice] = useAtom(finalPrice);
  const [isVisible, setIsVisible] = useState(false);
  const [drawerIsVisible, setDrawerIsVisible] = useAtom(drawer);

  // Update cart display whenever cart changes from useCart hook
  useEffect(() => {
    if (cart && cart.length > 0) {
      setCartItems(cart);
      console.log("Cart updated from hook:", cart);
    }
  }, [cart]);

  console.log("totalPrice", totalPrice);

  //   const[cartProducts,]= useAtom(cartProducts)

  // const perItem = orders.Price * orders.quantity;
  const AddCart = (id) => {
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
    const url = id
      ? `${apiUrl}/api/products.php?id=${id}`
      : `${apiUrl}/api/products.php`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setCartItems(data))
      .catch((err) => console.error("Error fetching cart items:", err));
  };

  // Handle quantity increase
  const addItems = async (productId) => {
    const item = cart?.find(
      (item) =>
        String(item.product_id) === String(productId) ||
        String(item.id) === String(productId),
    );
    if (item) {
      const newQty = (item?.quantity || 1) + 1;
      await updateQuantity(productId, newQty);
      console.log("Quantity increased for product:", productId);
    }
  };

  // Handle quantity decrease
  const delItems = async (productId) => {
    const item = cart?.find(
      (item) =>
        String(item.product_id) === String(productId) ||
        String(item.id) === String(productId),
    );
    if (item && item?.quantity > 1) {
      const newQty = (item?.quantity || 1) - 1;
      await updateQuantity(productId, newQty);
      console.log("Quantity decreased for product:", productId);
    }
  };

  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="bg-white p-32 "
        //  onClick={() => setIsVisible(false)}
      >
        <div className="flex justify-between mt-10">
          <div className=" flex ">
            <h1 className="text-lg text-black" onClick={() => {}}>
              HOME
            </h1>
            <p
              className="text-lg text-black"
              onClick={() => {
                AddCart("Eye");
              }}
            >
              /EYES
            </p>
            <h1 className="text-lg text-black">/Dazzle Pink Eyeshadow</h1>
          </div>
          <div className="flex gap-5 justify-between  items-center">
            <div className=" flex gap-0.5">
              <span className="text-black text-lg">
                <IoIosArrowBack />
              </span>
              <h1 className="text-lg text-black">Prev</h1>
            </div>
            <h1 className="text-lg text-black">|</h1>

            <div className="flex gap-0.5">
              <h1 className="text-lg text-black">Next</h1>
              <span className="text-black text-lg">
                <IoIosArrowForward />
              </span>
            </div>
          </div>
        </div>
        {/* ....................................fsfdsfes................................... */}

        <div className="flex w-auto">
          <div className="" key={checkOut?.id}>
            <div className="border W-40">
              <div
                className=""
                onMouseOver={() => setIsSecondImageVisible(checkOut?.id)}
                onMouseOut={() => setIsSecondImageVisible(null)}
              >
                {isSecondImageVisible === checkOut?.id ? (
                  <div className="  flex  ">
                    <img
                      src={checkOut?.img2}
                      alt=""
                      className=" "
                      height="272"
                      width="272"
                    />
                  </div>
                ) : (
                  <div className="  ">
                    <img src={checkOut?.img} alt="" height="272" width="272" />
                  </div>
                )}
              </div>
              <img src="" alt="" />
            </div>
            <p className="text-lg text-black mt-7">
              I'm a product description. This is a great place to "sell" your
              product and grab buyers' attention. Describe your product clearly
              and concisely. Use unique keywords. Write your own description
              instead of using manufacturers' copy.
            </p>
          </div>
          <div>
            <div className=" ml-9  opacity-80 ">
              <div className=" ">
                <h1 className="text-3xl text-black mt-5">{checkOut?.name}</h1>
                <h1 className="text-xl text-black mt-3">{checkOut?.code}</h1>
                <h1 className="text-xl text-black mt-5">${checkOut?.Price}</h1>
                {/* <h1 className="text-xl text-black mt-5">{checkOut?.des}</h1> */}
              </div>
            </div>
            <div className="px-10 ">
              <div className=" ">
                <h1 className="text-lg text=-black mt-5"> Quantity</h1>
                <h1 className="border px-1 py-2 w-12 opacity-80">
                  <span className="flex gap-2 ">
                    {/* {orders?.map((item)=>(
                    
                    <div className="">{orders?.quantity}</div>
                  ))} */}

                    <div>
                      <div>
                        <button
                          className=""
                          onClick={() => {
                            addItems(select);
                            setProductInfo({
                              ...checkOut,
                              quantity:
                                checkOut?.quantity > 1
                                  ? checkOut?.quantity - 1
                                  : 1,
                            });
                          }}
                        >
                          <IoIosArrowUp />
                        </button>
                      </div>
                      {checkOut?.quantity}
                      <div>
                        <button
                          onClick={() => {
                            delItems(select);
                            setProductInfo({
                              ...checkOut,
                              quantity: checkOut?.quantity + 1,
                            });
                          }}
                        >
                          <IoIosArrowDown />
                        </button>
                      </div>
                    </div>
                  </span>
                </h1>
              </div>

              <div>
                {/* {isVisible && ! checkOut && ( */}
                <div className="flex items-center gap-3">
                  <button
                    className=" bg-black px-20 py-3 text-white my-7 text-lg"
                    onClick={() => {
                      setBoughtItems((prev) => [
                        ...prev,
                        {
                          ...checkOut,
                          id: Math.random(),
                          totalPrice: checkOut?.Price,
                        },
                      ]);
                      setTotalPrice(checkOut.Price * checkOut.quantity);
                      setDrawerIsVisible(true);
                    }}
                  >
                    Add to Cart
                  </button>
                  <span className=" text-black text-xl">
                    <IoIosHeartEmpty />
                  </span>
                </div>
                {/* )} */}
                {/* <div>
              <button
              className="bg-black text-white text-lg px-32 py-3"
              onClick={() => {}}
              >
              Buy Now
              </button>
            </div> */}
                <div className=" ">
                  <div className="flex justify-between mt-7">
                    <p>
                      PRODUCT INFO
                      <button
                        className="text-black"
                        onClick={() => setOnClickProduct(!onClickProduct)}
                      >
                        {onClickProduct ? <GrFormSubtract /> : <IoIosAdd />}
                      </button>
                    </p>
                  </div>
                  <div
                    className={`${
                      onClickProduct
                        ? `top-full opacity-100 visible delay-900 duration-500 h-48`
                        : `top=[110%"] duration-500 invisible opacity-0 h-[1px]`
                    } my-5 `}
                  >
                    <p className="text-base text-black mt-5">
                      I'm a product detail. I'm a great place to add more
                      information about your product such as sizing, material,
                      care and cleaning instructions. This is also a great space
                      to write what makes this product special and how your
                      customers can benefit from this item.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between py-7 border-b border-t">
                    <p className="text-base text-black mt-5">
                      RETURN & REFUND POLICY
                    </p>
                    <button
                      className=""
                      onClick={() => setOnClickIcon(!onClickIcon)}
                    >
                      {onClickIcon ? <GrFormSubtract /> : <IoIosAdd />}
                    </button>
                  </div>
                  <div
                    className={`${
                      onClickIcon
                        ? `top-full opacity-100 visible delay-900 duration-500 h-48`
                        : `top=[110%"] duration-500 invisible opacity-0 h-[1px]`
                    } my-5`}
                  >
                    <p className="text-base text-black my-5">
                      I’m a Return and Refund policy. I’m a great place to let
                      your customers know what to do in case they are
                      dissatisfied with their purchase. Having a straightforward
                      refund or exchange policy is a great way to build trust
                      and reassure your customers that they can buy with
                      confidence.
                    </p>
                  </div>
                </div>

                <div className=" flex  justify-between my-7 ">
                  <p className="w-full">SHIPPING INFO</p>
                  <button
                    className="text-black"
                    onClick={() => setOnClickShipping(!onClickShipping)}
                  >
                    {onClickShipping ? <GrFormSubtract /> : <IoIosAdd />}
                  </button>
                </div>
                <div
                  className={`${
                    onClickShipping
                      ? `top-full opacity-100 visible delay-900 duration-500 h-48`
                      : `top=[110%"] duration-500 invisible opacity-0 h-[1px]`
                  } my-5 `}
                >
                  <p className="text-base text-black mt-5">
                    I'm a shipping policy. I'm a great place to add more
                    information about your shipping methods, packaging and cost.
                    Providing straightforward information about your shipping
                    policy is a great way to build trust and reassure your
                    customers that they can buy from you with confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* )} */}
        {/* ///------------------------------drawer-----------------------///// */}
      </div>
    </motion.div>
  );
};

export default Cart;
