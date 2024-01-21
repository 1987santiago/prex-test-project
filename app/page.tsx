'use client';

import Link from 'next/link';
import LogoutComponent from './components/logout';
import styles from './page.module.css';
import { USER } from '@/constants';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Home = () => {
  const [isClient, setIsClient] = useState(false);
  let loggedUser = isClient ? global?.localStorage?.getItem(USER.ACTIVE) : false;

  useEffect(() => {
    setIsClient(true);
  }, [])

  return (
    <main className={styles.mainPage}>
      {loggedUser && (
        <div>
          <h3>Hola {loggedUser}!</h3>
          <LogoutComponent onSubmit={() => { localStorage.clear() }} />
          <Link href='pages/files'>File List</Link>
        </div>
      )}
      {!loggedUser && (
        <div>
          <Link href='pages/login'>Sign in</Link>
          <Link href='pages/create-account'>Create Account</Link>
        </div>
      )}
    </main>
  )
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
});