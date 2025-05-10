import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';

function App() {
  // Where we keep the current user
  const [user, setUser] = useState(null);

  // This part runs when the app starts for the first time
  useEffect(() => {
    // Let’s look inside the localStorage to see if we saved the user from before 
    const savedUser = localStorage.getItem("user");
    // If there is a saved user, we put them back into our user box
    if (savedUser) { 
      setUser(JSON.parse(savedUser)); // Use JSON.parse to turn the string back
    }
  }, []);

  // When someone logs in
  const handleLogin = (userData) => {
    setUser(userData); // Store their info in the userData
    localStorage.setItem("user", JSON.stringify(userData)); // Save to localStorage
  };

  // Same thing when someone signs up
  const handleSignUp = (userData) => {
    setUser(userData); // Store their info
    localStorage.setItem("user", JSON.stringify(userData)); // Save to localStorage
  };

  // Now we're going to show different pages depending on if the user is there or not
  return (
    <Router>
      <Routes>
        {/* If the user is logged in, go straight to the HomePage. If not, show the LoginPage */}
        <Route
          path="/"
          element={
            user ? <Navigate to="/home" replace /> : <LoginPage onLogin={handleLogin} onSignUp={handleSignUp} />
          }
        />
        {/* Only show the HomePage if we have a user */}
        <Route
          path="/home"
          element={user ? <HomePage user={user} /> //Show HomePage
          : <Navigate to="/" replace />} // else go back to Login
        />

        {/* Same for profile: only show if we have a user */}
        <Route
          path="/profile"
          element={user ? <ProfilePage user={user} setUser={setUser} /> // Show ProfilePage
          : <Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
