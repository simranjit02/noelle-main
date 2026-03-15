import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Card = ({ id, image1, image2, title, price }) => {
  const [isSecondImageVisible, setIsSecondImageVisible] = useState(null);

  return (
    <NavLink
      to={`/ProductDetail?id=${id}`}
      className="  w-1/3  mx-auto  "
      key={id}
    >
      <div
        className=""
        onMouseOver={() => setIsSecondImageVisible(id)}
        onMouseOut={() => setIsSecondImageVisible(null)}
      >
        {isSecondImageVisible === id ? (
          <div className="  flex  ">
            <img src={image2} alt="" className=" " height="272" width="272" />
          </div>
        ) : (
          <div className="  ">
            <img src={image1} alt="" height="272" width="272" />
          </div>
        )}
      </div>
      <p className=" text-base text-black text-center">{title}</p>
      <p className="text-base text-black text-center">{price}</p>
    </NavLink>
  );
};

export default Card;
