// src/components/ProjectCard.tsx
import React from "react";
import { MapPin, Calendar, Square } from "lucide-react";
import { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

/**
 * Simple ProjectCard — uniform 4:3 card, images shown fully (no crop),
 * no toggle button. If image aspect differs, letterboxing (bg) will appear.
 */
const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  // Category-based colors
  const categoryColors: Record<string, string> = {
    "Interior Design": "bg-primary text-dark",
    "Construction": "bg-amber-500 text-white",
    "Renovation": "bg-teal-500 text-white",
    "Consultation": "bg-indigo-500 text-white",
    "3D Visualization": "bg-pink-500 text-white",
  };

  const categoryClass = categoryColors[project.category] || "bg-primary text-dark";

  return (
    <article
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-transform duration-300 cursor-pointer group"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      aria-label={`Project: ${project.title}`}
    >
      {/* Project Image - fixed aspect ratio (4:3), object-contain ensures no crop */}
      <div className="relative">
        <div className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={project.image || "/default-project.jpg"}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold shadow ${categoryClass}`}>
            {project.category}
          </span>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4">
            <span className="bg-primary text-dark px-3 py-1 rounded-full text-sm font-semibold shadow">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors duration-200 mb-2">
          {project.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

        {/* Extra details */}
        <div className="space-y-2 text-sm text-gray-500">
          {project.location && (
            <div className="flex items-center space-x-2">
              <MapPin size={16} className="text-primary" aria-hidden="true" />
              <span>{project.location}</span>
            </div>
          )}
          {project.area && (
            <div className="flex items-center space-x-2">
              <Square size={16} className="text-primary" aria-hidden="true" />
              <span>{project.area}</span>
            </div>
          )}
          {project.completionDate && (
            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-primary" aria-hidden="true" />
              <span>{project.completionDate}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
