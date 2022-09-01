import React from 'react'
let cn = require('classnames')
import { useForm } from 'react-hook-form'

import styles from '../styles/Login.module.scss'

type FormValues = {
  email: string
  password: string
}

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    mode: 'onBlur',
  })

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <div className={styles.login}>
      <h1 className={styles.header}>Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          {...register('email', {
            required: 'Email is required.',
            pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email format' },
          })}
          placeholder='Email Address'
          className={cn(styles.input, styles.email)}
        />
        {errors?.email && <div className={styles.errorMessage}>{errors.email.message}</div>}
        <input
          {...register('password', {
            required: 'Password is required.',
            minLength: { value: 5, message: '5 characters minimum' },
          })}
          type='password'
          placeholder='Password'
          className={cn(styles.input, styles.password)}
        />
        {errors?.password && <div className={styles.errorMessage}>{errors.password.message}</div>}
        <button type='submit' className={styles.button}>
          Log In
        </button>
      </form>
    </div>
  )
}

export default Login
