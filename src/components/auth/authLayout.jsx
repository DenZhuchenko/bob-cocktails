import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthLayout = ({ children }) => {
  const navigate = useNavigate();
  const client = useSelector((state) => state.auth.currentUser);

  console.log('client: ', client);

  const noClientRedirection = () => {
    if (client !== null) {
      navigate('/Light%20rum', { replace: true });
    }
  };

  useEffect(() => {
    noClientRedirection();
  }, [client]);

  return <>{children}</>;
};

export default AuthLayout;
