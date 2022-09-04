import React, { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { linkApi } from '../store/api/linkApi'

import styles from '../styles/Form.module.scss'

type FormValue = {
  link: string
}

type FormProps = {
  token: string
  shortLink: (link: string) => void
}

const Form: FC<FormProps> = ({ token, shortLink }) => {
  const [linkValue, setLinkValue] = useState('')

  // const [getLinks, {}] = linkApi.useShortLinkMutation()

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<FormValue>({
    mode: 'onSubmit',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkValue(e.target.value)
  }

  const onSubmit = (data: FormValue) => {
    shortLink(linkValue)
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
          value={linkValue}
          onChange={handleChange}
        />
        <button type='submit' className={styles.button}>
          {errors?.link ? <div className={styles.error}>{errors.link.message} </div> : 'Shorten'}
        </button>
      </form>
    </div>
  )
}

export default Form
