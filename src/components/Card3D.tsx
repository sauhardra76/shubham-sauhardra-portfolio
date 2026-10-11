import React, { useState, useRef, MouseEvent } from 'react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'emerald' | 'purple' | 'amber';
  maxTilt?: number;
  scale?: number;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  glowColor = 'cyan',
  maxTilt = 7,
  scale = 1.015,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [shinePos, setShinePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const glowStyles = {
    cyan: 'rgba(56, 189, 248, 0.25)',
    emerald: 'rgba(16, 185, 129, 0.25)',
    purple: 'rgba(168, 85, 247, 0.25)',
    amber: 'rgba(245, 158, 11, 0.25)',
  }[glowColor];

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTransform(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
    );

    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;
    setShinePos({ x: shineX, y: shineY, opacity: 0.15 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setShinePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl preserve-3d transition-transform duration-200 ease-out ${className}`}
      style={{
        transform,
        boxShadow: isHovered
          ? `0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 25px -5px ${glowStyles}`
          : '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Specular Holographic Sheen */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 z-30"
        style={{
          opacity: shinePos.opacity,
          background: `radial-gradient(circle 300px at ${shinePos.x}% ${shinePos.y}%, rgba(255, 255, 255, 0.25) 0%, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};
