import React, { useState} from 'react';
import { TextField, Button, Typography, Stack } from "@mui/material";
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

      if (!recaptchaValue) {
        console.log('Please complete the ReCAPTCHA');
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
          console.log('Sign in successful');
          alert("signin successful");
          const selectedOption = response.data.role_id;
          sessionStorage.setItem('user_id', response.data.user_id);
          sessionStorage.setItem('role_id', response.data.role_id);
          sessionStorage.setItem('session_id', response.data.session_id);
          if (selectedOption === 1) {
            navigate('/');
          } else if (selectedOption === 2) {
            navigate('/customerDashboard/custboard');
          } else if (selectedOption === 3) {
            navigate('/icDesign/icboard');
          }  else if (selectedOption === 5) {
            navigate('/engineerDashboard');
          } else if (selectedOption === 4) {
            navigate('/domainLeader/domainDashboard');
          }
          
          setSubmitted(true);
          if (onHide) onHide(); 
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
    const handleSignUpButtonClick = () => {
      // Navigate to sign-up page
      navigate('/signup');
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
              Don't have an account  ?..   Register Here 
            </Button>
          </Stack>
        </div>
      </div>
    );
  };
  

export default SigninPage;
