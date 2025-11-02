import React from "react";
import { Users, Target, Award, Smile } from "lucide-react";
import { Dumbbell } from "lucide-react";

const About = () => {
  return (
    <div className="bg-amber-50 text-gray-800">

      {/* ================ HERO SECTION ================ */}
      <section
        className="relative bg-[url('https://cdn.pixabay.com/photo/2017/01/06/19/15/woman-1958723_1280.jpg')]
        bg-cover bg-center bg-no-repeat h-96 flex items-center justify-center text-white"
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-20 text-center px-6">
          <h1 className="text-5xl font-bold mb-3 drop-shadow-lg">
            About <span className="text-amber-400">Dite</span>
          </h1>
          <p className="text-lg text-gray-100 max-w-2xl mx-auto">
            Your journey to fitness, balance, and self-love begins here. 
            We’re more than just workouts — we’re your wellness partner.
          </p>
        </div>
      </section>

      {/* ================ WHO WE ARE ================ */}
      <section className="py-16 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-amber-600">
          Who We Are
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          <span className="font-semibold text-amber-500">Dite</span> was built with one mission — to make health simple, fun, and personal.  
          We believe everyone deserves access to a fitness and diet plan that fits *their* life, not the other way around.
          Our AI-driven platform combines nutrition guidance, smart workouts, and lifestyle tracking to help you grow — physically and mentally. 🌱
        </p>
      </section>

      {/* ================ MISSION & VISION ================ */}
      <section className="bg-white py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto items-center">
          <div className="p-8 rounded-2xl shadow-lg bg-amber-100 hover:shadow-2xl transition text-center">
            <Target className="w-12 h-12 mx-auto text-amber-600 mb-4" />
            <h3 className="text-2xl font-semibold mb-3">Our Mission</h3>
            <p className="text-gray-600">
              To empower people to achieve their health goals with smart, easy-to-follow, and sustainable habits.
              We want fitness to feel natural, not stressful.
            </p>
          </div>

          <div className="p-8 rounded-2xl shadow-lg bg-amber-100 hover:shadow-2xl transition text-center">
            <Award className="w-12 h-12 mx-auto text-green-600 mb-4" />
            <h3 className="text-2xl font-semibold mb-3">Our Vision</h3>
            <p className="text-gray-600">
              To become the world’s most trusted digital wellness companion —  
              helping millions lead happier, healthier lives through technology and care.
            </p>
          </div>
        </div>
      </section>

      {/* ================ OUR TEAM ================ */}
      <section className="py-16 px-6 bg-amber-100 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-amber-700">
          Meet Our Team 
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Behind Dite is a passionate team of developers, nutritionists, trainers, and dreamers
          who believe in making wellness accessible for everyone.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <Users className="w-10 h-10 mx-auto text-blue-500 mb-3" />
            <h4 className="font-semibold text-xl mb-1">Sneha Mishra</h4>
            <p className="text-gray-600 text-sm">Founder & Wellness Coach</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <Smile className="w-10 h-10 mx-auto text-amber-500 mb-3" />
            <h4 className="font-semibold text-xl mb-1">Sneha</h4>
            <p className="text-gray-600 text-sm">Creative Developer & Designer</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <Dumbbell className="w-10 h-10 mx-auto text-green-500 mb-3" />
            <h4 className="font-semibold text-xl mb-1">Vivek Nigam</h4>
            <p className="text-gray-600 text-sm">Fitness & AI Advisor</p>
          </div>
        </div>
      </section>

      {/* ================ CTA ================ */}
      <section className="bg-amber-400 py-16 text-center text-gray-900">
        <h2 className="text-4xl font-bold mb-4">Join Our Wellness Movement </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Be part of a growing family that believes in mindful living and smart fitness.
        </p>
        <button className="px-10 py-3 bg-white text-amber-700 font-semibold rounded-full hover:bg-amber-100 transition">
          Get Started
        </button>
      </section>

      {/* ================ FOOTER ================ */}
      <footer className="bg-gray-900 text-gray-300 py-6 text-center text-sm">
        © {new Date().getFullYear()} Dite. All rights reserved. | Designed with 💛 by sneha mishra
      </footer>
    </div>
  );
};

export default About;
