import React from "react";
import { MessageCircle, FileSearch, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <MessageCircle className="w-10 h-10 text-blue-600" />,
      title: "Ask a Question",
      desc: "Type your legal query in plain English — no complex jargon required.",
    },
    {
      icon: <FileSearch className="w-10 h-10 text-blue-600" />,
      title: "AI Searches the Law",
      desc: "Verdict scans case law, statutes, and precedents to find the most relevant insights.",
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-blue-600" />,
      title: "Get Clear Insights",
      desc: "Receive simplified explanations and case references you can trust — instantly.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            How <span className="text-blue-600">Verdict</span> Works
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            From question to insight in just three simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="p-4 bg-blue-50 rounded-full">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
