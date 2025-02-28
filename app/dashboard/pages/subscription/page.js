'use client'
import axios from "axios"
import { useState, useEffect } from "react"
import PricingCard from "../../../components/PricingCard";

const Pricing = () => {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
  fetchPrices()
  }, [])
  


  const fetchPrices = async () => {
    try {
      const { data } = await axios.get('/api/getproducts');
      setPrices(data);
    } catch (error) {
      console.error('Failed to fetch prices:', error);
      // Consider adding user-facing error state here
    }
  };

  return (
    <div className="min-h-screen w-screen bg-zinc-900 bg-center flex flex-col items-center justify-center"
    >
      <section className="w-full py-12 px-6 sm:px-12 lg:px-24 text-center">
        <h2 className="text-4xl font-bold text-white drop-shadow-lg">
          Expand your social media presence with <span className="text-blue-400">Brandboostr-AI</span>
        </h2>
        <p className="mt-4 text-2xl text-red-300">
          Subscription Plans Launching Shortly.🚀
        </p>
      </section>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 space-x-8 gap-24 bg-opacity-30 p-6 rounded-lg max-w-7xl mx-auto">
        {prices && prices.map((price) => (
          <PricingCard price={price} key={price.id} />
        ))}
      </div>
    </div>
  );
};

export default Pricing;
