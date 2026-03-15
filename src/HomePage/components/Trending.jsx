import React from 'react'

const Trending = () => {
    const newlaunch = [
        {
          id: 1,
          img: "https://static.wixstatic.com/media/2e2a49_87208d6c5fdc462a832dc5e3a352e6ec~mv2.jpg/v1/fill/w_306,h_306,al_c,q_80,usm_0.66_1.00_0.01/2e2a49_87208d6c5fdc462a832dc5e3a352e6ec~mv2.webp",
        
          // imgStyle:" border p-5 ",
          name: "Chocolate Kiss",
          price: "$15.00",
        },
        {
          id: 2,
          img: "https://static.wixstatic.com/media/2e2a49_bb016bf6135c4b1f874fab6b9086ae74~mv2.jpg/v1/fill/w_306,h_306,al_c,q_80,usm_0.66_1.00_0.01/2e2a49_bb016bf6135c4b1f874fab6b9086ae74~mv2.webp",
          
          name: "Brown Kiss Powder Foundation",
          price: "$15.00",
        },
        {
          id: 3,
          img: "https://static.wixstatic.com/media/2e2a49_493d75f7ab9444e494ee62ddc29c7781~mv2.jpg/v1/fill/w_306,h_306,al_c,q_80,usm_0.66_1.00_0.01/2e2a49_493d75f7ab9444e494ee62ddc29c7781~mv2.webp",
    
          name: "Sateen Nude Lipstick",
          price: "$15.00",
        },
        {
          id: 4,
          img: "https://static.wixstatic.com/media/2e2a49_fb724814678a446a845829490af44f51~mv2.jpg/v1/fill/w_306,h_306,al_c,q_80,usm_0.66_1.00_0.01/2e2a49_fb724814678a446a845829490af44f51~mv2.webp",

          name: "Essential Copper Eyeshadow",
          price: "$15.00",
        },
        {
          id: 5,
          img: "https://static.wixstatic.com/media/2e2a49_1ca681dc7dee46d5ba9a14d5e812ea1d~mv2.jpg/v1/fill/w_306,h_306,al_c,q_80,usm_0.66_1.00_0.01/2e2a49_1ca681dc7dee46d5ba9a14d5e812ea1d~mv2.webp",
    
          name: "Satin Fluid Sculpting Makeup",
          price: "$15.00",
        },
        
      ];
  return (
    
        <div className="bg-white w-full h-screen">
      <div className="">
        <h3 className="text-xl text-black text-center mt-10">DON'T MISS OUT</h3>
        <div className="flex gap-2 justify-center">
          <h3 className="text-6xl font-bold text-black mt-7">Now </h3>
          <h3 className="text-6xl font-style: italic text-black mt-7">
            Trending
          </h3>
        </div>
        <div className='flex gap-5 p-10 '>

        {newlaunch?.map((item) => (
            <div className=''>
            <img src={item?.img} alt="" height="272" width="272" className='hover:scale-[1.1] transition ease-in-out duration-700 cursor' />
            <p className='text-black text-base mt-5 text-center'>{item?.name}</p>
            <p className='text-black text-base mt-5 text-center'>{item?.price}</p>
            </div>
            
            ))}
            </div>
      </div>
    </div>
  )
}

export default Trending