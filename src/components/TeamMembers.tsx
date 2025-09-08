import React from "react";
import TeamMember from "./TeamMember";
import { teamMembers } from "../data/team";

const TeamMembers: React.FC = () => {
  return (
    <section
      className="py-16 bg-gray-50"
      aria-labelledby="team-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2
            id="team-heading"
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The visionary designers and builders behind{" "}
            <span className="text-blue-600 font-semibold">
              Younick Design Studio
            </span>
            . Dedicated to creating extraordinary spaces with passion and
            expertise.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <TeamMember key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;
