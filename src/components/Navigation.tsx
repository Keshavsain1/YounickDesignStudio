// src/components/Navigation.tsx
import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import {
  Search,
  X as XIcon,
  Menu,
  X,
  Home,
  FolderOpen,
  Users,
  Phone,
  Info,
} from "lucide-react";
import { projects } from "../data/projects";
import { teamMembers } from "../data/team";

interface NavigationProps {
  onSearch: (query: string) => void;
}

const DEBOUNCE_MS = 250;

type Suggestion =
  | { type: "project"; title: string; projectId: string }
  | { type: "team"; name: string; role: string; memberId: string };

const Navigation: React.FC<NavigationProps> = ({ onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const debounceRef = useRef<number | null>(null);
  const suggestionsRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // When on /projects, populate searchQuery from ?search=
  useEffect(() => {
    if (location.pathname.startsWith("/projects")) {
      const q = searchParams.get("search") || "";
      setSearchQuery(q);
    }
  }, [location.pathname, searchParams]);

  // Debounced search -> suggestions
  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);

    debounceRef.current = window.setTimeout(() => {
      const q = searchQuery.trim().toLowerCase();
      onSearch(q);

      if (!q) {
        setSuggestions([]);
        debounceRef.current = null;
        return;
      }

      const projectMatches: Suggestion[] = projects
        .filter((p) => {
          const hay = `${p.title} ${p.description} ${p.category} ${p.location}`.toLowerCase();
          return hay.includes(q);
        })
        .slice(0, 4)
        .map((p) => ({ type: "project", title: p.title, projectId: p.id }));

      const teamMatches: Suggestion[] = teamMembers
        .filter((m) => {
          const hay = `${m.name} ${m.role} ${m.expertise?.join(" ") || ""}`.toLowerCase();
          return hay.includes(q);
        })
        .slice(0, 3)
        .map((m) => ({ type: "team", name: m.name, role: m.role, memberId: m.id }));

      const merged = [...projectMatches, ...teamMatches].slice(0, 6);
      setSuggestions(merged);
      debounceRef.current = null;
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
    };
  }, [searchQuery, onSearch]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    onSearch(q);
    navigate(q ? `/projects?search=${encodeURIComponent(q)}` : "/projects");
    setIsOpen(false);
    setSuggestions([]);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSuggestions([]);
    if (location.pathname.startsWith("/projects")) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("search");
      const qs = params.toString();
      navigate(qs ? `/projects?${qs}` : "/projects", { replace: true });
      setSearchParams(params);
    }
  };

  const handleSuggestionClick = (s: Suggestion) => {
    if (s.type === "project") {
      setSearchQuery(s.title);
      setSuggestions([]);
      navigate(`/projects?search=${encodeURIComponent(s.title)}`);
    } else {
      setSearchQuery(s.name);
      setSuggestions([]);
      navigate(`/team#${s.memberId}`);
    }
    setIsOpen(false);
  };

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/projects", label: "Projects", icon: FolderOpen },
    { path: "/team", label: "Our Team", icon: Users },
    { path: "/about", label: "About", icon: Info },
    { path: "/contact", label: "Contact Us", icon: Phone },
  ];

  return (
    <nav
      aria-label="Main Navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-dark shadow-lg" : "bg-dark/60 backdrop-blur-md"
      }`}
    >
      {/* golden-strip keyframes are in your index.css (golden-strip class) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* Logo */}
          <NavLink to="/" end className="flex items-center space-x-2">
            <img src="/younick-logo.PNG" alt="Younick Design Studio" className="h-10 w-auto" />
            <span className="text-xl font-bold text-primary">Younick Design Studio</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `relative flex items-center space-x-2 px-3 py-2 rounded-lg transition-transform duration-200 ${
                      isActive ? "text-dark transform scale-105 bg-primary" : "text-gray-300 hover:text-primary"
                    }`
                  }
                >
                  <Icon size={18} aria-hidden="true" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>

          {/* Search Bar (desktop) */}
          <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center relative">
            <div className="relative flex items-center w-64">
              <input
                type="text"
                placeholder="Search projects or team..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-8 py-2 w-full rounded-lg border border-gray-600 bg-dark text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                aria-label="Search input"
                autoComplete="off"
                aria-autocomplete="list"
                aria-controls="nav-suggestions"
              />

              <Search className="absolute left-3 top-2.5 text-primary" size={18} aria-hidden="true" />

              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-dark/60 rounded-full"
                  aria-label="Clear search"
                >
                  {/* golden X icon using the gold-x utility so color is consistent with your CSS */}
                  <XIcon size={14} aria-hidden="true" className="gold-x" />
                </button>
              )}
            </div>

            {/* Suggestion dropdown */}
            {suggestions.length > 0 && (
              <ul
                id="nav-suggestions"
                ref={suggestionsRef}
                className="absolute top-full left-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-lg border z-50 overflow-hidden"
                role="listbox"
              >
                {suggestions.map((s) => {
                  if (s.type === "project") {
                    return (
                      <li
                        key={`p-${s.projectId}`}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center justify-between"
                        onClick={() => handleSuggestionClick(s)}
                        role="option"
                        aria-selected={false}
                      >
                        <div className="text-sm font-medium">{s.title}</div>
                        <div className="text-xs text-gray-500">Project</div>
                      </li>
                    );
                  } else {
                    return (
                      <li
                        key={`t-${s.memberId}`}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center justify-between"
                        onClick={() => handleSuggestionClick(s)}
                        role="option"
                        aria-selected={false}
                      >
                        <div>
                          <div className="text-sm font-medium">{s.name}</div>
                          <div className="text-xs text-gray-500">{s.role}</div>
                        </div>
                        <div className="text-xs text-gray-500">Team</div>
                      </li>
                    );
                  }
                })}
              </ul>
            )}
          </form>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-lg hover:bg-dark/70 text-primary"
          >
            {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>

        {/* Golden thin strip immediately below the navbar content (very subtle) */}
        <div className="mt-0">
          <div className="w-full golden-strip golden-strip--slim" style={{ height: 3 }} aria-hidden />
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive ? "bg-primary text-dark" : "text-gray-300 hover:text-primary hover:bg-dark/70"
                    }`
                  }
                >
                  <Icon size={18} aria-hidden="true" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}

            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="mt-4 px-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects or team..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 py-2 w-full rounded-lg border border-gray-600 bg-dark text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 text-primary" size={18} aria-hidden="true" />

                {searchQuery && (
                  <button
                    type="button"
                    aria-label="Clear mobile search"
                    onClick={() => {
                      setSearchQuery("");
                      setSuggestions([]);
                    }}
                    className="absolute right-10 top-2 p-1 rounded-full hover:bg-dark/70"
                  >
                    {/* golden X for mobile clear as well */}
                    <XIcon size={16} aria-hidden="true" className="gold-x" />
                  </button>
                )}

                <button
                  type="submit"
                  aria-label="Submit mobile search"
                  className="absolute right-2 top-2 p-1 rounded-md hover:bg-dark/70"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
