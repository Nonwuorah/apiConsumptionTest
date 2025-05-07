import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground: React.FC = () => {
  const bubbles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900"></div>
      
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-3xl"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
          }}
          transition={{
            duration: bubble.duration,
            ease: "easeInOut",
            repeat: Infinity,
            delay: bubble.delay,
          }}
        />
      ))}
      
      <div className="absolute inset-0 bg-black/20"></div>
    </div>
  );
};

export default AnimatedBackground;