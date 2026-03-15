import React from 'react'
import ShopNow from './ShopNow';

const DiscoverProducts = () => {
    const data=[
        {
            id:1,
            img1:'https://static.wixstatic.com/media/2e2a49_5bd77ef9eecc40d4857c35dd6aa1db9c~mv2.jpg/v1/fill/w_288,h_520,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/2e2a49_5bd77ef9eecc40d4857c35dd6aa1db9c~mv2.jpg',
            heading1:'SHOP',
            heading2:'EYES',
        },
        {
            id:2,
            img1:'https://static.wixstatic.com/media/2e2a49_5446b99efef6467b8bb512150a2f20c3~mv2.jpg/v1/fill/w_288,h_520,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/2e2a49_5446b99efef6467b8bb512150a2f20c3~mv2.jpg',
            heading1:'SHOP',
            heading2:'FACE',
        },
        {
            id:3,
            img1:'https://static.wixstatic.com/media/2e2a49_07316c336b444872ac520388bdb042b4~mv2.jpg/v1/fill/w_288,h_520,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/2e2a49_07316c336b444872ac520388bdb042b4~mv2.jpg',
            heading1:'SHOP',
            heading2:'LIPS',
        },
    ]
    
  return (
    <div className='relative'>
         <div className="flex gap-2 justify-center">
          <h3 className="text-6xl font-bold text-black mt-7">Discover  </h3>
          <h3 className="text-6xl font-style: italic text-black mt-7">
            More
          </h3>
        </div>
        <div className="  p-10 flex gap-5">

      {data?.map((item)=>(
          <ShopNow
      id={item?.id}
      image1={item?.img1}
    
      buy={item?.heading1}
      category={item?.heading2}
      />

      ))}
    </div>
    <div className='bg-black  h-[500px] '>
         </div>

     <div className='flex'>
    <div className=' h-[900px]  -mt-32 discoverProducts '>
        {/* <img src="https://static.wixstatic.com/media/2e2a49_d8f32742409844c59aefab5e448d83be~mv2.jpg/v1/fill/w_538,h_682,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2e2a49_d8f32742409844c59aefab5e448d83be~mv2.jpg"
         alt="" className='h-screen' width="732" /> */}
         </div>

    <div className='bg-white w-1/2'>
        <div className=' ml-28'>
        <h1 className='text-l text-black mt-10 opacity-90'>THIS WEEKEND ONLY</h1>

        <div className='flex  gap-0.5 mt-5'>

<p className='text-4xl  text-black font-bold '>15</p>
<p className='text-6xl text-black  '>% Off</p>
<p className='text-6xl text-black italicFont'>Sitewide</p>
        </div>
        <p className='mt-5 w-96 text-black text-xl opacity-90'>I'm a paragraph. Click here to add your own text and edit me. I’m a great place for you to tell a story and let your users know a little more about you.</p>
   
   <p className='text-base text-black mt-7 font-bold'>Use code LOVE15 at checkout </p>
   <button className='mt-7 text-base px-9 py-2 text-center font-bold text-black border border-black '>Shop All</button>
    </div>  
    </div>
     </div>
        </div>
  )
}

export default DiscoverProducts