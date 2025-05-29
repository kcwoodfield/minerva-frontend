'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/login');
    router.refresh();
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleLogout}
      sx={{ ml: 2 }}
    >
      Logout
    </Button>
  );
}