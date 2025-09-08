// src/pages/Projects.tsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List } from 'lucide-react';
import { projects as ALL_PROJECTS } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import SEOHead from '../components/SEOHead';
import { pageSEO } from '../utils/seo';

export const Projects: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProjects, setFilteredProjects] = useState(ALL_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['all', ...Array.from(new Set(ALL_PROJECTS.map(p => p.category)))];
  const locations = ['all', ...Array.from(new Set(ALL_PROJECTS.map(p => p.location)))];

  useEffect(() => {
    const filter = searchParams.get('filter');
    if (filter) setSelectedCategory(filter);
    const loc = searchParams.get('location');
    if (loc) setSelectedLocation(loc);
  }, [searchParams]);

  useEffect(() => {
    const search = (searchParams.get('search') || '').trim().toLowerCase();
    let filtered = ALL_PROJECTS;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project =>
        project.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory ||
        project.category === selectedCategory
      );
    }

    if (selectedLocation !== 'all') {
      filtered = filtered.filter(project => project.location === selectedLocation);
    }

    if (search) {
      filtered = filtered.filter(project => {
        const hay = `${project.title} ${project.description} ${project.location} ${project.category}`.toLowerCase();
        return hay.includes(search);
      });
    }

    setFilteredProjects(filtered);
  }, [selectedCategory, selectedLocation, searchParams]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const search = searchParams.get('search');
    if (category === 'all') {
      searchParams.delete('filter');
    } else {
      searchParams.set('filter', category);
    }
    if (search) searchParams.set('search', search);
    setSearchParams(searchParams);
  };

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    const search = searchParams.get('search');
    if (location === 'all') {
      searchParams.delete('location');
    } else {
      searchParams.set('location', location);
    }
    if (search) searchParams.set('search', search);
    setSearchParams(searchParams);
  };

  const clearSearch = () => {
    // remove only the search param, keep filter/location if present
    const search = searchParams.get('search');
    if (!search) return;
    searchParams.delete('search');
    setSearchParams(searchParams);
  };

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <>
      <SEOHead seo={pageSEO.projects} />
      
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Projects</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our portfolio of exceptional interior design and construction projects across Rajasthan
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Categories</option>
                    {categories.slice(1).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => handleLocationChange(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Locations</option>
                    {locations.slice(1).map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* View Mode */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Results Count + Clear Search */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600">
              Showing {filteredProjects.length} of {ALL_PROJECTS.length} projects
              {searchParams.get('search') ? ` — results for “${searchParams.get('search')}”` : ''}
            </p>
            {searchParams.get('search') && (
              <button
                onClick={clearSearch}
                className="text-sm px-3 py-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
                aria-label="Clear search"
              >
                Clear Search
              </button>
            )}
          </div>

          {/* Projects Grid */}
          <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <Filter className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600">Try adjusting your filters or search to see more results.</p>
            </div>
          )}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </>
  );
};
