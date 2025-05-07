import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative max-w-md w-full mx-auto mb-8"
    >
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search size={18} className="text-gray-400" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search users..."
        className="w-full py-3 pl-10 pr-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
      />
    </motion.div>
  );
};

export default SearchBar;