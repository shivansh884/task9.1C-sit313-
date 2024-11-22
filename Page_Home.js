import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth'; 
import '../styles/Page_Home.css';

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Start with null to indicate loading
  const navigateTo = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user); // Update authentication state
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false); // Update state to unauthenticated, but stay on the current page
    } catch (error) {
      console.error("Error signing out: ", error);
      alert("An error occurred while signing out.");
    }
  };

  const handleLogin = () => {
    navigateTo('/login'); // Redirect to login page
  };

  if (isAuthenticated === null) {
    // Show a loader while Firebase determines the auth state
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="wrapper">
      <header className="box">
        <h1 className="title">Shivansh@Deakin Web</h1>
        <div className="buttons">
          <input className="input" type="text" placeholder="search.." />
          <button className="button" onClick={() => navigateTo('/post')}>Post</button>
          {isAuthenticated ? (
            <button className="button" onClick={handleSignOut}>Sign Out</button>
          ) : (
            <button className="button" onClick={handleLogin}>Login</button>
          )}
        </div>
      </header>

      <section className="message">
        <h2>
          {isAuthenticated ? "Welcome to Shivansh@Deakin Web" : "Please log in to access the content"}
        </h2>
      </section>
    </div>
  );
};

export default HomePage;