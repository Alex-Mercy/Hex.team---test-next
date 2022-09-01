import React from 'react'

import styles from '../styles/Form.module.scss'

const Form = () => {
  return (
    <div className={styles.form}>
      <input type='text' placeholder='Shorten a link here...' className={styles.input} />
      <a href='' className={styles.button}>
        Shorten
      </a>
    </div>
  )
}

export default Form
