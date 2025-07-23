import { Code, Palette, Zap, Users } from "lucide-react";
import { LaptopScene } from "../3d/LaptopScene";

const features = [
  {
    icon: Code,
    title: "Full Stack Development",
    description:
      "Expertise in modern web technologies including React, Node.js, TypeScript, and cloud platforms.",
  },
  {
    icon: Palette,
    title: "Frontend Development",
    description:
      "I craft pixel-perfect, responsive interfaces that turn ideas into delightful user experiences.",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description:
      "Building fast, efficient applications with optimal performance and seamless user interactions.",
  },
  {
    icon: Users,
    title: "Backend Development",
    description:
      "I build robust, scalable backends that keep applications secure, fast, and reliable behind the scenes.",
  },
];

export function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            I break complex topics into small tasks, practice daily, follow documentation, and learn by doing — not just watching.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="flex justify-center items-center">
              <img
                src="/photo1.jpg"
                alt="Profile picture"
                className="w-44 h-44 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Hi, I’m{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent font-bold">
                Md Siddiqur Rahman
              </span>{" "}
              — A passionate web developer who loves building clean and
              interactive web experiences.I focus on practical, hands-on learning — building real projects, exploring new technologies step by step, and solving real problems to grow my skills every day.
            </p>

            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              I believe in writing clean, maintainable code and staying
              up-to-date with the latest technologies and best practices. When
              I'm not coding, you can find me exploring new frameworks,
              contributing to open source projects, or sharing knowledge with
              the developer community.
            </p>

            <div className="pt-6">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                What I Bring to the Table
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="flex items-start space-x-3"
                  >
                    <div className="flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3D Laptop Scene */}
          <div className="relative mt-20">
            <div className="relative w-full h-[36rem] bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl overflow-hidden shadow-xl">
              <LaptopScene className="w-full h-full" />

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-30 animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-400 rounded-full opacity-30 animate-ping"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
