import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Service } from "../data/services";
import * as Icons from "lucide-react";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  // Resolve icon from lucide-react dynamically
  const Icon =
    (Icons[service.icon as keyof typeof Icons] as React.ComponentType<any>) ||
    Icons.LayoutDashboard; // fallback icon

  return (
    <article
      className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-transform duration-300"
      role="article"
      aria-label={`Service: ${service.title}`}
    >
      {/* Service Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <div className="flex items-center space-x-2 mb-1">
            <Icon size={26} className="text-white" />
            <h3 className="text-xl font-semibold">{service.title}</h3>
          </div>
        </div>
      </div>

      {/* Service Details */}
      <div className="p-6">
        <p className="text-gray-600 mb-4">{service.description}</p>

        {/* Features List */}
        <ul className="space-y-2 mb-6">
          {service.features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center space-x-2 text-gray-700 text-sm"
            >
              <CheckCircle size={16} className="text-blue-600" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link
          to={`/projects?filter=${service.id}`}
          className="flex items-center justify-between w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          <span className="font-medium">View Projects</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </article>
  );
};

export default ServiceCard;
