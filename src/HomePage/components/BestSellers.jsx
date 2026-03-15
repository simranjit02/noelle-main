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
    <div className="bg-white w-full h-screen">
      <div className="">
        <h3 className="text-xl text-black text-center mt-10">MUST HAVES</h3>
        <div className="flex gap-2 justify-center">
          <h3 className="text-6xl font-bold text-black mt-7">Best</h3>
          <h3 className="text-6xl font-style: italic text-black mt-7">
            sellers
          </h3>
        </div>
      </div>
      <div className="  p-5 flex gap-5">
        {products?.map((item) => (
          <Card
            key={item?.id}
            id={item?.id}
            image1={item?.img}
            image2={item?.img2}
            title={item?.name}
            price={item?.price}
          />
        ))}
      </div>
      <div className="flex justify-center mt-16">
        <button className="text-black text-base px-5 py-3 font-bold text-center border border-black">
          Shop Best Sellers
        </button>
      </div>
    </div>
  );
};

export default BestSellers;
