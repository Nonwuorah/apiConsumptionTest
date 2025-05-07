import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="flex justify-center items-center space-x-2 mt-8"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-md transition-colors ${
            currentPage === page
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </motion.div>
  );
};

export default Pagination;