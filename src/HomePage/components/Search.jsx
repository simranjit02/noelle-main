import React from 'react'
import { FaFacebookF,FaInstagram,FaTwitter,FaYoutube } from "react-icons/fa";

const Search = () => {
  return (
    <div className='bg-black py-3 px-7'>
        <div className="flex justify-between ">

        <div className="flex gap-2 w-48 border-b">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search text-white" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>


<input type="text" placeholder='What are you searching for?' className='text-white  text-xs bg-black w-full overflow-hidden ' />
        </div>

        <div className='flex '>
            <p className='text-base font-bold text-white'>15% Sitewide!</p>
            <p className='text-base text-white'>Use Promo Code LOVE15</p>
    </div>
<div className='flex gap-2 text-white'>
<FaInstagram />
<FaTwitter />
<FaFacebookF />
<FaYoutube />
 
</div>
    </div>
</div>
  )
}

export default Search