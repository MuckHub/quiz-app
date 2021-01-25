import React from 'react';
import SignIn from './SignIn';
import ResponsiveDrawer from './ResponsiveDrawer';
import { AuthCheck, useUser } from 'reactfire';

export default function Settings() {
  const { data: user } = useUser();
  return (
    <AuthCheck fallback={<SignIn />}>
      <ResponsiveDrawer path={'settings'} />
      <div>SETTINGS PAGE</div>

      <div>User: {user?.email}</div>
    </AuthCheck>
  );
}
