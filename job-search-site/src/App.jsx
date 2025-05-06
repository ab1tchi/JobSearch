import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';

function App() {
  const [page, setPage] = useState('auth');
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setPage('home');
  };

  const handleSignUp = (userData) => {
    // For demo, treat sign up same as login
    setUser(userData);
    setPage('home');
  };

  return (
    <div>
      {page === 'auth' && (
        <LoginPage onLogin={handleLogin} onSignUp={handleSignUp} />
      )}
      {page === 'home' && <HomePage user={user} />}
    </div>
  );
}

export default App;
