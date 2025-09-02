import React from "react";
import { Link } from "react-router-dom";

const FooterCTA = () => {
  return (
    <div className="bg-black text-white py-20 px-6 text-center rounded-t-3xl shadow-lg">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Ready to explore the future of legal research?
      </h2>
      <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
        Verdict redefines how lawyers, students, and researchers interact with
        case law and legal knowledge. Fast, intelligent, and built for the next
        generation of law professionals.
      </p>
      <div className="flex justify-center gap-6">
        <Link className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-semibold text-white shadow-md transition">
            <Link to='/login'>
          Try Verdict Now</Link>
        </Link>
        <button className="border border-blue-600 px-8 py-3 rounded-xl font-semibold text-blue-400 hover:bg-blue-600/10 transition">
          <a href="https://github.com/OsasDTech">View on GitHub</a>
        </button>
      </div>
      <div className="mt-12 text-gray-500 text-sm">
        Built with ❤️ by Omons Wisdom | AI Engineer
      </div>
    </div>
  );
};

export default FooterCTA;
