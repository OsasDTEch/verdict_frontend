import React from "react";
import { Search, BookOpen, Brain, Globe } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Search className="w-8 h-8 text-blue-600" />,
      title: "Instant Case Search",
      desc: "Find relevant precedents and judgments in seconds with AI-powered search.",
    },
    {
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      title: "Summarized Insights",
      desc: "Complex case law simplified into clear, concise explanations you can trust.",
    },
    {
      icon: <Brain className="w-8 h-8 text-blue-600" />,
      title: "AI-Powered Querying",
      desc: "Ask legal questions in plain English — get precise answers instantly.",
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-600" />,
      title: "Accessible Anywhere",
      desc: "Cloud-based and available on all your devices, anytime you need it.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Why choose <span className="text-blue-600">Verdict?</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Harness the power of AI to simplify legal research. Get fast, reliable insights
            without drowning in case files.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
