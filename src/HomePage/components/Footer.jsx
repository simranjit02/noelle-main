import React from 'react'
import { BsFillChatDotsFill,BsInstagram ,BsFacebook,BsTwitter,BsYoutube  } from "react-icons/bs";

const Footer = () => {

    // const subscribe={
    //     h1:'Are you on the list?',
    //     h2:'join to get exclusive offers & discounts',


    // }
    const array={

    Shop :[
        
            {
                id:1,
                name:"All Products",
                textStyle:'mb-2',
            },
            {id:2,
                name:'New',
                textStyle:'mb-2',

            },
            {id:3,
                name:'Best Sellers',
                textStyle:'mb-2',

            },
            {id:4,
                name:'Lips',
                textStyle:'mb-2',
            },
            {id:5,
                name:'Eyes',

            },
            {id:6,
                name:'Face',

            },
        ],

        OurStore:[
            {
                id:11,
                name:'500Terry Francois Street San francisco,CA 94158',
                textStyle:'mb-5',
                
 
                             },
            {
                id:22,
                name:'Monday-Friday:11am-12pm  Saturday=Sunday:11am-12pm',
                textStyle:'mb-5',

            },
            {
                id:33,
                name:'Tel:123-456-7890 Email:info@mysite.com',
                textStyle:'mb-5',

            },

        ],
        Policy:[
            {
                id:111,
                name:'Shipping&returns',
                textStyle:'mb-2',


            },
            {
                id:222,
                name:'Store Policy',
                textStyle:'mb-2',


            },
            {
                id:333,
                name:'Payment Methods',
                textStyle:'mb-2',


            },
            {
                id:444,
                name:'FAQ',
                textStyle:'mb-2',


            },
        ],
        CustomerSerivice: [
            {
            id:12,
         name:'Tel:123-456-7890 Email:info@mysite.com',
         textStyle:'mb-5',


            },
            {
                id:1111,
                name:
                [
                    // <BsInstagram /> <BsFacebook /> <BsTwitter /><BsYoutube />
                ],
                textStyle:'mb-5 ',


            },
            {
                id:123,
                name:'&copy; 2023 by noelle.Proudly created with Wix.com',
                textStyle:'mb-5',


            },

           
        ]



    };
    console.log(Object.keys(array));

        


        

  return (
    <div className='FooterBgColor h-auto  w-full '>
        <div className='border-b pt-32 '>
            <h1 className='text-5xl text-white text-center font-bold '>Are you on the list?</h1>
            <h3 className='text-xl text-white mt-5 text-center'>Join to get exclusive offers & discounts</h3>
            <div>
            <p className='text-xs text-white mt-10 ml-80'> Enter the email here *
                </p>
                <div className='flex justify-center  mx-72 mb-16'>

                <input type ="text" placeholder='Email' className='border px-5 py-3 ml-3 text-white bg-black w-full ' />
<button className='text-base text-black bg-white px-9 py-3'>Join</button>
                </div>
                </div>
</div>
        <div className=' w-auto flex justify-between r mx-10 my-10'>
            {Object.keys(array)?.map((item) => {
                return(
                    <div className=' pb-12 '>
                        <div className='text-l  text-white font-bold ' key={item}>
                            {item.toUpperCase()}
                        </div>
                        <ul className='text-s text-white mt-3 w-52  mb-10'>
                            {array[item]?.map((items)=>(
                                <li className={` ${items.textStyle} `}>{items?.name}</li>
                            ))}
                        </ul>
                        </div>
                );
            })}
        </div>
            {/* <div className='flex gap-2 mr-7 mb-7 text-xl text-white px-5 py-3 border primary_color w-48  justify-end'>
            <BsFillChatDotsFill className='text-2xl ' />
                <button className=''> Lets's Chat!</button>

            </div> */}



    </div>
  )
}

export default Footer