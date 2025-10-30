import React from "react";
import { LeafyGreen } from "lucide-react";

const Home = () => {
  return (
    <div className="bg-amber-200 text-gray-800">
      <section className="relative bg-[url('https://cdn.pixabay.com/photo/2017/08/01/12/00/vegetable-2564754_1280.jpg')]
      bg-cover bg-center bg-no-repeat h-100 text-white">

        <div className="absolute inset-0 bg-black/30 h-100 justify-center"></div>

        <div className="relative z-20 mx-auto text-center max-w-7xl px-9 py-36">
        <h1 className="text-5xl font-bold text-center mt-10">LET'S GET FIT TOGETHER</h1>
        <p className="text-lg text-center mt-4">Join our fitness community and start your journey towards good health today! </p>

        <div className="flex gap-6 justify-center">
          <button className="mt-6 px-6 py-3 bg-gray-50/20 text-white border-2 border-white rounded-md hover:bg-amber-300 transition">
            Get Started
          </button>
          <button className="mt-6 px-6 py-3 bg-gray-50/20 text-white border-2 border-white rounded-md hover:bg-amber-300 transition">
            Consult AI
          </button>
        </div>
        </div>
    </section>

    <section className="bg-white py-12 text-center">
      <h2 className="text-3xl font-bold text-center mt-10 mb-6">Why Choose Us?</h2>
      <p className="text-lg text-center mx-auto max-w-3xl">
        At Dite, we are committed to helping you achieve your fitness goals with personalized plans, expert advice, and a supportive community. Whether you're looking to lose weight, build muscle, or simply lead a healthier lifestyle, we've got you covered.
      </p>

      <div className= "p-6 rounded-2xl shadow-md justify-center"> 
        <div className="bg-green-100 inline-flex items-center p-6 border rounded-full shadow-md hover:shadow-xl transition">
          <LeafyGreen className=" text-green-500  w-6 h-6"/>
        </div>
      </div>
    </section>
  </div>

      
  );
}


export default Home;
