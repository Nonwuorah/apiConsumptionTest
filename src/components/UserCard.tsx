import React from 'react';
import { User } from '../types/user';
import { motion } from 'framer-motion';
import { Building2, Globe, Mail, Phone } from 'lucide-react';

interface UserCardProps {
  user: User;
  index: number;
}

const UserCard: React.FC<UserCardProps> = ({ user, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white/10 backdrop-blur-sm rounded-lg p-5 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-white/10"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
          {user.name.charAt(0)}
        </div>
        <div>
          <h3 className="font-semibold text-white">{user.name}</h3>
          <p className="text-sm text-gray-300">@{user.username}</p>
        </div>
      </div>
      
      <div className="space-y-2 text-sm mb-4">
        <div className="flex items-center gap-2 text-gray-300">
          <Mail size={16} className="text-purple-400" />
          <a href={`mailto:${user.email}`} className="hover:text-white transition-colors">
            {user.email}
          </a>
        </div>
        
        <div className="flex items-center gap-2 text-gray-300">
          <Phone size={16} className="text-purple-400" />
          <span>{user.phone}</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-300">
          <Globe size={16} className="text-purple-400" />
          <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            {user.website}
          </a>
        </div>
        
        <div className="flex items-center gap-2 text-gray-300">
          <Building2 size={16} className="text-purple-400" />
          <span>{user.company.name}</span>
        </div>
      </div>
      
      <div className="mt-auto">
        <button className="w-full py-2 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:opacity-90 transition-opacity text-sm">
          View Profile
        </button>
      </div>
    </motion.div>
  );
};

export default UserCard;