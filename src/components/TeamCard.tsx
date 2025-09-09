import React from "react";
import { Mail, Phone, Linkedin, Instagram } from "lucide-react";
import { TeamMember } from "../data/team";

interface TeamCardProps {
  member: TeamMember;
}

const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
  return (
    <article
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-transform duration-300"
      role="article"
      aria-label={`Team member: ${member.name}`}
    >
      {/* Image */}
      <div className="h-64 overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
        <p className="text-blue-600 font-medium mb-3">{member.role}</p>
        <p className="text-gray-600 mb-4">{member.description}</p>

        {/* Contacts */}
        <div className="flex space-x-4 text-gray-600">
          {member.contact?.email && (
            <a
              href={`mailto:${member.contact.email}`}
              aria-label={`${member.name} email`}
              className="hover:text-blue-600"
            >
              <Mail size={18} />
            </a>
          )}
          {member.contact?.phone && (
            <a
              href={`tel:${member.contact.phone}`}
              aria-label={`${member.name} phone`}
              className="hover:text-blue-600"
            >
              <Phone size={18} />
            </a>
          )}
          {member.contact?.linkedin && (
            <a
              href={member.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.name} LinkedIn`}
              className="hover:text-blue-600"
            >
              <Linkedin size={18} />
            </a>
          )}
          {member.contact?.instagram && (
            <a
              href={member.contact.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.name} Instagram`}
              className="hover:text-pink-600"
            >
              <Instagram size={18} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default TeamCard;
