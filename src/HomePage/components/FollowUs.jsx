import React from 'react'

const FollowUs = () => {
    const images=[
        {
            id:1,
          img:'https://static.parastorage.com/services/instagram-cdn/1.743.0/assets/ig-templates-accounts/Editor/Beauty%20Store/01.jpg'
        },
        {
            id:2,
            img:'https://static.parastorage.com/services/instagram-cdn/1.743.0/assets/ig-templates-accounts/Editor/Beauty%20Store/02.jpg'
        },
        {
            id:3,
            img:"https://static.parastorage.com/services/instagram-cdn/1.743.0/assets/ig-templates-accounts/Editor/Beauty%20Store/03.jpg"
        },
        {
        id:4,
        img:"https://static.parastorage.com/services/instagram-cdn/1.743.0/assets/ig-templates-accounts/Editor/Beauty%20Store/04.jpg",
    },
    {
        id:5,
        img:"https://static.parastorage.com/services/instagram-cdn/1.743.0/assets/ig-templates-accounts/Editor/Beauty%20Store/05.jpg",
    },
    ]
    // const links=[
    //     {
    //     name:"@wix: #wix, #website, #freewebsite, #websitetemplate, #wix.com",
    //     },
    //     {
    //         name:"@wix: #wix, #website, #freewebsite, #websitetemplate, #wix.com",
    //     },
    //     {
    //         name:"@wix: #wix, #website, #freewebsite, #websitetemplate, #wix.com",
    //     },{
    //         name:"@wix: #wix, #website, #freewebsite, #websitetemplate, #wix.com",
    //     },
    //     {
    //         name:"@wix: #wix, #website, #freewebsite, #websitetemplate, #wix.com",
    //     },

    // ]

  return (
    <div className='bg-white border  '>
        <h1 className='text-black text-6xl font:bold font-style:italic text-center mt-9' >
            Follow Us
            </h1>
            {/* <a href="@beauty.Store "  className='text-xl text-black text-center mt-5'/> */}
            <div className=' flex mt-32 w-full overflow-hidden relative'>

               {images?.map((imgs) => (
<img src={imgs.img} alt="" className='mt-10 ' height="272" width="272"/>
               ))}
               <div className='absolute h-[272px] w-[272px] mt-10 bg-red-200 opacity-20' >
<div className='text-black'>
    {/* {links?.map((item) =>
    {})} */}
</div>
               </div>
            </div>
            </div>
  )
}

export default FollowUs;