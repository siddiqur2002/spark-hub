// components/Skills.tsx

import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { StarsBackground } from "../3d/StarsBackground";

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    skills: [
      { name: "React", level: 95, color: "bg-blue-500" },
      { name: "TypeScript", level: 90, color: "bg-blue-600" },
      { name: "Next.js", level: 88, color: "bg-gray-800" },
      { name: "Tailwind CSS", level: 92, color: "bg-cyan-500" },
      { name: "Three.js", level: 75, color: "bg-green-500" },
      { name: "Framer Motion", level: 80, color: "bg-purple-500" },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", level: 85, color: "bg-green-600" },
      { name: "Express", level: 82, color: "bg-gray-700" },
      { name: "Python", level: 78, color: "bg-yellow-500" },
      { name: "PostgreSQL", level: 80, color: "bg-blue-700" },
      { name: "MongoDB", level: 75, color: "bg-green-700" },
      { name: "GraphQL", level: 70, color: "bg-pink-500" },
    ],
  },
  {
    name: "Tools & Others",
    skills: [
      { name: "Git", level: 90, color: "bg-orange-600" },
      { name: "Docker", level: 75, color: "bg-blue-600" },
      { name: "AWS", level: 70, color: "bg-yellow-600" },
      { name: "Figma", level: 85, color: "bg-purple-600" },
      { name: "Jest", level: 80, color: "bg-red-600" },
      { name: "Webpack", level: 75, color: "bg-blue-400" },
    ],
  },
];

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  return (
    <section id="skills" className="relative py-20 bg-gray-900 overflow-hidden">
      {/* Real 3D Stars */}
      <StarsBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ rotateY: 0, rotateX: 0 }}
            animate={{
              rotateY: [0, 15, -15, 0],
              rotateX: [0, 10, -10, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Skills & Expertise
          </motion.h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-1 bg-white/10 backdrop-blur-md rounded-lg p-1 shadow-lg">
            {skillCategories.map((category, index) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(index)}
                className={cn(
                  "px-6 py-3 rounded-md font-medium transition-all duration-500 transform",
                  "hover:scale-105 hover:shadow-2xl hover:-rotate-x-2 hover:rotate-y-2",
                  activeCategory === index
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-200 hover:text-white",
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories[activeCategory].skills.map((skill) => (
            <div
              key={skill.name}
              className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 hover:rotate-1 hover:shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  {skill.name}
                </h3>
                <span className="text-sm font-medium text-gray-200">
                  {skill.level}%
                </span>
              </div>

              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className={cn(
                    "h-3 rounded-full transition-all duration-1000 ease-out",
                    skill.color,
                  )}
                  style={{
                    width: `${skill.level}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg max-w-4xl mx-auto transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:rotate-1">
            <h3 className="text-2xl font-bold text-white mb-4">
              Always Learning
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              I believe in lifelong learning. My goal is to keep improving as a
              developer, stay updated with industry trends, and create work that
              makes a difference. <br /> Strategy: “Build → Break → Fix → Repeat.” <br />
              Tactics: “Practice. Build. Share.” <br /> Overview: “Keep learning. Keep
              building.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
