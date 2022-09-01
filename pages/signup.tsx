import React from 'react'
let cn = require('classnames')

import styles from '../styles/Login.module.scss'

const SignUp = () => {
  return (
    <div className={styles.login}>
      <h1 className={styles.header}>Sign Up</h1>
      <form className={styles.form}>
        <input type='text' placeholder='Email Address' className={cn(styles.input, styles.email)} />
        <input type='text' placeholder='Password' className={cn(styles.input, styles.password)} />
        <a href='' className={styles.button}>
          Sign Up
        </a>
      </form>
    </div>
  )
}

export default SignUp
