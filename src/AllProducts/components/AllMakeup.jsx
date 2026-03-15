import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosAdd, IoIosClose } from "react-icons/io";
import { GrFormSubtract } from "react-icons/gr";
import { useAtom } from "jotai";
import { cartProducts } from "../../store/jotaistore";
import { NavLink } from "react-router-dom";
import Cart from "./Cart";
// import BestSellers from "../../HomePage/components/BestSellers";

const AllMakeup = () => {
  const [products, setProducts] = useState([]);
  console.log("products", products);
  const [isSecondImageVisible, setIsSecondImageVisible] = useState(null);
  const [onClickIcon, setOnClickIcon] = useState(false);

  const [product, setProduct] = useAtom(cartProducts);
  console.log("cartProducts", product);

  // const[dropdownopen,setDropDownOpen] =useState(false);

  const MakeupItems = (category) => {
    axios.get(" ../api.json").then((res) => {
      if (category)
        setProducts(
          res?.data.filter((arrElem) => arrElem?.category === category),
        );
      else setProducts(res?.data);
    });
  };
  console.log("MakeupItems", MakeupItems);

  useEffect(() => {
    MakeupItems();
  }, []);
  // const Categories=[All,Eyes,Face,Lips,BestSelle

  return (
    <div>
      <div className="skinCare">
        <h1 className="text-6xl text-white font-bold text-center py-32">
          {" "}
          Shop All
        </h1>
      </div>
      <div className="flex gap-10">
        <div className="bg-white p-10 w-1/5 ">
          <div className=" flex ">
            <h1 className="text-4xl text-black mb-5">Filter by</h1>
            <div className="dropdown">
              {/* <button onClick={ () => setDropDownOpen(dropdownopen)} className="border px-5 py-3">Sort by</button> */}
              {/* <select className="px-5 py-3 border ">
                <option value="">Name(A-Z)</option>
                <option value="">Name(Z-A)</option>
              </select> */}
            </div>
          </div>

          <div className="border-b border-t w-48  my-7">
            <div className="flex gap-7 mt-5">
              <p className="text-lg  text-black">Collection</p>
              <button className="" onClick={() => setOnClickIcon(!onClickIcon)}>
                {onClickIcon ? <GrFormSubtract /> : <IoIosAdd />}
              </button>
            </div>
            <div
              className={`${
                onClickIcon
                  ? `top-full opacity-100 visible delay-900 duration-500 h-48`
                  : `top=[110%"] duration-500 invisible opacity-0 h-[1px]`
              } my-5 h-48 w-32`}
            >
              <p
                className="text-base my-3 text-black"
                onClick={() => {
                  MakeupItems();
                }}
              >
                All
              </p>
              <p
                className="text-base my-3 text-black"
                onClick={() => {
                  MakeupItems("Eye");
                }}
              >
                Eyes
              </p>
              <p
                className="text-base my-3 text-black"
                onClick={() => {
                  MakeupItems("Face");
                }}
              >
                Face
              </p>
              <p
                className="text-base my-3 text-black"
                onClick={() => {
                  MakeupItems("Lips");
                }}
              >
                Lips
              </p>

              <p
                className="text-base my-3 text-black "
                onClick={() => {
                  MakeupItems();
                }}
              >
                Best Sellers
              </p>
            </div>
          </div>
          <div className="flex gap-2 text-2xl">
            <p
              className="text-base text-black"
              onClick={() => setOnClickIcon(!onClickIcon)}
            >
              Clear Filters {<IoIosClose />}
            </p>
            {/* {onClickIcon ? <hide>  : <MakeupItems />  }nn
             */}

            {/* <IoIosClose /> */}
          </div>
        </div>

        <div className="flex flex-wrap">
          {products?.map((item) => (
            <NavLink to="/Cart" className=" w-1/4">
              <div
                className=" p-5 bg-white w-full  "
                onClick={() => {
                  setProduct({ ...item, quantity: 1 });
                }}
              >
                <div
                  className=""
                  onMouseOver={() => setIsSecondImageVisible(item?.id)}
                  onMouseOut={() => setIsSecondImageVisible(null)}
                >
                  {isSecondImageVisible === item?.id ? (
                    <div className="  flex  ">
                      <img
                        src={item?.img2}
                        alt=""
                        className=" "
                        height="272"
                        width="272"
                      />
                    </div>
                  ) : (
                    <div className="  ">
                      <img src={item?.img} alt="" height="272" width="272" />
                    </div>
                  )}
                </div>
                <div className="ml-16">
                  <p className="">{item?.name}</p>
                  <p>{item?.code}</p>
                  <p>${item?.Price}</p>
                  {/* <p>{item?.des}</p> */}
                </div>
              </div>{" "}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllMakeup;
