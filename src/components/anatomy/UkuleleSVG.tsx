import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface UkuleleSVGProps {
  selectedId?: string | null;
  onClick?: () => void;
  className?: string;
}

export const UkuleleSVG = ({ selectedId = null, onClick, className }: UkuleleSVGProps) => {
  const id = React.useId().replace(/:/g, '');
  const woodId = `wood-${id}`;
  const grainId = `grain-${id}`;
  const glowId = `glow-${id}`;

  return (
    <motion.svg
      viewBox="0 0 200 600"
      onClick={onClick}
      className={cn(
        "z-10 h-full w-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.15)]",
        onClick && "cursor-pointer",
        className
      )}
      animate={{
        rotate: selectedId ? 0.5 : 0,
        scale: selectedId ? 1.01 : 1
      }}
    >
      <defs>
        <linearGradient id={woodId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8B4513" />
          <stop offset="50%" stopColor="#A0522D" />
          <stop offset="100%" stopColor="#8B4513" />
        </linearGradient>
        <pattern id={grainId} x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M0 20 Q 25 10, 50 20 T 100 20" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" />
          <path d="M0 50 Q 25 40, 50 50 T 100 50" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" />
          <path d="M0 80 Q 25 70, 50 80 T 100 80" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" />
        </pattern>
        <filter id={glowId}>
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.path
        d="M100,380 C50,380 20,420 20,490 C20,560 50,600 100,600 C150,600 180,560 180,490 C180,420 150,380 100,380 Z"
        fill={`url(#${woodId})`}
        stroke="#5D4037"
        strokeWidth="2"
        initial={{ fill: '#8B4513', stroke: '#5D4037', strokeWidth: 2 }}
        animate={{
          fill: selectedId === 'body' ? '#A0522D' : '#8B4513',
          stroke: selectedId === 'body' ? '#FF9800' : '#5D4037',
          strokeWidth: selectedId === 'body' ? 3 : 2
        }}
      />
      <path d="M100,380 C50,380 20,420 20,490 C20,560 50,600 100,600 C150,600 180,560 180,490 C180,420 150,380 100,380 Z" fill={`url(#${grainId})`} pointerEvents="none" />

      <motion.path
        d="M100,300 C65,300 40,330 40,370 C40,410 65,430 100,430 C135,430 160,410 160,370 C160,330 135,300 100,300 Z"
        fill={`url(#${woodId})`}
        stroke="#5D4037"
        strokeWidth="2"
        initial={{ fill: '#8B4513', stroke: '#5D4037', strokeWidth: 2 }}
        animate={{
          fill: selectedId === 'body' ? '#A0522D' : '#8B4513',
          stroke: selectedId === 'body' ? '#FF9800' : '#5D4037',
          strokeWidth: selectedId === 'body' ? 3 : 2
        }}
      />
      <path d="M100,300 C65,300 40,330 40,370 C40,410 65,430 100,430 C135,430 160,410 160,370 C160,330 135,300 100,300 Z" fill={`url(#${grainId})`} pointerEvents="none" />

      <circle cx="100" cy="400" r="28" fill="#3E2723" stroke="#212121" strokeWidth="1" />
      <circle cx="100" cy="400" r="32" fill="none" stroke="#D2B48C" strokeWidth="1" opacity="0.5" />

      <motion.rect
        x="65" y="500" width="70" height="18" rx="3"
        fill="#212121"
        stroke="transparent"
        strokeWidth={0}
        initial={{ stroke: 'transparent', strokeWidth: 0, filter: 'none' }}
        animate={{
          stroke: selectedId === 'bridge' ? '#FF9800' : 'rgba(0,0,0,0)',
          strokeWidth: selectedId === 'bridge' ? 2 : 0,
          filter: selectedId === 'bridge' ? `url(#${glowId})` : 'none'
        }}
      />
      <rect x="70" y="504" width="60" height="4" rx="1" fill="#5D4037" />

      <motion.rect
        x="82" y="120" width="36" height="180"
        fill="#5D4037"
        stroke="transparent"
        strokeWidth={0}
        initial={{ fill: '#5D4037', stroke: 'transparent', strokeWidth: 0 }}
        animate={{
          fill: selectedId === 'neck' ? '#6D4C41' : '#5D4037',
          stroke: selectedId === 'neck' ? '#FF9800' : 'rgba(0,0,0,0)',
          strokeWidth: selectedId === 'neck' ? 2 : 0
        }}
      />

      {[140, 165, 190, 215, 240, 265, 290].map((y, i) => (
        <React.Fragment key={i}>
          <motion.line
            x1="82" y1={y} x2="118" y2={y}
            stroke="#BDBDBD" strokeWidth="1.5"
            initial={{ stroke: '#BDBDBD', strokeWidth: 1.5 }}
            animate={{
              stroke: selectedId === 'frets' ? '#FF9800' : '#BDBDBD',
              strokeWidth: selectedId === 'frets' ? 2.5 : 1.5
            }}
          />
          {[190, 240, 290].includes(y) && (
            <circle cx="100" cy={y - 12.5} r="2" fill="rgba(255,255,255,0.4)" />
          )}
        </React.Fragment>
      ))}

      <motion.rect
        x="80" y="120" width="40" height="8" rx="1"
        fill="#F5F5F5"
        initial={{ fill: '#F5F5F5', filter: 'none' }}
        animate={{
          fill: selectedId === 'nut' ? '#FF9800' : '#F5F5F5',
          filter: selectedId === 'nut' ? `url(#${glowId})` : 'none'
        }}
      />

      <motion.path
        d="M82,120 L118,120 L135,100 L135,30 C135,10 120,0 100,0 C80,0 65,10 65,30 L65,100 L82,120 Z"
        fill="#5D4037"
        stroke="#3E2723"
        strokeWidth="2"
        initial={{ fill: '#5D4037', stroke: '#3E2723', strokeWidth: 2 }}
        animate={{
          fill: selectedId === 'headstock' ? '#6D4C41' : '#5D4037',
          stroke: selectedId === 'headstock' ? '#FF9800' : '#3E2723',
          strokeWidth: selectedId === 'headstock' ? 3 : 2
        }}
      />

      {[35, 75].map(y => (
        <React.Fragment key={y}>
          <g>
            <motion.circle
              cx="50" cy={y} r="8" fill="#EEEEEE" stroke="#9E9E9E" strokeWidth="1"
              initial={{ fill: '#EEEEEE', stroke: '#9E9E9E' }}
              animate={{
                fill: selectedId === 'pegs' ? '#FF9800' : '#EEEEEE',
                stroke: selectedId === 'pegs' ? '#E65100' : '#9E9E9E'
              }}
            />
            <motion.rect
              x="48" y={y - 2} width="4" height="4" rx="1" fill="#757575"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: selectedId === 'pegs' ? 1 : 0.6 }}
            />
          </g>
          <g>
            <motion.circle
              cx="150" cy={y} r="8" fill="#EEEEEE" stroke="#9E9E9E" strokeWidth="1"
              initial={{ fill: '#EEEEEE', stroke: '#9E9E9E' }}
              animate={{
                fill: selectedId === 'pegs' ? '#FF9800' : '#EEEEEE',
                stroke: selectedId === 'pegs' ? '#E65100' : '#9E9E9E'
              }}
            />
            <motion.rect
              x="148" y={y - 2} width="4" height="4" rx="1" fill="#757575"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: selectedId === 'pegs' ? 1 : 0.6 }}
            />
          </g>
        </React.Fragment>
      ))}

      {[88, 96, 104, 112].map((x, i) => (
        <React.Fragment key={i}>
          <motion.line
            x1={x} y1="30"
            x2={i < 2 ? 50 : 150} y2={i === 0 || i === 3 ? 35 : 75}
            stroke="#BDBDBD"
            strokeWidth="0.3"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: selectedId === 'headstock' || selectedId === 'pegs' || selectedId === 'strings' ? 0.8 : 0.4 }}
          />
          <motion.line
            x1={x} y1="30" x2={x} y2="505"
            stroke="#FFFFFF"
            strokeWidth={i === 1 || i === 2 ? "1.5" : "1"}
            initial={{ opacity: 0.9 }}
            animate={{
              stroke: selectedId === 'strings' ? '#FF9800' : '#FFFFFF',
              strokeWidth: selectedId === 'strings' ? (i === 1 || i === 2 ? 2.5 : 2) : (i === 1 || i === 2 ? 1.5 : 1),
              opacity: selectedId === 'strings' ? 1 : 0.9
            }}
          />
        </React.Fragment>
      ))}
    </motion.svg>
  );
};