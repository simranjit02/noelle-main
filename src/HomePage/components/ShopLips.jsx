import React from "react";

const ShopLips = () => {
  return (
    <div className="bg-white relative ">
      <div className=" bg-black  h-screen  w-[60%] p-10 ">
        <div className="text-start ml-10">

        <h5 className=" text-white mt-10 pt-10">HOT&SPICY</h5>
        <p className="text-4xl  text-white font-bold mt-10 ">
          Most Vibrant
        </p>
        <p className="text-4xl  text-white font-bold mt-5">
          Lips in Town
        </p>
        <div className="w-1/2 mt-9">
          <p className="text-white  text-base">
            {" "}
            I'm a paragraph. Click here to add your own text and edit me. I’m a
            great place for you to tell a story and let your users know a little
            more about you.
          </p>
        </div>
        {/* <div className="flex justify-center"> */}
          <button className="text-black border bg-white mt-10 px-10 font-bold py-3">
            Shop Lips
          </button>
        {/* </div> */}
        </div>
      </div>
        <div className=" absolute left-[40%] top-[10%]">
          <img
            src="https://static.wixstatic.com/media/2e2a49_22e45f736c9945d98ff9a2e3cd56090c~mv2.jpg/v1/fill/w_659,h_579,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2e2a49_22e45f736c9945d98ff9a2e3cd56090c~mv2.jpg"
            alt="" 
          />
        </div>
    </div>
  );
};

export default ShopLips;
