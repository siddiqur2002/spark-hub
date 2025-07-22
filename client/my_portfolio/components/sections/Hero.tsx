import { ArrowDown, Download } from 'lucide-react';
import { HeroScene } from '../3d/HeroScene';

export function Hero() {
  const scrollToNext = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id='home' className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* 3D Background with Falling Tech Objects and Earth Globe */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/30 dark:from-transparent dark:via-gray-900/10 dark:to-gray-900/30 z-10"></div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white">
            <span className="block">Hello, I'm</span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Muhammad Siddiqur Rahman
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 font-light">
            Full Stack Developer & Creative Technologist
          </p>
          
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            I craft beautiful digital experiences with modern technologies. 
            Passionate about creating innovative solutions that bridge design and functionality.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button
              onClick={scrollToNext}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-2"
            >
              View My Work
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
            </button>
            
            <button className="group border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-gray-900 hover:text-white hover:border-gray-900 dark:hover:bg-white dark:hover:text-gray-900 dark:hover:border-white flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download CV
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <button
          onClick={scrollToNext}
          className="animate-bounce text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
