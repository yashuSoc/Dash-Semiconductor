import React, { useState } from 'react';
import { TextField, Button, Typography, Stack } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import CustomAlert from '../../components/CustomAlert';

const SigninPage = ({ onSignUpClick, onHide }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [signInError, setSignInError] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState(null); 
  const [submitted, setSubmitted] = useState(false);
  const [alert, setAlert] = useState({ open: false, severity: 'info', message: '' });
  const navigate = useNavigate();

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.trim() === '') {
      setPasswordError('Please enter a password');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaValue) {
      setAlert({ open: true, severity: 'warning', message: 'Please complete the ReCAPTCHA' });
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    if (password.trim() === '') {
      setPasswordError('Please enter a password');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/signin', {
        email: email,
        password: password,
      });

      if (response.data.success) {
        const { user_id, role_id, session_id } = response.data;
        sessionStorage.setItem('user_id', user_id);
        sessionStorage.setItem('role_id', role_id);
        sessionStorage.setItem('session_id', session_id);

        let navigateTo;
        switch (role_id) {
          case 1:
            navigateTo = '/form';
            break;
          case 2:
            navigateTo = '/customerDashboard/customerform';
            break;
          case 3:
            navigateTo = '/icDesign/icboard';
            break;
          case 4:
            navigateTo = '/domainLeader/domainDashboard';
            break;
          case 5:
            navigateTo = '/engineerDashboard';
            break;
          default:
            navigateTo = '/';
        }

        navigate(navigateTo);
        setAlert({ open: true, severity: 'success', message: 'Sign in successful' });
        setSubmitted(true);
        if (onHide) onHide(); 
      } else {
        setSignInError(response.data.message);
        setAlert({ open: true, severity: 'error', message: response.data.message });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setSignInError('Invalid email or password');
          setAlert({ open: true, severity: 'error', message: 'Invalid email or password' });
        } else if (error.response.status === 404) {
          setSignInError('User not exists. Please create a new User.');
          setAlert({ open: true, severity: 'warning', message: 'User not exists. Please create a new User.' });
        } else {
          setSignInError('An error occurred while signing in');
          setAlert({ open: true, severity: 'error', message: 'An error occurred while signing in' });
        }
      } else {
        console.error('Error signing in:', error);
        setSignInError('An error occurred while signing in');
        setAlert({ open: true, severity: 'error', message: 'An error occurred while signing in' });
      }
    }
  };

  const handleSignUpButtonClick = () => {
    navigate('/signup');
  };

  const handleAlertClose = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ maxWidth: 400, textAlign: 'center' }}>
        <Typography variant="h2" gutterBottom style={{ color: '#2196f3', animation: 'rainbow 2s infinite' }}>
          Welcome Back!
        </Typography>
        <Typography variant="h4" gutterBottom>
          Sign in to your account to continue
        </Typography>
        {!submitted && (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email address"
              variant="outlined"
              fullWidth
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
              margin="normal"
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={handlePasswordChange}
              error={!!passwordError}
              helperText={passwordError}
              margin="normal"
            />
            {signInError && <Typography variant="body2" color="error">{signInError}</Typography>}
            <ReCAPTCHA
              sitekey="6Lcp54gpAAAAAN6exs5goYq2-lUXUPAwkSZ6eJSv"
              onChange={handleRecaptchaChange}
            />
            <Button
              variant="contained"
              color="info"
              fullWidth
              type="submit"
              style={{ marginTop: '10px' }}
            >
              Sign In
            </Button>
          </form>
        )}
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} mt={2}>
          <Button onClick={handleSignUpButtonClick} fullWidth variant="text" color="info">
            Don't have an account? Register Here
          </Button>
        </Stack>
      </div>
      <CustomAlert
        open={alert.open}
        onClose={handleAlertClose}
        severity={alert.severity}
        message={alert.message}
      />
    </div>
  );
};

export default SigninPage;
