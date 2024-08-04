import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Button, TextField, Container, Typography, Alert } from '@mui/material';
import styles from './Login.module.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error) {
      setError('Login failed. Please check your email and password.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch (error) {
      setError('Google sign-in failed. Please try again.');
    }
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setError(null);
  };

  return (
    <Container className={styles.container}>
      <Typography variant="h2" className={styles.welcomeText}>
        Welcome to Pantrex
      </Typography>
      <Typography variant="h4" className={styles.loginText}>
        Login
      </Typography>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <Typography variant="h4" className={styles.title}>
            {isRegistering ? 'Register' : 'Login'}
          </Typography>
        </div>
        {error && <Alert severity="error" className={styles.alert}>{error}</Alert>}
        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth className={styles.button}>
            {isRegistering ? 'Register' : 'Login'}
          </Button>
        </form>
        <Button onClick={handleGoogleSignIn} variant="contained" fullWidth className={`${styles.button} ${styles.googleButton}`}>
          Sign in with Google
        </Button>
        <Button onClick={toggleForm} color="secondary" fullWidth className={styles.toggleButton}>
          {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
        </Button>
      </div>
    </Container>
  );
};

export default Login;
