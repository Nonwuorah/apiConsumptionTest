import React, { useState, useEffect } from 'react';
import { getUsers } from '../services/userService';
import { User } from '../types/user';
import UserCard from './UserCard';
import LoadingCard from './LoadingCard';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import { motion } from 'framer-motion';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 9;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getUsers();
        // Duplicate users to have at least 50
        const expandedUsers = Array(Math.ceil(50 / data.length))
          .fill([...data])
          .flat()
          .map((user, index) => ({
            ...user,
            id: index + 1,
            name: index >= data.length ? `${user.name} ${Math.floor(index / data.length) + 1}` : user.name,
            username: index >= data.length ? `${user.username}${Math.floor(index / data.length) + 1}` : user.username,
          }))
          .slice(0, 50);
        
        setUsers(expandedUsers);
        setFilteredUsers(expandedUsers);
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.company.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, users]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-lg max-w-md">
          <h2 className="text-xl font-bold text-white mb-2">Oops!</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md text-white"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-2">User Directory</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Browse through our collection of users from around the world. Find detailed information about each user including their contact details and company information.
        </p>
      </motion.div>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: usersPerPage }).map((_, index) => (
            <LoadingCard key={index} />
          ))}
        </div>
      ) : (
        <>
          {filteredUsers.length === 0 ? (
            <div className="flex justify-center items-center py-16">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-white mb-2">No users found</h2>
                <p className="text-gray-300">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {currentUsers.map((user, index) => (
                <UserCard key={user.id} user={user} index={index} />
              ))}
            </motion.div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default UserList;