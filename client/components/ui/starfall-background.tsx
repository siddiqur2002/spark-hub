import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  delay: number;
}

interface StarfallBackgroundProps {
  className?: string;
  starCount?: number;
  speed?: 'slow' | 'medium' | 'fast';
  density?: 'light' | 'medium' | 'heavy';
}

export function StarfallBackground({
  className,
  starCount = 100,
  speed = 'medium',
  density = 'medium'
}: StarfallBackgroundProps) {
  const [stars, setStars] = useState<Star[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Generate stars with random properties
  const generateStars = (count: number, width: number, height: number): Star[] => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * (width + 200) - 100, // Start slightly off-screen
      y: Math.random() * height - height, // Start above viewport
      size: Math.random() * 3 + 1, // 1-4px stars
      speed: Math.random() * 2 + 0.5, // 0.5-2.5 multiplier
      opacity: Math.random() * 0.8 + 0.2, // 0.2-1.0 opacity
      delay: Math.random() * 5, // 0-5s delay
    }));
  };

  // Detect mobile and reduced motion preferences
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const checkReducedMotion = () => {
      setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };

    checkMobile();
    checkReducedMotion();

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', checkReducedMotion);

    return () => {
      mediaQuery.removeEventListener('change', checkReducedMotion);
    };
  }, []);

  // Update dimensions on window resize
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDimensions({ width, height });
      setIsMobile(width < 768);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Generate stars when dimensions change
  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      // Reduce star count on mobile for better performance
      const adjustedStarCount = isMobile ? Math.floor(starCount * 0.4) : starCount;
      setStars(generateStars(adjustedStarCount, dimensions.width, dimensions.height));
    }
  }, [dimensions, starCount, isMobile]);

  const getSpeedMultiplier = () => {
    switch (speed) {
      case 'slow': return 0.5;
      case 'fast': return 2;
      default: return 1;
    }
  };

  const getDensityClass = () => {
    switch (density) {
      case 'light': return 'opacity-40';
      case 'heavy': return 'opacity-90';
      default: return 'opacity-60';
    }
  };

  // Don't render animations if user prefers reduced motion
  if (prefersReducedMotion) {
    return (
      <div
        className={cn(
          "fixed inset-0 pointer-events-none overflow-hidden",
          "bg-gradient-to-b from-indigo-950/20 via-purple-900/10 to-slate-900/5",
          "dark:from-indigo-950/40 dark:via-purple-900/20 dark:to-slate-900/10",
          getDensityClass(),
          className
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-purple-900/10 dark:from-transparent dark:via-blue-900/10 dark:to-purple-900/20" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "fixed inset-0 pointer-events-none overflow-hidden",
        "bg-gradient-to-b from-indigo-950/20 via-purple-900/10 to-slate-900/5",
        "dark:from-indigo-950/40 dark:via-purple-900/20 dark:to-slate-900/10",
        getDensityClass(),
        isMobile && "opacity-75", // Slightly reduce opacity on mobile
        className
      )}
    >
      {/* Night sky gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-purple-900/10 dark:from-transparent dark:via-blue-900/10 dark:to-purple-900/20" />

      {/* Falling stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={cn(
            "absolute rounded-full",
            "bg-gradient-to-r from-white to-blue-100",
            "dark:from-blue-200 dark:to-purple-200",
            !isMobile && "animate-pulse" // Remove pulse animation on mobile for performance
          )}
          style={{
            left: `${star.x}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `starfall ${15 / (star.speed * getSpeedMultiplier())}s linear infinite`,
            animationDelay: `${star.delay}s`,
            transform: `translateY(${star.y}px)`,
            // Reduce box-shadow complexity on mobile
            boxShadow: isMobile
              ? `0 0 ${star.size}px rgba(255, 255, 255, 0.3)`
              : `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.5), 0 0 ${star.size * 4}px rgba(147, 197, 253, 0.3)`,
            // Enable hardware acceleration
            willChange: 'transform',
          }}
        />
      ))}

      {/* Shooting stars - reduce on mobile */}
      {!isMobile && (
        <>
          <div className="shooting-star shooting-star-1" />
          <div className="shooting-star shooting-star-2" />
          <div className="shooting-star shooting-star-3" />
        </>
      )}
      {isMobile && (
        <div className="shooting-star shooting-star-1" />
      )}
    </div>
  );
}
