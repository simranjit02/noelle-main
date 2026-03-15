import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAtom } from "jotai";
import { finalOrder, cartProducts, finalPrice,drawer } from "../../store/jotaistore";
// import Search from './components/Search';
import {
  IoIosArrowUp,
  IoIosArrowDown,
  IoIosArrowForward,
} from "react-icons/io";
import { HiUserCircle, HiShoppingCart } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";

const Navbar = () => {
  const [cartButton, setCartButton] = useState(false);
  const [select, setSelect] = useState({});
  const [checkOut, setProductInfo] = useAtom(cartProducts);
  const [totalPrice, setTotalPrice] = useAtom(finalPrice);
  const[drawerIsVisible,setDrawerIsVisible] =useAtom(drawer);
  console.log("drawerIsVisible",drawerIsVisible)
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
  const[placeOrder, setPlaceOrder] =useState('false');
  console.log('placeOrder', placeOrder)
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
            : { ...item }
        )
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
            : { ...item }
        )
      );
    }
  };

  useEffect(() => {
    
    let data = 0;
    const grandTotals = boughtProducts?.map((item) => {
      
  
      data = Number(data) + Number(item?.totalPrice);
        
   
      
    });
    console.log("data++++++++++", data);
    setGrandTotal(data);
  }, [boughtProducts]);

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
          <div className="flex justify-between items-center w-32 mr-5">
            <div className="text-4xl text-white">
              <HiUserCircle />
            </div>
            <h3 className="text-base text-white hover:text-[#6a4a4c] ">
              Log in
            </h3>
            <div className="text-2xl text-white hover:text-[#6a4a4c] ">
              <button
                className=""
                onClick={() => {
                  setCartButton(cartButton(true));
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
       <div className=" bg-white overflow-auto w-[20rem] backdrop-blur absolute right-0 top-[9rem] z-20 border" > 
        <div>
          <h1 className="bg-black text-white text-center font-bold">
            CART
            <button
              className="bg-black text-3xl text-white p-10"
              onClick={() => {
                setCartButton(false);
              }}
            ><IoIosArrowForward/></button>
          </h1>
        </div>
        {boughtProducts?.map((item, idx) => (
          <div>
            <div className=" border-b  py-5 " key={item?.id}>
              <div className="flex justify-between items-center mx-4">
                <div>
                  <img src={item?.img} alt="" />
                </div>
               . <div className="mt-5">
                  <h1 className="text-base text-black ">{item?.name}</h1>
                  <p className="text-s text-black">${item?.Price}</p>
                  <div>
                    <button
                      onClick={() =>
                        setBoughtProducts(
                          boughtProducts?.filter(
                            (itema) => itema?.id !== item?.id
                          )
                        )
                      }
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                  <div>
                    <div className="border">
                      <button
                        className="text-base text-black"
                        onClick={() => {
                          addItems(select);

                          const contentData = boughtProducts.find(
                            (ite) => ite?.id === item?.id
                          );

                          contentData.quantity = item?.quantity + 1;
                          contentData.totalPrice =
                            item?.Price * contentData?.quantity;

                          setBoughtProducts(
                            boughtProducts?.map((val) =>
                              val?.id === item?.id ? { ...contentData } : val
                            )
                          );
                        }}
                      >
                        <IoIosArrowUp />
                      </button>
                      {item?.quantity}
                      <button
                        className="text-base text-black"
                       
                        onClick={() => {
                          delItems(select);
                          setTotalPrice(checkOut.Price * checkOut.quantity);
                          const contentData = boughtProducts.find(
                            (ite) => ite?.id === item?.id
                          );
                          contentData.quantity =
                            item?.quantity === 1 ? 1 : item?.quantity - 1;

                          contentData.totalPrice =
                            item?.Price * contentData?.quantity;

                          
                          console.log("contentData", contentData);
                          setBoughtProducts(
                            boughtProducts?.map((val) =>
                              val?.id === item?.id ? { ...contentData } : val
                            )
                          );
                        }}
                      >
                        <IoIosArrowDown />
                      </button>
                      
                    </div>
                  </div>
                  <div className="text-base text-black">
                    {" "}
                    ${item?.totalPrice}
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
            onClick={() => 

            setPlaceOrder(true)
          }
          >Place Order
           
                {/* <p className="text-base text-black mt-5">Order Placed Successfully</p> */}
                 </button>
 {/* ............................................drawer 2'..................................................... */}
    

    
       <div className="bg-white m-32 p-32 absolute text-center backdrop-blur-lg">

        <p className="text-xl font-bold text-black" onClick={() => {
          setPlaceOrder(true)
        }}>Order Placed Successfully</p>
        </div>
        
        
        </div> </div>
      </div>
         ):( <div></div> )}
    </div>
  );
};

export default Navbar;
