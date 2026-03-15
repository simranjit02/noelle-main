import React from "react";
const ShopNow = ({ id, image1, buy, category }) => {
  return (
    <div>
      <div className="  flex relative ">
        <img src={image1} alt="" className="-mb-72" height="1024" width="402" />
      </div>
      <div className="absolute  bottom-[53%] ml-32">
        <p className=" text-3xl text-white text-center ">{buy}</p>
        <p className="text-6xl text-white font-bold text-center">{category}</p>
      </div>
    </div>
  );
};

export default ShopNow;
