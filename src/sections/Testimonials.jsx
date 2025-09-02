import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "Verdict has transformed the way I do legal research. What used to take hours now takes minutes.",
      name: "Sarah Johnson",
      role: "Law Student",
    },
    {
      quote:
        "As a practicing lawyer, I rely on Verdict to quickly find relevant precedents. It's a game-changer.",
      name: "David Kim",
      role: "Attorney at Law",
    },
    {
      quote:
        "I use Verdict daily for academic research. The AI summaries are clear, accurate, and save me so much time.",
      name: "Dr. Emily Carter",
      role: "Law Professor",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Trusted by <span className="text-blue-600">Professionals</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Lawyers, students, and academics rely on Verdict to simplify legal
            research and deliver accurate insights.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <p className="text-gray-700 italic mb-4">“{t.quote}”</p>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  {t.name}
                </h4>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
