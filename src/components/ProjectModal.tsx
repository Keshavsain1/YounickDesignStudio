// src/components/ProjectModal.tsx
import React, { useEffect, useState, useRef } from "react";
import {
  X,
  MapPin,
  Calendar,
  Square,
  Phone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Project } from "../data/projects";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (!isOpen) return;
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") prevSlide();
      if (event.key === "ArrowRight") nextSlide();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, project]);

  // Reset slider when new project opens
  useEffect(() => {
    if (isOpen) setCurrentIndex(0);
  }, [isOpen, project]);

  // Auto-play (every 5s) — pauses on hover/focus
  useEffect(() => {
    if (!isOpen || !project || project.images.length <= 1) return;
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [isOpen, project, isPaused]);

  if (!isOpen || !project) return null;

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      aria-labelledby="project-title"
      aria-modal="true"
      role="dialog"
      onClick={onClose} // Close on background click
    >
      <div
        className="relative w-full max-w-5xl rounded-2xl bg-white text-gray-900 p-6 shadow-xl transition-all duration-300 transform animate-fadeInScale overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()} // Prevent closing on content click
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Close project details"
        >
          <X className="h-5 w-5 text-gray-700" aria-hidden="true" />
        </button>

        {/* Project Title */}
        <h2 id="project-title" className="text-3xl font-bold mb-4">
          {project.title}
        </h2>

        {/* Image Slider */}
        <div
          className="relative mb-6"
          ref={sliderRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          {/* Image: use object-contain so image is NOT cropped */}
          <div className="w-full flex items-center justify-center bg-gray-50 rounded-lg">
            <img
              src={project.images[currentIndex]}
              alt={`${project.title} - ${currentIndex + 1}`}
              className="max-w-full max-h-[60vh] object-contain rounded-lg"
              loading="lazy"
              decoding="async"
            />
          </div>

          {project.images.length > 1 && (
            <>
              {/* Prev Button */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Previous image"
                title="Previous"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Next Button */}
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Next image"
                title="Next"
              >
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Dots Indicator */}
              <div
                className="flex justify-center mt-3 space-x-2"
                aria-live="polite"
              >
                {project.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentIndex ? "bg-primary" : "bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Short Description */}
        <p className="text-gray-700 leading-relaxed mb-6">{project.description}</p>

        {/* Info Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 mb-6">
          {project.location && (
            <div className="flex items-center space-x-2">
              <MapPin size={18} className="text-primary" aria-hidden="true" />
              <span>{project.location}</span>
            </div>
          )}
          {project.area && (
            <div className="flex items-center space-x-2">
              <Square size={18} className="text-primary" aria-hidden="true" />
              <span>{project.area}</span>
            </div>
          )}
          {project.completionDate && (
            <div className="flex items-center space-x-2">
              <Calendar size={18} className="text-primary" aria-hidden="true" />
              <span>{project.completionDate}</span>
            </div>
          )}
          {project.clientContact && (
            <div className="flex items-center space-x-2">
              <Phone size={18} className="text-primary" aria-hidden="true" />
              <span>{project.clientContact}</span>
            </div>
          )}
        </div>

        {/* Work Scope */}
        {project.workScope && project.workScope.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Work Scope</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {project.workScope.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Featured Badge */}
        {project.featured && (
          <div className="mt-4">
            <span className="bg-primary text-dark px-3 py-1 rounded-full text-sm font-semibold shadow">
              Featured Project
            </span>
          </div>
        )}

        {/* Long Description */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3">About This Project</h3>
          {project.longDescription ? (
            <p className="text-gray-700 leading-relaxed">{project.longDescription}</p>
          ) : (
            <p className="text-gray-500 italic">More details coming soon...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
