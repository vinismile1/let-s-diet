import React from "react";
import { Leaf, Dumbbell, Heart, Apple } from "lucide-react";

const Home = () => {
  return (
    <div className="bg-amber-50 text-gray-800">

      {/* ================= HERO SECTION ================= */}
      <section
        className="relative bg-[url('https://cdn.pixabay.com/photo/2017/08/01/12/00/vegetable-2564754_1280.jpg')]
        bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center text-white"
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-20 text-center px-6 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            LET'S GET FIT TOGETHER
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100">
            Join our fitness community and start your journey toward a healthier,
            happier you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 bg-amber-400 text-gray-900 font-semibold rounded-full hover:bg-amber-300 transition">
              Get Started
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-gray-900 transition">
              Consult AI
            </button>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="bg-white py-16 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-amber-600">
          Why Choose Us?
        </h2>
        <p className="text-lg mx-auto max-w-3xl mb-12 text-gray-600">
          At <span className="font-semibold text-amber-500">Dite</span>, we blend technology, nutrition, and fitness to bring you a personalized
          health experience that fits into your lifestyle. Whether your goal is to build strength,
          eat clean, or just stay active — we’re here to support you every step.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-8 rounded-2xl shadow-lg bg-amber-100 hover:shadow-2xl transition">
            <Leaf className="w-10 h-10 mx-auto text-green-500 mb-4" />
            <h3 className="font-semibold text-xl mb-2">Natural & Healthy</h3>
            <p className="text-gray-600">
              Learn how to eat right and fuel your body with wholesome foods and smart nutrition.
            </p>
          </div>

          <div className="p-8 rounded-2xl shadow-lg bg-amber-100 hover:shadow-2xl transition">
            <Dumbbell className="w-10 h-10 mx-auto text-blue-500 mb-4" />
            <h3 className="font-semibold text-xl mb-2">Smart Workouts</h3>
            <p className="text-gray-600">
              Get guided exercise plans tailored to your body goals and fitness level.
            </p>
          </div>

          <div className="p-8 rounded-2xl shadow-lg bg-amber-100 hover:shadow-2xl transition">
            <Heart className="w-10 h-10 mx-auto text-red-500 mb-4" />
            <h3 className="font-semibold text-xl mb-2">Holistic Care</h3>
            <p className="text-gray-600">
              Our approach focuses on mind, body, and balance — not just gym numbers.
            </p>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="bg-amber-100 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-amber-700">
          What Our Members Say 
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <p className="italic text-gray-600">
              “Dite helped me find my motivation again! Their AI coach keeps me consistent and inspired.”
            </p>
            <h4 className="mt-4 font-semibold text-amber-600">– Aisha R.</h4>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <p className="italic text-gray-600">
              “The personalized plan feels made just for me. I’m stronger and more confident now!”
            </p>
            <h4 className="mt-4 font-semibold text-amber-600">– Rohan S.</h4>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <p className="italic text-gray-600">
              “Everything’s so easy to follow — diet, exercise, even sleep tracking. Total life upgrade!”
            </p>
            <h4 className="mt-4 font-semibold text-amber-600">– Priya M.</h4>
          </div>
        </div>
      </section>

      {/* ================= CTA / FOOTER ================= */}
      <section className="bg-amber-400 py-16 text-center text-gray-900">
        <Apple className="w-12 h-12 mx-auto mb-4" />
        <h2 className="text-4xl font-bold mb-4">Start Your Wellness Journey Today </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Sign up and get your personalized fitness & diet plan powered by smart AI insights.
        </p>
        <button className="px-10 py-3 bg-white text-amber-700 font-semibold rounded-full hover:bg-amber-100 transition">
          Join Now
        </button>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-6 text-center text-sm">
        © {new Date().getFullYear()} Dite. All rights reserved. | Designed with 💛 by sneha mishra
      </footer>
    </div>
  );
};

export default Home;