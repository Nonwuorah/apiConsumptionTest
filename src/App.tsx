import React from 'react';
import UserList from './components/UserList';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  return (
    <div className="min-h-screen bg-transparent text-white relative">
      <AnimatedBackground />
      <UserList />
    </div>
  );
}

export default App;