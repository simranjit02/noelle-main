import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { cartProducts } from "../../store/jotaistore";
import { useNavigate, useSearchParams } from "react-router-dom";
import AddToCart from "../../cart/AddToCart";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const ProductDetail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [product, setProductAtom] = useAtom(cartProducts);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [apiProduct, setApiProduct] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const productIdFromUrl = searchParams.get("id");

  // Fetch product from API if ID is in URL
  useEffect(() => {
    if (productIdFromUrl) {
      setApiProduct(null); // Clear previous product while loading
      setLoading(true);
      console.log("Fetching product with ID:", productIdFromUrl);
      fetch(`${API_URL}/api/products.php?id=${productIdFromUrl}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("API Response:", data);
          if (Array.isArray(data) && data.length > 0) {
            console.log("Setting product:", data[0]);
            setApiProduct(data[0]);
          } else if (data && typeof data === "object" && !Array.isArray(data)) {
            // Handle case where API returns single object instead of array
            console.log("Setting product (single object):", data);
            setApiProduct(data);
          }
        })
        .catch((err) => console.error("Error fetching product:", err))
        .finally(() => setLoading(false));
    }
  }, [productIdFromUrl, API_URL]);

  // When URL has ID, use API product only (don't fall back to Jotai store)
  // Otherwise use the Jotai store product
  const displayProduct = productIdFromUrl ? apiProduct : product;

  console.log("Display Product:", displayProduct);
  console.log("Product ID from URL:", productIdFromUrl);
  console.log("Loading:", loading);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  // If no product selected, redirect to shop
  if (!displayProduct || (!displayProduct.id && !displayProduct.product_id)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No product selected
          </h2>
          <button
            onClick={() => navigate("/AllMakeup")}
            className="bg-[#593735] text-white px-6 py-3 rounded hover:bg-[#4a2b29]"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-[#593735] font-semibold hover:underline"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Product Images */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-full bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img
              src={displayProduct.img}
              alt={displayProduct.name}
              className="w-full h-96 object-cover"
            />
          </div>
          {displayProduct.img2 && (
            <div className="w-full bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={displayProduct.img2}
                alt={`${displayProduct.name} alternate`}
                className="w-full h-96 object-cover"
              />
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {displayProduct.name}
              </h1>
              <p className="text-gray-600 text-sm mb-4">
                SKU:{" "}
                <span className="font-semibold">{displayProduct.code}</span>
              </p>

              {/* Price */}
              <div className="mb-4">
                <span className="text-3xl font-bold text-[#593735]">
                  {typeof displayProduct.price === "string" &&
                  displayProduct.price.includes("$")
                    ? `₹${displayProduct.price.slice(1)}` // Remove $ if present
                    : `₹${displayProduct.price}`}
                </span>
              </div>

              {/* Category Badge */}
              {displayProduct.category && (
                <div className="mb-4">
                  <span className="inline-block bg-[#593735] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {displayProduct.category}
                  </span>
                </div>
              )}

              {/* Status Badges */}
              <div className="flex gap-2 mb-6">
                {displayProduct.popular === "true" && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">
                    Popular
                  </span>
                )}
                {displayProduct.newProducts && (
                  <span className="bg-green-500 text-white px-3 py-1 rounded text-sm font-semibold">
                    New Arrival
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Product Description
                </h3>
                <p className="text-gray-600 line-clamp-4">
                  {displayProduct.des || "No description available"}
                </p>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="border-t pt-6">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                  >
                    <AiOutlineMinus size={18} />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-16 h-10 border border-gray-300 rounded text-center"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                  >
                    <AiOutlinePlus size={18} />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <AddToCart
                product={{ ...displayProduct, quantity }}
                showQuantity={false}
              />
            </div>
          </div>

          {/* Continue Shopping */}
          <div className="mt-8 pt-6 border-t">
            <button
              onClick={() => navigate("/AllMakeup")}
              className="w-full text-center text-[#593735] font-semibold hover:underline"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
