import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useAtom } from "jotai";
import { cartProducts } from "../../store/jotaistore";

const Eyes = () => {
  // const [product, setProduct] = useAtom(cartProducts);
  const [eyesItems, setEyesItems] = useState([]);
  const [isSecondImageVisible, setIsSecondImageVisible] = useState(null);
  const [product, setProduct] = useAtom(cartProducts);
  // const [select, setSelect] = useState({});
  const EyesMakeup = () => {
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
    fetch(`${apiUrl}/api/products.php?category=Eye`)
      .then((res) => res.json())
      .then((data) => setEyesItems(data))
      .catch((err) => console.error("Error fetching eye products:", err));
  };

  useEffect(() => {
    EyesMakeup();
  }, []);
  return (
    <div>
      <div className="Eyes text-white text-center p-32">
        <h1 className="text-8xl font-bold">EYES</h1>
      </div>
      <div className="flex flex-wrap">
        <div className="bg-white py-32 px-48 flex flex-wrap w-full">
          {eyesItems?.map((item) => (
            <NavLink
              to={`/ProductDetail?id=${item.id}`}
              key={item?.id}
              className="w-1/3"
            >
              <div
                className="p-5 bg-white w-full"
                onClick={() => {
                  setProduct({ ...item, quantity: 1 });
                }}
              >
                <div className="mx-10">
                  <div
                    className=""
                    onMouseOver={() => setIsSecondImageVisible(item?.id)}
                    onMouseOut={() => setIsSecondImageVisible(null)}
                  >
                    {isSecondImageVisible === item?.id ? (
                      <div className="flex">
                        <img
                          src={item?.img2}
                          alt=""
                          className=""
                          height="272"
                          width="272"
                        />
                      </div>
                    ) : (
                      <div>
                        <img src={item?.img} alt="" height="272" width="272" />
                      </div>
                    )}
                  </div>

                  <p className="text-black ml-16">{item?.name}</p>
                  <p className="text-black ml-16">{item?.code}</p>
                  <p className="text-black ml-16">₹{item?.price?.slice(1)}</p>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Eyes;
