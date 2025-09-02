import React from "react";
import hero from "../assets/hero.jpeg";

const Hero = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6 py-16">
      {/* Text Content */}
      <div className="md:w-1/2 text-center md:text-left space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-800">
          AI-powered legal research, <span className="text-blue-600">simplified.</span>
        </h1>
        <p className="text-gray-600 text-lg">
          Verdict helps lawyers, students, and researchers cut through legal complexity. 
          Instantly search case law, discover precedents, and get clear insights — all in one place.
        </p>
        <div className="flex justify-center md:justify-start space-x-4">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
            Get Started
          </button>
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition">
            Learn More
          </button>
        </div>
      </div>

      {/* Image */}
      <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
        <img
          src={hero}
          alt="AI legal research illustration"
          className="w-full max-w-md rounded-xl shadow-lg"
        />
      </div>
    </section>
  );
};

export default Hero;
