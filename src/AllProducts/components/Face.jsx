import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAtom } from "jotai";
import { cartProducts } from "../../store/jotaistore";

const Face = () => {
  const [faceItems, setFaceItems] = useState([]);
  const [isSecondImageVisible, setIsSecondImageVisible] = useState(null);
  const [product, setProduct] = useAtom(cartProducts);

  const FaceMakeup = () => {
    axios.get(" ../api.json").then((res) => {
      setFaceItems(res?.data.filter((arrElem) => arrElem?.category === "Face"));
    });
  };
  console.log("FaceMakeup", FaceMakeup);

  useEffect(() => {
    FaceMakeup();
  }, []);
  return (
    <div>
      <NavLink to="/Cart" className=" ">
        <div className="Face text-white text-center p-32">
          <h1 className="text-8xl font-bold">FACE</h1>
        </div>
        <div className="bg-white py-32 px-48 flex flex-wrap ">
          {faceItems?.map((item) => (
            <div
              className=" p-5 bg-white w-1/3  "
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
                      <img src={item?.img} alt="" height="272" width="272" />
                    </div>
                  )}
                </div>

                <p className="text-black ml-16">{item?.name}</p>
                <p className="text-black ml-16">{item?.code}</p>
                <p className="text-black ml-16">{item?.Price}</p>
              </div>
            </div>
          ))}
        </div>
      </NavLink>
    </div>
  );
};

export default Face;
