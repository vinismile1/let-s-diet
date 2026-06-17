import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-amber-50 text-gray-800">
      
      {/* ================ HERO SECTION ================ */}
      <section
        className="relative bg-[url('https://cdn.pixabay.com/photo/2017/08/01/12/00/vegetable-2564754_1280.jpg')]
        bg-cover bg-center bg-no-repeat h-96 flex items-center justify-center text-white"
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-20 text-center px-6">
          <h1 className="text-5xl font-bold mb-3 drop-shadow-lg">
            Get in Touch 
          </h1>
          <p className="text-lg text-gray-100 max-w-2xl mx-auto">
            Have questions, suggestions, or just want to say hi?  
            We’d love to hear from you!
          </p>
        </div>
      </section>

      {/* ================ CONTACT INFO + FORM ================ */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-8">
          <h2 className="text-3xl font-bold text-amber-600">Contact Information</h2>
          <p className="text-gray-600">
            Reach out anytime — our friendly team is here to assist you with your wellness journey.
          </p>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-amber-500" />
              <span>support@ditefit.com</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-amber-500" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-6 h-6 text-amber-500" />
              <span>123 Wellness Street, Pune, India</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
          <h3 className="text-2xl font-semibold mb-6 text-amber-600">
            Send Us a Message
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message here..."
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full mt-4 flex items-center justify-center gap-2 bg-amber-400 text-gray-900 font-semibold py-3 rounded-full hover:bg-amber-300 transition"
            >
              <Send className="w-5 h-5" /> Send Message
            </button>
          </div>
        </form>
      </section>

      {/* ================ MAP SECTION ================ */}
      <section className="bg-amber-100 py-12 text-center">
        <h2 className="text-3xl font-bold mb-6 text-amber-700">Visit Us </h2>
        <div className="max-w-4xl mx-auto">
          <iframe
            title="Dite Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.725932292836!2d73.85674331490156!3d18.520430087404226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c0692e94b8b9%3A0x2f9e3cb2cbdb10a5!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1698573820951!5m2!1sen!2sin"
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
            className="rounded-2xl shadow-md border-0"
          ></iframe>
        </div>
      </section>

      {/* ================ FOOTER ================ */}
      <footer className="bg-gray-900 text-gray-300 py-6 text-center text-sm">
        © {new Date().getFullYear()} Dite. All rights reserved. | Designed with 💛 by sneha mishra
      </footer>
    </div>
  );
};

export default Contact;
