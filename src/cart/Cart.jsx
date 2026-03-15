import React from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import { BsTrash } from "react-icons/bs";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, loading, error, removeFromCart, updateQuantity, getCartStats } =
    useCart();

  const stats = getCartStats();

  console.log("Cart data:", cart); // Debug log
  console.log("Loading:", loading, "Error:", error); // Debug log

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center text-2xl text-[#593735]">
          Loading cart...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Error: {error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#593735] text-white px-6 py-2 rounded hover:bg-[#3d2423] transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <h1 className="text-4xl font-bold text-[#593735] mb-8">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          // Empty Cart
          <div className="text-center py-12 bg-gray-50 rounded">
            <p className="text-2xl text-gray-600 mb-6">Your cart is empty</p>
            <button
              onClick={() => navigate("/AllMakeup")}
              className="bg-[#593735] text-white px-8 py-3 rounded hover:bg-[#3d2423] transition font-semibold"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          // Cart Items
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items Table */}
            <div className="lg:col-span-2">
              <div className="bg-white border rounded-lg overflow-hidden">
                {/* Table Header */}
                <div className="bg-[#593735] text-white px-6 py-4 grid grid-cols-4 gap-4 font-bold">
                  <div>Product</div>
                  <div className="text-center">Price</div>
                  <div className="text-center">Quantity</div>
                  <div className="text-right">Action</div>
                </div>

                {/* Table Body */}
                {cart.map((item) => (
                  <div
                    key={item.product_id}
                    className="border-b px-6 py-4 grid grid-cols-4 gap-4 items-center hover:bg-gray-50 transition"
                  >
                    {/* Product Info */}
                    <div className="flex items-center gap-4">
                      {item.img && (
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <div>
                        <p className="font-semibold text-gray-800">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          ID: {item.product_id}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-center">
                      <p className="font-semibold text-[#593735]">
                        ${parseFloat(item.price).toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-center gap-2 border rounded bg-gray-100 w-fit mx-auto">
                      <button
                        onClick={() =>
                          updateQuantity(item.product_id, item.quantity - 1)
                        }
                        className="p-1 hover:bg-gray-200 transition"
                        title="Decrease quantity"
                      >
                        <AiOutlineMinus size={18} />
                      </button>
                      <span className="px-3 font-semibold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product_id, item.quantity + 1)
                        }
                        className="p-1 hover:bg-gray-200 transition"
                        title="Increase quantity"
                      >
                        <AiOutlinePlus size={18} />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <div className="text-right">
                      <button
                        onClick={() => removeFromCart(item.product_id)}
                        className="text-red-600 hover:text-red-800 text-2xl transition"
                        title="Remove from cart"
                      >
                        <BsTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 border rounded-lg p-6 sticky top-20">
                <h2 className="text-2xl font-bold text-[#593735] mb-6">
                  Order Summary
                </h2>

                {/* Stats */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Items:</span>
                    <span className="font-semibold">{stats.itemsCount}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Quantity:</span>
                    <span className="font-semibold">{stats.itemCount}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t pt-4 pb-6">
                  <div className="flex justify-between items-end">
                    <span className="text-lg text-gray-700">Total:</span>
                    <span className="text-3xl font-bold text-[#593735]">
                      ${stats.totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button className="w-full bg-[#593735] text-white font-bold py-3 rounded hover:bg-[#3d2423] transition text-lg mb-3">
                  Proceed to Checkout
                </button>

                {/* Continue Shopping */}
                <button
                  onClick={() => navigate("/AllMakeup")}
                  className="w-full border-2 border-[#593735] text-[#593735] font-bold py-3 rounded hover:bg-gray-200 transition"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
