import cn from 'classnames'
import Link from 'next/link'

import React, { FC, useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

import { LinkResponseType } from '../store/api/linkApi'

import styles from '../styles/Pagination.module.scss'

// import { setCurrentPage } from '../../../store/tableReducer';

type PaginationProps = {
  setPage: (page: number) => void
  currentPage: number
  token: string
  perPage: number
}

const Pagination: FC<PaginationProps> = ({ setPage, currentPage, token, perPage }) => {
  const [qty, setQty] = useState(0)

  useEffect(() => {
    getQty()
  }, [])

  const pagesCount = qty && Math.ceil(qty / perPage)
  if (pagesCount === null) return null

  const pages = Array(pagesCount)
    .fill(0)
    .map((e, i) => i + 1)

  const onIncrementPage = () => {
    setPage(currentPage + 1)
  }

  const onDecrementPage = () => {
    setPage(currentPage - 1)
  }

  const getQty = async () => {
    const res = await fetch(`http://79.143.31.216/statistics`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await res.json()
    setQty(data.length)
  }

  return (
    <div className={styles.pagination}>
      <a
        className={cn({
          [styles.notActive]: currentPage < 2,
        })}
        onClick={onDecrementPage}
      >
        &laquo;
      </a>
      {pages.map((page, index) => {
        return (
          <a
            key={index}
            className={cn({
              [styles.active]: currentPage === page,
            })}
            onClick={() => setPage(page)}
          >
            {page}
          </a>
        )
      })}
      <a
        onClick={onIncrementPage}
        className={cn({
          [styles.notActive]: currentPage === pagesCount,
        })}
      >
        &raquo;
      </a>
    </div>
  )
}

export default Pagination
