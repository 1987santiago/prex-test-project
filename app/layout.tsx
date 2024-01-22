'use client';

import { useEffect, useState } from 'react';
import Navigate from './components/navigate';
import './globals.css'
import { USER } from '@/constants';

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isClient, setIsClient] = useState(false);
  const [activeUser, setActiveUser] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, [])


  return (
    <html lang="es">
      <body suppressHydrationWarning>
        <Navigate onLogout={() => {
          setActiveUser('');
          localStorage.clear();
        }} />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
