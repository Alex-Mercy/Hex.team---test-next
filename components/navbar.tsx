import Link from 'next/link'
import React from 'react'

import styles from '../styles/Navbar.module.scss'

if (typeof window !== 'undefined') {
  localStorage.getItem('accessToken')
}

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Link href='/login'>
        <a className={styles.link}>Log in</a>
      </Link>

      <Link href='/signup'>
        <a className={styles.link}>Sign Up Free</a>
      </Link>
    </div>
  )
}

export default Navbar
