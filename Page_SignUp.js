import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from '../utils/firebase'; // Ensure you have configured Firebase in this file
import '../styles/Page_SignUp.css'; // Make sure the CSS is styled correctly

const SignUpPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigateTo = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match! Please try again.');
      return;
    }

    try {
      // Create user with email and password in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional user data in Firestore database
      await setDoc(doc(db, 'users', user.uid), {
        fullName,
        email,
        createdAt: new Date().toISOString(),
      });

      // Redirect to login page after successful registration
      alert('Sign-up successful! Please log in.');
      navigateTo('/login');
    } catch (error) {
      alert(`Sign-up failed: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <form className="box" onSubmit={handleSignUp}>
        <h2 className="heading">Sign Up</h2>

        {/* Full Name Input */}
        <div className="input-group">
          <label>Full Name</label>
          <input 
            type="text" 
            placeholder="Enter your full name" 
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)} 
            required 
          />
        </div>

        {/* Email Input */}
        <div className="input-group">
          <label>Email</label>
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        {/* Password Input */}
        <div className="input-group">
          <label>Password</label>
          <input 
            type="password" 
            placeholder="Create a password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        {/* Confirm Password Input */}
        <div className="input-group">
          <label>Confirm Password</label>
          <input 
            type="password" 
            placeholder="Confirm your password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
        </div>

        {/* Sign Up Button */}
        <button type="submit" className="button">Sign Up</button>
      </form>

      <p>
        Already have an account? <span onClick={() => navigateTo('/login')} className="link">Log In</span>
      </p>
    </div>
  );
};

export default SignUpPage;
