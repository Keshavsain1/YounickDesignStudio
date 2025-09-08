// src/components/TeamMember.tsx
import React from "react";
import { Mail, Phone, MessageCircle, Linkedin, Instagram } from "lucide-react";
import { TeamMember as TeamMemberType } from "../data/team";

interface TeamMemberProps {
  member: TeamMemberType;
}

const TeamMember: React.FC<TeamMemberProps> = ({ member }) => {
  // Compact layout for founders/CEO
  const isCompact = !!member.isFounder;

  return (
    <article
      id={`member-${member.id}`}
      tabIndex={-1}
      className={`bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 ${
        isCompact ? "hover:-translate-y-1" : "hover:-translate-y-2 hover:shadow-xl"
      }`}
      role="article"
      aria-label={`Team member: ${member.name}`}
    >
      {/* Image + Badge */}
      <div className={`relative overflow-hidden ${isCompact ? "h-48" : "h-64"}`}>
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
        {(member.isFounder || member.badge) && (
          <div className="absolute top-3 right-3">
            <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow">
              {member.badge ? member.badge : "Founder"}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className={`${isCompact ? "p-4" : "p-6"}`}>
        <h3
          className={`${
            isCompact ? "text-lg" : "text-xl"
          } font-semibold text-gray-900 mb-1`}
        >
          {member.name}
        </h3>
        <p
          className={`${
            isCompact ? "text-sm" : "text-base"
          } text-blue-600 font-medium mb-3`}
        >
          {member.role}
        </p>

        <p className={`text-gray-600 mb-4 ${isCompact ? "text-sm" : ""}`}>
          {member.description}
        </p>

        {/* Expertise */}
        {Array.isArray(member.expertise) && member.expertise.length > 0 && (
          <div className={`${isCompact ? "mb-3" : "mb-6"}`}>
            {!isCompact && (
              <h4 className="text-sm font-semibold text-gray-900 mb-2">
                Expertise
              </h4>
            )}
            <div className="flex flex-wrap gap-2">
              {member.expertise.map((skill, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded-full text-sm ${
                    isCompact
                      ? "bg-gray-100 text-gray-800"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contact Info */}
        <div
          className={`space-y-2 border-t border-gray-100 ${
            isCompact ? "pt-2" : "pt-4"
          }`}
        >
          <h4 className="text-sm font-semibold text-gray-900">Contact</h4>

          {member.contact?.email && (
            <a
              href={`mailto:${member.contact.email}`}
              className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors text-sm"
            >
              <Mail size={14} aria-hidden="true" />
              <span>{member.contact.email}</span>
            </a>
          )}

          {member.contact?.phone && (
            <a
              href={`tel:${member.contact.phone}`}
              className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors text-sm"
            >
              <Phone size={14} aria-hidden="true" />
              <span>{member.contact.phone}</span>
            </a>
          )}

          {member.contact?.whatsapp && (
            <a
              href={`https://wa.me/${member.contact.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-gray-600 hover:text-green-600 transition-colors text-sm"
            >
              <MessageCircle size={14} aria-hidden="true" />
              <span>WhatsApp</span>
            </a>
          )}

          {/* Social Links */}
          {(member.social?.linkedin || member.social?.instagram) && (
            <div className="flex space-x-2 pt-1">
              {member.social.linkedin && (
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <Linkedin size={14} aria-hidden="true" />
                </a>
              )}
              {member.social.instagram && (
                <a
                  href={member.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 bg-pink-50 text-pink-600 rounded-md hover:bg-pink-100 transition-colors"
                  aria-label={`${member.name} Instagram`}
                >
                  <Instagram size={14} aria-hidden="true" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default TeamMember;
