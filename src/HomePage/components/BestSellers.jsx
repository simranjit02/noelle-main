import React from "react";
import Card from "./Card";

const BestSellers = () => {
    const products = [
        {
          id: 1,
          img: "https://static.wixstatic.com/media/2e2a49_36788be7777f4ad69596f0e1c949bb7b~mv2.jpg/v1/fill/w_425,h_425,al_c,q_85,usm_0.66_1.00_0.01/2e2a49_36788be7777f4ad69596f0e1c949bb7b~mv2.jpg",
          img2: "https://static.wixstatic.com/media/2e2a49_de152b4ef07640fabd5b4cf16aa26c70~mv2.jpg/v1/fill/w_142,h_142,al_c,q_80,usm_0.66_1.00_0.01/2e2a49_de152b4ef07640fabd5b4cf16aa26c70~mv2.webp",
          // imgStyle:" border p-5 ",
          name: "Black Power Eye Pencil",
          price: "$15.00",
        },
        {
          id: 2,
          img: "https://static.wixstatic.com/media/2e2a49_5ba7ad665c3b4f45b1691bf1833ef2ca~mv2.jpg/v1/fill/w_500,h_500,al_c,q_85,usm_0.66_1.00_0.01/2e2a49_5ba7ad665c3b4f45b1691bf1833ef2ca~mv2.webp",
          img2: "https://static.wixstatic.com/media/2e2a49_6e1d66febc3e499bb1d285e157f1390e~mv2.jpg/v1/fill/w_140,h_140,al_c,q_80,usm_0.66_1.00_0.01/2e2a49_6e1d66febc3e499bb1d285e157f1390e~mv2.webp",
          name: "Luxe Velvet Lipstick",
          price: "$15.00",
        },
        {
          id: 3,
          img: "https://static.wixstatic.com/media/2e2a49_339f0d93b2c5424db5457ea307631172~mv2.jpg/v1/fill/w_500,h_500,al_c,q_85,usm_0.66_1.00_0.01/2e2a49_339f0d93b2c5424db5457ea307631172~mv2.webp",
          img2: "https://static.wixstatic.com/media/2e2a49_d56e97b437104d0f947c2d788738b5ee~mv2.jpg/v1/fill/w_140,h_140,al_c,q_80,usm_0.66_1.00_0.01/2e2a49_d56e97b437104d0f947c2d788738b5ee~mv2.webp",
          name: "Glossy Rose",
          price: "$15.00",
        },
        {
          id: 4,
          img: "https://static.wixstatic.com/media/2e2a49_5b31605649274cd39dd3f1fe578a3911~mv2.jpg/v1/fill/w_500,h_500,al_c,q_85,usm_0.66_1.00_0.01/2e2a49_5b31605649274cd39dd3f1fe578a3911~mv2.webp",
          img2: "https://static.wixstatic.com/media/2e2a49_7b65a59cb6334e569bad8c08e3bbb041~mv2.jpg/v1/fill/w_140,h_140,al_c,q_80,usm_0.66_1.00_0.01/2e2a49_7b65a59cb6334e569bad8c08e3bbb041~mv2.webp",
          name: "Full Coverage Slick Fluid Foundation",
          price: "$15.00",
        },
        {
          id: 5,
          img: "https://static.wixstatic.com/media/2e2a49_327fab297d8049b8b167dee18144c52b~mv2.jpg/v1/fill/w_500,h_500,al_c,q_85,usm_0.66_1.00_0.01/2e2a49_327fab297d8049b8b167dee18144c52b~mv2.webp",
          img2: "https://static.wixstatic.com/media/2e2a49_d9411c1419fd49d2af6b60517a7e7960~mv2.jpg/v1/fill/w_140,h_140,al_c,q_80,usm_0.66_1.00_0.01/2e2a49_d9411c1419fd49d2af6b60517a7e7960~mv2.webp",
          name: "Dazzle Pink Eyeshadow",
          price: "$15.00",
        },
        {
          id: 6,
          img: "https://static.wixstatic.com/media/2e2a49_0c2a7fffb6234296bcf0f10b74840fcd~mv2.jpg/v1/fill/w_500,h_500,al_c,q_85,usm_0.66_1.00_0.01/2e2a49_0c2a7fffb6234296bcf0f10b74840fcd~mv2.webp",
          img2: "https://static.wixstatic.com/media/2e2a49_9948238a60524f048df9c3de69dadb07~mv2.jpg/v1/fill/w_140,h_140,al_c,q_80,usm_0.66_1.00_0.01/2e2a49_9948238a60524f048df9c3de69dadb07~mv2.webp",
          name: "Multipack Eyeshadow",
          price: "$15.00",
        },
      ];
  
  return (
    <div className="bg-white w-full h-screen">
      <div className="">
        <h3 className="text-xl text-black text-center mt-10">MUST HAVES</h3>
        <div className="flex gap-2 justify-center">
          <h3 className="text-6xl font-bold text-black mt-7">Best</h3>
          <h3 className="text-6xl font-style: italic text-black mt-7">
            sellers
          </h3>
        </div>
      </div>
      <div className="  p-5 flex gap-5">

      {products?.map((item)=>(
          <Card
      id={item?.id}
      image1={item?.img}
      image2={item?.img2}
      title={item?.name}
      price={item?.price}
      />))}
          </div>
      <div className="flex justify-center mt-16">

      <button className="text-black text-base px-5 py-3 font-bold text-center border border-black">Shop Best Sellers</button>
      </div>

    </div>
  );
};

export default BestSellers;
