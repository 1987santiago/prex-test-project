'use client';

import Navigate from './components/navigate';
import './globals.css'

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  return (
    <html lang="es">
      <body suppressHydrationWarning>
        <Navigate onLogout={() => {
          localStorage.clear();
          window.location.reload();
        }} />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
