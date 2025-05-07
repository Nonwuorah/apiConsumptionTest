import React from 'react';
import { motion } from 'framer-motion';

const LoadingCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/10 backdrop-blur-sm rounded-lg p-5 shadow-lg flex flex-col gap-3 h-full"
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-300/20 animate-pulse"></div>
        <div className="flex-1">
          <div className="h-4 w-3/4 bg-gray-300/20 animate-pulse rounded mb-2"></div>
          <div className="h-3 w-1/2 bg-gray-300/20 animate-pulse rounded"></div>
        </div>
      </div>
      <div className="h-3 w-full bg-gray-300/20 animate-pulse rounded mt-1"></div>
      <div className="h-3 w-5/6 bg-gray-300/20 animate-pulse rounded"></div>
      <div className="h-3 w-4/6 bg-gray-300/20 animate-pulse rounded"></div>
      <div className="mt-auto">
        <div className="h-8 w-full bg-gray-300/20 animate-pulse rounded-md mt-2"></div>
      </div>
    </motion.div>
  );
};

export default LoadingCard;