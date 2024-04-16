import React, { useState } from 'react';
import { TextField, Button, Typography } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 

const SigninPage = ({ onSignUpClick, onHide }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [signInError, setSignInError] = useState('');
    const [recaptchaValue, setRecaptchaValue] = useState(null); 
    const [submitted, setSubmitted] = useState(false);
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
          console.log('Sign in successful');
          alert("signin successful");
          const selectedOption = response.data.selected_option;
          console.log(selectedOption);
  
          if (selectedOption === 'Admin') {
            navigate('/admin-dashboard');
          } else if (selectedOption === 'Customer') {
            navigate('/customer-dashboard');
          } else if (selectedOption === 'IC design service provider') {
            navigate('/icdesign-dashboard');
          }  else if (selectedOption === 'Engineer') {
            navigate('/engineer-dashboard');
          } else if (selectedOption === 'Domain Leader') {
            navigate('/domainleader-dashboard');
          }
          
          setSubmitted(true);
          onHide();
        } else {
          setSignInError(response.data.message);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setSignInError('Invalid email or password');
          alert('Invalid email or password');
        } else {
          console.error('Error signing in:', error);
          setSignInError('An error occurred while signing in');
        }
      }
    };
  
    const handleCaptchaSubmit = () => {
      if (!recaptchaValue) {
        console.log('Please complete the ReCAPTCHA');
        return;
      }
    };
  
  
    return (
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>
          <Typography variant="h4" align="center" gutterBottom>
            Sign In
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
                color="primary"
                fullWidth
                type="submit"
                style={{ marginTop: '10px' }}
              >
                Sign In
              </Button>
            </form>
          )}
          <Button onClick={onSignUpClick} fullWidth>
            Sign Up
          </Button>
        </div>
      </div>
    );
  };
  

export default SigninPage;
