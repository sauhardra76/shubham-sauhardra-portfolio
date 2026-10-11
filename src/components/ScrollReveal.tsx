import React, { useEffect, useRef, useState } from 'react';

export interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Hook to detect when an element intersects the viewport.
 * Automatically checks for prefers-reduced-motion and fallback if IntersectionObserver is unsupported.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -40px 0px',
    triggerOnce = true
  } = options;

  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    // If user prefers reduced motion, reveal immediately without animation
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsRevealed(true);
      return;
    }

    // Fallback if IntersectionObserver is not available
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsRevealed(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            setIsRevealed(false);
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isRevealed };
}

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Base delay in ms
  staggerIndex?: number; // Multiplies staggerDelay for cascading lists
  staggerDelay?: number; // Delay per item in ms (default 75ms)
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number; // Distance to translate in px (default 24)
  duration?: number; // Animation duration in ms (default 650)
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  as?: React.ElementType;
}

/**
 * ScrollReveal Component
 * Smoothly animates section headers and content cards as they scroll into view.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  staggerIndex = 0,
  staggerDelay = 75,
  direction = 'up',
  distance = 24,
  duration = 650,
  threshold = 0.1,
  rootMargin = '0px 0px -40px 0px',
  triggerOnce = true,
  as: Component = 'div',
  style,
  ...rest
}) => {
  const { ref, isRevealed } = useScrollReveal<HTMLElement>({
    threshold,
    rootMargin,
    triggerOnce
  });

  const totalDelay = Math.max(0, delay + staggerIndex * staggerDelay);

  // Compute transform based on direction
  const getTransform = () => {
    if (isRevealed) return 'translate3d(0, 0, 0)';
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0)`;
      case 'down':
        return `translate3d(0, -${distance}px, 0)`;
      case 'left':
        return `translate3d(${distance}px, 0, 0)`;
      case 'right':
        return `translate3d(-${distance}px, 0, 0)`;
      case 'none':
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  const dynamicStyle: React.CSSProperties = {
    opacity: isRevealed ? 1 : 0,
    transform: getTransform(),
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDelay: `${totalDelay}ms`,
    willChange: isRevealed ? 'auto' : 'opacity, transform',
    ...style
  };

  return (
    <Component
      ref={ref}
      className={className}
      style={dynamicStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};
