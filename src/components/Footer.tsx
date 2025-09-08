import React from "react";
import { Instagram, Facebook, Youtube, MessageCircle } from "lucide-react";

const Footer: React.FC = () => {
  const socialLinks = [
    {
      icon: Instagram,
      href: "https://www.instagram.com/studio.younick",
      label: "Instagram",
    },
    {
      icon: Facebook,
      href: "https://www.facebook.com/studioyounick",
      label: "Facebook",
    },
    {
      icon: Youtube,
      href: "https://www.youtube.com/@Younickdesignstudio",
      label: "YouTube",
    },
    {
      icon: MessageCircle,
      href: "https://wa.me/918854883058",
      label: "WhatsApp",
    },
  ];

  return (
    <footer aria-label="Site Footer" className="bg-dark text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"> {/* reduced vertical padding */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"> {/* 3-column compact layout */}
          {/* Company Info (compact) */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-3">
              <img
                src="/younick-logo.PNG"
                alt="Younick Design Studio"
                className="h-8 w-auto" /* smaller logo */
                loading="lazy"
                decoding="async"
              />
              <span className="text-lg font-semibold text-primary">Younick</span> {/* short brand */}
            </div>

            <p className="text-sm text-gray-400 max-w-sm">
              We blend creativity and craftsmanship to transform ideas into
              memorable spaces. (Jaipur, Rajasthan)
            </p>

            <div className="flex items-center space-x-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 bg-white/5 rounded-md hover:bg-primary/20 transition-colors duration-150"
                    aria-label={social.label}
                  >
                    <Icon size={16} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services (compact list, collapsible on small screens) */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-primary">Services</h3>

            {/* desktop: plain list; mobile: details tag collapses */}
            <div className="hidden sm:block text-sm space-y-2">
              <a href="/projects?filter=interior-design" className="block hover:text-primary">Interior Design</a>
              <a href="/projects?filter=construction" className="block hover:text-primary">Construction</a>
              <a href="/projects?filter=renovation" className="block hover:text-primary">Renovation</a>
              <a href="/projects?filter=consultation" className="block hover:text-primary">Consultation</a>
              <a href="/projects?filter=3d-visualization" className="block hover:text-primary">3D Visualization</a>
            </div>

            <details className="sm:hidden text-sm">
              <summary className="cursor-pointer list-none">View Services</summary>
              <div className="mt-2 space-y-2">
                <a href="/projects?filter=interior-design" className="block hover:text-primary">Interior Design</a>
                <a href="/projects?filter=construction" className="block hover:text-primary">Construction</a>
                <a href="/projects?filter=renovation" className="block hover:text-primary">Renovation</a>
                <a href="/projects?filter=consultation" className="block hover:text-primary">Consultation</a>
                <a href="/projects?filter=3d-visualization" className="block hover:text-primary">3D Visualization</a>
              </div>
            </details>
          </div>

          {/* Contact (condensed) */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-primary">Contact</h3>
            <address className="not-italic text-sm space-y-1">
              <p>Orbit Mall, Civil Lines, Jaipur</p>
              <p>
                <a href="tel:+918854883058" className="hover:text-primary">+91 88548 83058</a>
                {" / "}
                <a href="tel:+919166776697" className="hover:text-primary">+91 91667 76697</a>
              </p>
              <p>
                <a href="mailto:studioyounick@gmail.com" className="hover:text-primary">studioyounick@gmail.com</a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom small copyright row */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Younick Design Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
