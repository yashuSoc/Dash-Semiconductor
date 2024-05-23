// SessionValidityChecker.jsx
import React, { useEffect } from 'react';
import axios from 'axios';

const SessionValidityChecker = () => {
  useEffect(() => {
    const checkSessionValidity = async () => {
      const session_id = sessionStorage.getItem('session_id');

      if (session_id) {
        try {
          const response = await axios.post('/checkSessionValidity', { session_id });
          const data = response.data;
          if (!data.success) {
            sessionStorage.clear();
            window.location.href = '/signin';
          }
        } catch (error) {
          console.error('Error checking session validity:', error);
        }
      }
    };

    const intervalId = setInterval(checkSessionValidity, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return null;
};

export default SessionValidityChecker;
