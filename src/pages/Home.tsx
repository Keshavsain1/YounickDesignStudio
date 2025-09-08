// src/pages/Home.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Users, Building, Award } from "lucide-react";
import { projects, Project } from "../data/projects";
import { services } from "../data/services";
import { teamMembers } from "../data/team";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import ServiceCard from "../components/ServiceCard";
import SEOHead from "../components/SEOHead";
import { pageSEO } from "../utils/seo";
import TestimonialCarousel from "../components/TestimonialCarousel";
import useReveal from "../hooks/useReveal";

const Home: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // -------------------------
  // Brand config (edit here)
  // -------------------------
  const BRAND_PRIMARY = "#2563eb"; // tailwind blue-600
  const BRAND_ACCENT = "#06b6d4"; // cyan-500
  const BRAND_ACCENT_2 = "#f59e0b"; // amber-500
  const GLASS_OPACITY = 0.12;
  const GLASS_BLUR = 8;

  const featuredProjects = projects.filter((project) => project.featured);

  const ROLE_RE = /^(founder|co-?founder|ceo)$/i;
  const leadership = teamMembers.filter((m) => {
    if (m.isFounder === true) return true;
    if (typeof m.role === "string" && ROLE_RE.test(m.role.trim())) return true;
    return false;
  });

  const overrideImages: Record<string, string> = {};

  const orderPriority = (m: any) => {
    const role = (m.role || "").toLowerCase();
    if (role.includes("founder") && !role.includes("co")) return 0;
    if (role.includes("co") && role.includes("founder")) return 1;
    if (role.includes("ceo")) return 2;
    return 3;
  };
  leadership.sort((a, b) => orderPriority(a) - orderPriority(b));

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const stats = [
    { icon: Building, label: "Projects Completed", value: "150+" },
    { icon: Users, label: "Happy Clients", value: "120+" },
    { icon: Award, label: "Years Experience", value: "10+" },
    { icon: Star, label: "Client Satisfaction", value: "98%" },
  ];

  const decorImages = projects.slice(0, 6).map((p) => p.image || "/default-project.jpg");

  const gradientEven = `linear-gradient(90deg, ${BRAND_PRIMARY}22, ${BRAND_ACCENT}10)`;
  const gradientOdd = `linear-gradient(90deg, ${BRAND_ACCENT_2}22, ${BRAND_PRIMARY}08)`;

  /* ------- Small helper components with reveal + float ------- */

  // Updated StatCard: now renders the passed icon
  const StatCard: React.FC<{
    value: string;
    label: string;
    index: number;
    icon: React.ElementType;
  }> = ({ value, label, index, icon: Icon }) => {
    const { ref, isVisible } = useReveal<HTMLDivElement>();
    return (
      <div
        ref={ref}
        className={`relative flex flex-col items-center justify-center p-6 rounded-2xl transition-transform duration-500 transform-gpu will-change-transform
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          hover:-translate-y-3 hover:shadow-2xl`}
      >
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 shadow"
          style={{
            background: "rgba(255,255,255,0.18)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: BRAND_PRIMARY,
          }}
          aria-hidden
        >
          {/* render the icon passed in */}
          <Icon size={20} aria-hidden="true" />
        </div>

        <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{value}</div>
        <div className="text-gray-700 text-sm">{label}</div>

        {/* soft colored glow behind each stat */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: -1,
            transform: "translateY(0.35rem)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 16,
              opacity: 0.08,
              background: index % 2 === 0 ? gradientEven : gradientOdd,
              filter: "blur(18px)",
            }}
          />
        </div>
      </div>
    );
  };

  const FloatDecorImage: React.FC<{ src: string; w?: number; h?: number; alt?: string; additionalClasses?: string }> = ({ src, alt, additionalClasses }) => {
    const { ref, isVisible } = useReveal<HTMLDivElement>();
    return (
      <div
        ref={ref}
        className={`rounded-lg overflow-hidden shadow-lg transform-gpu will-change-transform transition duration-600
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          hover:-translate-y-3 hover:shadow-2xl ${additionalClasses || ""}`}
        aria-hidden
      >
        <img src={src} alt={alt || ""} className="w-full h-full object-cover" loading="lazy" decoding="async" />
      </div>
    );
  };

  return (
    <>
      <SEOHead seo={pageSEO.home} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-bg" />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Younick Design Studio</h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Transforming spaces into extraordinary experiences through innovative interior design, construction excellence,
            and creative visualization services across Rajasthan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/projects"
              aria-label="View our projects"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>View Our Work</span>
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/contact"
              aria-label="Get started with Younick Design Studio"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* ===== UPDATED: Stats Section — glass strip with aligned stats (brandable) ===== */}
      <section className="relative py-12">
        <div
          className="absolute inset-0"
          style={{
            background: `rgba(255,255,255,${GLASS_OPACITY})`,
            backdropFilter: `blur(${GLASS_BLUR}px)`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <StatCard key={index} value={stat.value} label={stat.label} index={index} icon={stat.icon} />
            ))}
          </div>
        </div>
      </section>
      {/* ===== END Stats Section ===== */}

      {/* Why Choose Us (enhanced) */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div aria-hidden className="hidden lg:block absolute right-8 top-10">
          <div className="flex flex-col gap-4 items-end">
            <div className="w-40 h-28">
              <FloatDecorImage src={decorImages[0]} additionalClasses="w-40 h-28 rounded-xl" />
            </div>
            <div className="w-32 h-24 -translate-x-6">
              <FloatDecorImage src={decorImages[1]} additionalClasses="w-32 h-24 rounded-lg" />
            </div>
            <div className="w-24 h-20 translate-y-6">
              <FloatDecorImage src={decorImages[2]} additionalClasses="w-24 h-20 rounded-lg" />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                Why Choose <span className="text-blue-600">Younick Design Studio</span>
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Transforming spaces, elevating lives — we design interiors that reflect who you are and how you live.
                Our approach blends creativity, technical expertise, and careful project management to deliver
                beautiful, functional spaces.
              </p>

              <ul className="grid gap-4 sm:grid-cols-2">
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-blue-50 text-blue-600 rounded-lg p-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M12 3v0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="7.5" cy="11.5" r="1.5" fill="currentColor" />
                      <circle cx="11" cy="7.5" r="1.5" fill="currentColor" />
                      <circle cx="16.5" cy="9.5" r="1.5" fill="currentColor" />
                      <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-semibold">Tailored Creativity</h4>
                    <p className="text-gray-600 text-sm">Designs built around your lifestyle and tastes — never one-size-fits-all.</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-green-50 text-green-600 rounded-lg p-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-semibold">Quality Craftsmanship</h4>
                    <p className="text-gray-600 text-sm">On-site standards and materials that stand the test of time.</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-amber-50 text-amber-600 rounded-lg p-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M3 12v4h8l-2-3 6-3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M21 12v-1a2 2 0 0 0-2-2h-6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-semibold">Collaborative Process</h4>
                    <p className="text-gray-600 text-sm">We keep you involved — from moodboards to final walkthroughs.</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-indigo-50 text-indigo-600 rounded-lg p-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M21 16V8l-9-5-9 5v8l9 5 9-5z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 3v18" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-semibold">Visualization & Precision</h4>
                    <p className="text-gray-600 text-sm">3D visuals and meticulous planning reduce surprises — and speed up delivery.</p>
                  </div>
                </li>
              </ul>

              <div className="mt-6">
                <Link
                  to="/about"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  aria-label="Read more about Younick Design Studio"
                >
                  Learn More About Us
                </Link>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="w-full rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={decorImages[3] || featuredProjects[0]?.image || "/default-project.jpg"}
                  alt="Sample interior by Younick"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-80 object-cover rounded-2xl transition-transform duration-500 hover:-translate-y-2"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our most remarkable projects showcasing our expertise in creating exceptional spaces
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onClick={() => handleProjectClick(project)} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/projects"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <span>View All Projects</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive design and construction services tailored to bring your vision to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== REPLACED: Testimonials (decorated premium) ===== */}
      <section className="py-16 relative">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `linear-gradient(180deg, ${BRAND_PRIMARY}10, #ffffff)`,
          }}
          aria-hidden="true"
        />

        <div className="hidden lg:block absolute left-6 top-6 text-[10rem] leading-none select-none text-[rgba(37,99,235,0.06)]" aria-hidden>
          “
        </div>

        <div className="absolute right-6 top-24 hidden lg:flex flex-col gap-6 items-end">
          {decorImages.slice(0, 3).map((src, i) => {
            const { ref, isVisible } = useReveal<HTMLDivElement>();
            return (
              <div
                key={i}
                ref={ref}
                className={`rounded-lg overflow-hidden transform transition-transform duration-500 ${i % 2 ? "translate-x-3 rotate-2" : "-translate-x-3 -rotate-2"}
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} hover:-translate-y-3 hover:shadow-2xl`}
                style={{ width: i === 0 ? 160 : i === 1 ? 140 : 120 }}
                aria-hidden="true"
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            );
          })}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Real feedback from clients we partnered with on design and construction projects.</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-50">
              <TestimonialCarousel />
            </div>

            <div className="absolute -left-6 -top-6 w-24 h-24 rounded-xl bg-gradient-to-tr from-blue-100/40 to-transparent blur-md opacity-60 pointer-events-none" aria-hidden />
            <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-xl bg-gradient-to-br from-amber-100/40 to-transparent blur-md opacity-50 pointer-events-none" aria-hidden />
          </div>
        </div>
      </section>
      {/* ===== END Testimonials ===== */}

      {/* Leadership strip */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900">Leadership</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Founders, Co-Founders and CEO leading Younick Design Studio
            </p>
          </div>

          <div className="flex items-stretch justify-center gap-8 flex-wrap mb-12">
            {leadership.map((member) => {
              const imgSrc = overrideImages[member.id] || (member as any).image || "/default-avatar.jpg";
              return (
                <div
                  key={member.id || member.name}
                  className="w-64 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:-translate-y-1 hover:shadow-xl transition"
                >
                  <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 inline-block">
                    <img src={imgSrc} alt={member.name} className="w-full h-full object-cover transition-transform duration-300 hover:-translate-y-2" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-blue-600 font-medium">{member.role}</p>
                  </div>
                  <p className="mt-3 text-sm text-gray-600 line-clamp-3">
                    {(member as any).bio || (member as any).about || "Core member of Younick leadership, driving design and innovation."}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              to="/team"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <span>Meet Our Full Team</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Home;
