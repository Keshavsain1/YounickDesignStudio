// src/pages/OurTeam.tsx
import React, { useEffect } from "react";
import { teamMembers } from "../data/team";
import TeamMember from "../components/TeamMember";
import SEOHead from "../components/SEOHead";
import { pageSEO } from "../utils/seo";
import { useLocation } from "react-router-dom";

const OurTeam: React.FC = () => {
  // Show only founders and co-founders.
  // Use either an explicit isFounder flag or role string matching (case-insensitive)
  const leadership = teamMembers.filter(
    (m) =>
      m.isFounder === true ||
      (typeof m.role === "string" && /^(co-?founder|founder)$/i.test(m.role.trim()))
  );

  const location = useLocation();

  // Smooth-scroll to hash if present (e.g., /team#pooja-sain)
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    const el = document.getElementById(`member-${id}`);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        (el as HTMLElement).focus();
        // subtle highlight
        el.classList.add("ring-4", "ring-primary/30", "rounded-xl");
        setTimeout(() => el.classList.remove("ring-4", "ring-primary/30", "rounded-xl"), 2200);
      }, 80);
    }
  }, [location.hash]);

  return (
    <>
      <SEOHead seo={pageSEO.team} />

      <div className="pt-24 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Our Team</h1>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              Meet the leadership behind Younick Design Studio
            </p>
          </div>

          {/* Leadership — only Founder / Co-Founder */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Leadership</h2>
            {leadership.length === 0 ? (
              <p className="text-center text-gray-600">No leadership profiles available.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
                {leadership.map((member) => (
                  <div key={member.id} className="max-w-xs mx-auto">
                    <TeamMember member={member} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* (Optional) Keep join CTA */}
          <div className="mt-8 flex justify-center">
            <div className="bg-white rounded-lg shadow-sm px-6 py-5 text-center max-w-xl w-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Interested in joining us?</h3>
              <p className="text-gray-600 text-sm mb-3">
                We welcome designers, architects and builders. Send your CV & portfolio.
              </p>
              <a
                href="mailto:careers@younickdesign.com"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Send Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurTeam;
