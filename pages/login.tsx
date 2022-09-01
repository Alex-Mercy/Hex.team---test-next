import React from 'react'
let cn = require('classnames')

import styles from '../styles/Login.module.scss'

const Login = () => {
  return (
    <div className={styles.login}>
      <h1 className={styles.header}>Log In</h1>
      <form className={styles.form}>
        <input type='text' placeholder='Email Address' className={cn(styles.input, styles.email)} />
        <input type='text' placeholder='Password' className={cn(styles.input, styles.password)} />
        <a href='' className={styles.button}>
          Log In
        </a>
      </form>
    </div>
  )
}

export default Login
