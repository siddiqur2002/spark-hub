'use client';

import React, { useState } from 'react';
import { ProjectCard3D } from '../3d/ProjectCard3D'; // Adjust path if needed
import { cn } from '@/lib/utils';
import { ExternalLink, Github, Eye } from 'lucide-react';

// Full project list with categories, featured flag, and technologies
const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description:
      'A modern e-commerce platform built with React, Node.js, and Stripe integration. Features include real-time inventory, payment processing, and admin dashboard.',
    github: 'https://github.com',
    live: 'https://example.com',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'TailwindCSS'],
    category: 'fullstack',
    featured: true,
  },
  {
    id: 2,
    title: '3D Portfolio Website',
    description:
      'An interactive 3D portfolio website using Three.js and React Three Fiber. Features smooth animations and immersive user experience.',
    github: 'https://github.com',
    live: 'https://example.com',
    technologies: ['React', 'Three.js', 'Framer Motion', 'TailwindCSS'],
    category: 'frontend',
    featured: true,
  },
  {
    id: 3,
    title: 'AI Chat Application',
    description:
      'Real-time chat application with AI integration using OpenAI API. Features include message history, typing indicators, and emoji reactions.',
    github: 'https://github.com',
    live: 'https://example.com',
    technologies: ['Next.js', 'Socket.io', 'OpenAI', 'Prisma', 'PostgreSQL'],
    category: 'fullstack',
    featured: false,
  },
  {
    id: 4,
    title: 'Task Management Dashboard',
    description:
      'A comprehensive task management dashboard with drag-and-drop functionality, team collaboration, and progress tracking.',
    github: 'https://github.com',
    live: 'https://example.com',
    technologies: ['React', 'TypeScript', 'Zustand', 'React DnD'],
    category: 'frontend',
    featured: false,
  },
  {
    id: 5,
    title: 'Weather Analytics API',
    description:
      'RESTful API providing weather analytics and forecasting data with caching, rate limiting, and comprehensive documentation.',
    github: 'https://github.com',
    live: 'https://example.com',
    technologies: ['Node.js', 'Express', 'Redis', 'PostgreSQL', 'Swagger'],
    category: 'backend',
    featured: false,
  },
  {
    id: 6,
    title: 'Mobile Banking App UI',
    description:
      'Modern mobile banking application interface with smooth animations, biometric authentication, and accessibility features.',
    github: 'https://github.com',
    live: 'https://example.com',
    technologies: ['React Native', 'TypeScript', 'Reanimated', 'Expo'],
    category: 'mobile',
    featured: false,
  },
];

// Categories for filtering
const categories = [
  { id: 'all', name: 'All Projects' },
  { id: 'fullstack', name: 'Full Stack' },
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
  { id: 'mobile', name: 'Mobile' },
];

export function Projects() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Filter projects by active category
  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  // Featured projects
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A showcase of my recent work and creative solutions
          </p>
        </div>

        {/* Featured Projects Grid */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Highlighted Work
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="relative"
              >
                {/* 3D Project Card */}
                <ProjectCard3D
                  title={project.title}
                  description={project.description}
                  github={project.github}
                  live={project.live}
                  // Pass extra props if your 3D card supports them (optional)
                  // technologies={project.technologies}
                />

                {/* Overlay shown on hover */}
                <div
                  className={cn(
                    'absolute inset-0 bg-black/60 flex items-center justify-center space-x-4 transition-opacity duration-300 rounded-xl',
                    hoveredProject === project.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  )}
                >
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-white text-gray-900 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
                  >
                    <Github className="w-4 h-4" />
                    <span>Code</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'px-4 py-2 rounded-md font-medium transition-all duration-300',
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Filtered Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard3D
              key={project.id}
              title={project.title}
              description={project.description}
              github={project.github}
              live={project.live}
              // You can pass other props like technologies if your 3D card supports
            />
          ))}
        </div>
      </div>
    </section>
  );
}

