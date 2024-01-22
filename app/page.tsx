'use client';

import Link from 'next/link';
import styles from './page.module.css';
import { USER } from '@/constants';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ROUTES } from '@/constants';

const Home = () => {
  const [isClient, setIsClient] = useState(false);
  let loggedUser = isClient ? global?.localStorage?.getItem(USER.ACTIVE) : false;

  useEffect(() => {
    setIsClient(true);
  }, [])

  return (
    <main className={styles.mainPage}>
      <h2>Bienvenido {loggedUser}!</h2>
      <p>Si quieres ver el listado de archivos ingresa <Link className={styles.link} href={ROUTES.PAGES.FILES}>aquí</Link></p>
    </main>
  )
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
});