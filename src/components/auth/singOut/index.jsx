import React from 'react';
import { signOutUser } from '../../../api/firebase';

const SignOut = () => {
  return <button onClick={signOutUser}>Sign Out</button>;
};

export default SignOut;
