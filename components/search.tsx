import _ from 'lodash'

import React, { FC, useCallback } from 'react'

import styles from '../styles/Search.module.scss'

type SearchProps = {
  setSearchValue: (value: string) => void
}

const Search: FC<SearchProps> = ({ setSearchValue }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const debouncedChangeHandler = useCallback(_.debounce(handleChange, 300), [])

  return (
    <div className={styles.search}>
      <input type='text' className={styles.input} onChange={debouncedChangeHandler} placeholder='Find your link' />
    </div>
  )
}

export default Search
