'use client';

import Navigate from './components/navigate';
import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body suppressHydrationWarning>
        <Navigate />
        {children}
      </body>
    </html>
  );
}
