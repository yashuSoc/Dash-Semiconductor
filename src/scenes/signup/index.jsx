import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel, Stack, FormHelperText } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import CustomAlert from '../../components/CustomAlert';

const SignupPage = ({ onSignInClick, onHide }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dropdownValue, setDropdownValue] = useState('');
    const [icProviderFirm, setIcProviderFirm] = useState('');
    const [icDesigners, setIcDesigners] = useState([]);
    const [icDesigner, setIcDesigner] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [dropdownError, setDropdownError] = useState('');
    const [icProviderFirmError, setIcProviderFirmError] = useState('');
    const [icDesignerError, setIcDesignerError] = useState('');
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
  
    const validatePassword = (password) => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return passwordRegex.test(password);
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
      } else if (!validatePassword(value)) {
        setPasswordError(
          '* Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character'
        );
      } else {
        setPasswordError('');
      }
    };
  
    const handleDropdownChange = (e) => {
      const value = e.target.value;
      setDropdownValue(value);
      if (value === '') {
        setDropdownError('Please select an option');
      } else {
        setDropdownError('');
      }
    };

    const handleIcProviderFirmChange = (e) => {
      const value = e.target.value;
      setIcProviderFirm(value);
      if (value === '') {
        setIcProviderFirmError('Please select an option');
      } else {
        setIcProviderFirmError('');
      }
    };

    const handleIcDesignerChange = (e) => {
      const value = e.target.value;
      setIcDesigner(value);
      if (value === '') {
        setIcDesignerError('Please select an IC designer');
      } else {
        setIcDesignerError('');
      }
    };

    useEffect(() => {
      if (icProviderFirm === 'yes') {
        axios.get('http://localhost:3000/icdesigners')
          .then(response => {
            setIcDesigners(response.data);
          })
          .catch(error => {
            console.error('Error fetching IC designers:', error);
            setAlert({ open: true, severity: 'error', message: 'Error fetching IC designers' });
          });
      }
    }, [icProviderFirm]);

    const redirectToSignIn = () => {
      navigate('/signin'); // Redirect to sign-in page
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      let formValid = true;
      
      if (!validateEmail(email)) {
        setEmailError('Please enter a valid email address');
        formValid = false;
      }
  
      if (password.trim() === '' || !validatePassword(password)) {
        setPasswordError('Please enter a valid password');
        formValid = false;
      }
  
      if (dropdownValue === '') {
        setDropdownError('Please select an option');
        formValid = false;
      }
  
      if (dropdownValue === 'Customer' && icProviderFirm === '') {
        setIcProviderFirmError('Please select an option');
        formValid = false;
      }
  
      if (icProviderFirm === 'yes' && icDesigner === '') {
        setIcDesignerError('Please select an IC designer');
        formValid = false;
      }
  
      if (!recaptchaValue) {
        setAlert({ open: true, severity: 'warning', message: 'Please complete the ReCAPTCHA' });
        return;
      }
  
      if (formValid) {
        try {
          const response = await axios.post('http://localhost:3000/signup', {
            email: email,
            password: password,
            role: dropdownValue,
            icProviderFirm: icProviderFirm === 'yes',
            icDesigner: icDesigner
          });

          if (response.data && response.data.role_id) {
            sessionStorage.setItem('user_id', response.data.user_id);
            sessionStorage.setItem('role_id', response.data.role_id);
            sessionStorage.setItem('session_id', response.data.session_id);

            switch (dropdownValue) {
              case 'Admin':
                  navigate('/');
                  break;
              case 'Customer':
                  navigate('/customerDashboard/customerform');
                  break;
              case 'IC design service provider':
                  navigate('/icDesign/icboard');
                  break;
              case 'Domain Leader':
                  navigate('/domainLeader/domainDashboard');
                  break;
              case 'Engineer':
                  navigate('/engineerDashboard');
                  break;
              default:
                  setAlert({ open: true, severity: 'error', message: 'Invalid role: ' + dropdownValue });
                  return;
            }

            setAlert({ open: true, severity: 'success', message: 'Signup successful' });
            setEmail('');
            setPassword('');
            setDropdownValue('');
            setIcProviderFirm('');
            setIcDesigner('');
            setSubmitted(true);
            if (typeof onHide === 'function') {
              onHide(); // Call onHide function to hide the signup page or perform other actions
            }
          }
        } catch (error) {
          if (error.response && error.response.status === 409) {
            setAlert({ open: true, severity: 'error', message: 'Email already exists' });
          } else {
            setAlert({ open: true, severity: 'error', message: 'Error submitting form' });
          }
        }
      }
    };

    const handleCloseAlert = () => {
      setAlert({ ...alert, open: false });
    };
  
    return (
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ maxWidth: 400, textAlign: 'center' }}>
          <Typography variant="h2" gutterBottom style={{ color: '#2196f3', animation: 'rainbow 2s infinite' }}>
            Join the club of innovators! 
          </Typography>
          <Typography variant="h4" gutterBottom>
            Sign Up now and unlock endless possibilities
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
            
            <FormControl variant="outlined" fullWidth error={!!dropdownError} margin="normal">
              <InputLabel id="dropdown-label">Choose an option</InputLabel>
              <Select
                labelId="dropdown-label"
                id="dropdown"
                value={dropdownValue}
                onChange={handleDropdownChange}
                label="Choose an option"
              >
                <MenuItem value="">
                  <em>Select an option</em>
                </MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Customer">Customer</MenuItem>
                <MenuItem value="Engineer">Engineer</MenuItem>
                <MenuItem value="Domain Leader">Domain Leader</MenuItem>
                <MenuItem value="IC design service provider">IC design service provider</MenuItem>
              </Select>
              <FormHelperText>{dropdownError}</FormHelperText>
            </FormControl>
            
            {dropdownValue === 'Customer' && (
              <FormControl variant="outlined" fullWidth error={!!icProviderFirmError} margin="normal">
                <InputLabel id="ic-provider-firm-label">Are you belong to any IC Provider Firm?</InputLabel>
                <Select
                  labelId="ic-provider-firm-label"
                  id="ic-provider-firm"
                  value={icProviderFirm}
                  onChange={handleIcProviderFirmChange}
                  label="Are you belong to any IC Provider Firm?"
                >
                  <MenuItem value="">
                    <em>Select an option</em>
                  </MenuItem>
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </Select>
                <FormHelperText>{icProviderFirmError}</FormHelperText>
              </FormControl>
            )}
            
            {icProviderFirm === 'yes' && (
              <FormControl variant="outlined" fullWidth error={!!icDesignerError} margin="normal">
                <InputLabel id="ic-designer-label">Select IC Design Service Firm</InputLabel>
                <Select
                  labelId="ic-designer-label"
                  id="ic-designer"
                  value={icDesigner}
                  onChange={handleIcDesignerChange}
                  label="Select IC Design Service  Firm"
                >
                  <MenuItem value="">
                    <em>Select an IC Design Service Provide Firm</em>
                  </MenuItem>
                  {icDesigners.map(designer => (
                    <MenuItem key={designer.id} value={designer.name}>{designer.name}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>{icDesignerError}</FormHelperText>
              </FormControl>
            )}

            <div className="mt-1 flex justify-start">
              <ReCAPTCHA 
                sitekey="6Lcp54gpAAAAAN6exs5goYq2-lUXUPAwkSZ6eJSv"
                onChange={handleRecaptchaChange}
              />
            </div>
            <Button
              variant="contained"
              color="info"
              fullWidth
              type="submit"
              style={{ marginTop: '10px' }}
            >
              Submit
            </Button>
          </form>
          )}
          <div style={{ marginTop: '10px', color: 'white' }}>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} mt={2}>
              <Button onClick={redirectToSignIn} fullWidth variant="text" color="info">
                Don't have an account? Register Here 
              </Button>
            </Stack>
          </div>
        </div>
        <CustomAlert
          open={alert.open}
          onClose={handleCloseAlert}
          severity={alert.severity}
          message={alert.message}
        />
      </div>
    );
};

export default SignupPage;
