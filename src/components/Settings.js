import React from 'react';

import SignIn from './SignIn';
import NavBar from './NavBar';

import { AuthCheck, useUser } from 'reactfire';

export default function Settings() {
  const { data: user } = useUser();

  return (
    <AuthCheck fallback={<SignIn />}>
      <NavBar path={'settings'} />
      <div>SETTINGS PAGE</div>

      <div>User: {user?.email}</div>
    </AuthCheck>
  );
}
