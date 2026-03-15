import React from 'react'

const Checkout = () => {
    const check={img,name,price,code}
  return (
    <div className='bg-white h-screen p-10 m-10'>
        <div className='border border-b border-t'>
            <div>
                <h1>img</h1>
                <div>name,price</div>
                <div>quantity</div>
                <div> Price acc to quan</div>
                <h1>X</h1>
            </div>
            <div className='border border-b border-t my-5'>
                ///subtotal
                <p> Shipping Free</p>
                <p>Select your Destination</p>


            </div>
            <div>

            <p>Total</p>
            </div>
            <div>
                <button className='bg-black text-white px-20 py-3' onClick> Checkout</button>
            </div>
            

        </div>

    </div>
  )
}

export default Checkout