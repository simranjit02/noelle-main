import React, { useState, useEffect } from "react";
import Card from "./Card";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
        const response = await fetch(`${apiUrl}/api/products.php?limit=6`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white w-full py-8 md:py-16 lg:py-32">
      <div className="px-4 md:px-8 lg:px-0">
        <h3 className="text-xs md:text-sm lg:text-base text-black text-center mt-2 md:mt-4 lg:mt-10">
          MUST HAVES
        </h3>
        <div className="flex gap-2 justify-center">
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black mt-3 md:mt-5 lg:mt-7">
            Best
          </h3>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-style: italic text-black mt-3 md:mt-5 lg:mt-7">
            sellers
          </h3>
        </div>
      </div>
      <div className="p-4 mx-auto w-full md:p-6 lg:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
        {products?.map((item) => (
          <Card
            key={item?.id}
            id={item?.id}
            image1={item?.img}
            image2={item?.img2}
            title={item?.name}
            price={item?.price?.slice(1)}
          />
        ))}
      </div>
      <div className="flex justify-center mt-8 md:mt-12 lg:mt-16">
        <button className="text-black text-xs md:text-sm lg:text-base px-4 md:px-5 lg:px-6 py-2 md:py-3 lg:py-3 font-bold text-center border border-black hover:bg-black hover:text-white transition">
          Shop Best Sellers
        </button>
      </div>
    </div>
  );
};

export default BestSellers;
