import React, { useState } from "react";
import useCart from "../hooks/useCart";
import { HiShoppingCart } from "react-icons/hi";

const AddToCart = ({ product, showQuantity = true }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    // Validation
    if (!product || !product.id) {
      setMessage({
        type: "error",
        text: "Product information is missing",
      });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    setLoading(true);
    setMessage(null);

    const productData = {
      id: product.id,
      name: product.name || "Unknown Product",
      price: product.price || 0,
      img: product.img || "",
      quantity: parseInt(quantity) || 1,
    };

    console.log("Adding to cart:", productData);

    const result = await addToCart(productData);

    if (result.success) {
      setMessage({ type: "success", text: result.message });
      setQuantity(1);
      // Dispatch custom event to notify all listeners that cart was updated
      window.dispatchEvent(new Event("cartUpdated"));
      setTimeout(() => setMessage(null), 2000);
    } else {
      setMessage({ type: "error", text: result.message });
      setTimeout(() => setMessage(null), 3000);
    }

    setLoading(false);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, value));
  };

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      {showQuantity && (
        <div className="flex items-center gap-4">
          <label className="text-sm font-semibold text-gray-700">
            Quantity:
          </label>
          <div className="flex items-center border rounded w-fit">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-2 hover:bg-gray-100 transition font-bold"
            >
              −
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-16 text-center py-2 border-l border-r focus:outline-none"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-2 hover:bg-gray-100 transition font-bold"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="w-full bg-[#593735] text-white font-bold py-3 px-6 rounded hover:bg-[#3d2423] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
      >
        <HiShoppingCart size={24} />
        {loading ? "Adding..." : "Add to Cart"}
      </button>

      {/* Message Display */}
      {message && (
        <div
          className={`p-4 rounded text-center font-semibold ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};

export default AddToCart;
