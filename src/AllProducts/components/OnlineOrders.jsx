import React, { useState } from 'react'

const OnlineOrders = () => {
    const[contact,setContact]=useState(false);
  return (
    <div className='h-screen bg-white w-auto'>
<div>

        <h1 className='text-xl text black flex justify-end'>X</h1>
</div>
<div>

        <h1>We Can't Accept Online </h1>
        <h1>orders write now.</h1>
        <p className='taxt-s text-black'>please contact us to complete your purchase.</p>
</div>
<button className='bg-black text-white text-center px-7 py-2 outline-sky-400' onClick={() => {setContact(true)}}>Got it</button>  
    </div>
  )
}

export default OnlineOrders