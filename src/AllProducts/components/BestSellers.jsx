import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { cartProducts } from "../../store/jotaistore";

import { NavLink } from "react-router-dom";
const BestSellers = () => {
  const [bestItems, setBestItems] = useState([]);
  const [isSecondImageVisible, setIsSecondImageVisible] = useState(null);
  const [product, setProduct] = useAtom(cartProducts);

  const BestMakeup = () => {
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
    fetch(`${apiUrl}/api/products.php?new=1`)
      .then((res) => res.json())
      .then((data) => setBestItems(data))
      .catch((err) => console.error("Error fetching best sellers:", err));
  };

  useEffect(() => {
    BestMakeup();
  }, []);
  return (
    <div className="">
      <div className="bestSellers text-white text-center p-32">
        <h1 className="text-8xl font-bold">BEST SELLERS</h1>
      </div>
      <div className="">
        <div className="   ">
          <div className="flex-wrap bg-white py-32 px-48 flex flex-wrap">
            {bestItems?.map((item) => (
              <NavLink
                to={`/ProductDetail?id=${item.id}`}
                className=" p-5  bg-white w-1/3  "
              >
                <div
                  className=""
                  onClick={() => {
                    setProduct({ ...item, quantity: 1 });
                  }}
                >
                  <div className=" mx-10" key={item?.id}>
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
                          <img
                            src={item?.img}
                            alt=""
                            height="272"
                            width="272"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-black ml-16">{item?.name}</p>
                  <p className="text-black ml-16">{item?.code}</p>
                  <p className="text-black ml-16">{item?.Price}</p>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellers;
