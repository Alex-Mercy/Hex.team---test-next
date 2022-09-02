import React from 'react'
import { useForm } from 'react-hook-form'

import styles from '../styles/Form.module.scss'

type FormValue = {
  link: string
}

const Form = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<FormValue>({
    mode: 'onSubmit',
  })

  const onSubmit = (data: FormValue) => {
    console.log(data)
    reset()
  }

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          type='text'
          {...register('link', {
            required: 'Please, provide a valid url',
            pattern: {
              value: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g,
              message: 'Please, provide a valid url',
            },
          })}
          placeholder='Shorten a link here...'
          className={styles.input}
        />
        <button type='submit' className={styles.button}>
          {errors?.link ? <div className={styles.error}>{errors.link.message} </div> : 'Shorten'}
        </button>
      </form>
    </div>
  )
}

export default Form
