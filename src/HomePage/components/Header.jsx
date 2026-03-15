import React from "react";

const Header = () => {
 
  return (
    <div className="w-full h-screen headerImage">
      <div className="relative  text-center ">
        <div className=" absolute ml-40 mt-24  w-1/3">
          {/* {newproduct?.map((items) => (
            <p className= {`text-base ${items.textStyle}  my-3`}> {items?.name}</p>
          ))} */}

          <div className=" text-start ">
            <h1 className="text-lg text-white">NEW RELEASE</h1>
            <div className="w-32">
              <p className="text-7xl text-white  font-bold mt-7">METALLICS</p>
              <div className="flex gap-3 items-center mt-5">

              <p className="text-7xl  text-white italicFont">Shine</p>
              <p className="text-7xl text-white font-bold">On</p>
              </div>
            </div>
              <p className="text-white text-lg mt-7  ">Get to know our new eyeshadow palettes with a glossy finish, smooth lightweight feel and 10 hour stay-on

</p>
        <button className="text-white text-s border border-white mt-7 font-bold px-10 py-2">Shop</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
