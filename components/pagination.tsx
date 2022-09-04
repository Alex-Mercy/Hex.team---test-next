import cn from 'classnames'

import React, { FC, useState } from 'react'

import { useDispatch } from 'react-redux'

import { LinkResponseType } from '../store/api/linkApi'

import styles from '../styles/Pagination.module.scss'

// import { setCurrentPage } from '../../../store/tableReducer';

type PaginationProps = {
  qty?: number
  setPage: (page: number) => void
}

const Pagination: FC<PaginationProps> = ({ qty, setPage }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 100
  // const [pageQty, setPageQty] = useState(100)

  const pagesCount = qty && Math.ceil(qty / perPage)

  const pages = Array(pagesCount)
    .fill(0)
    .map((e, i) => i + 1)

  const onIncrementPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const onDecrementPage = () => {
    setCurrentPage(currentPage - 1)
  }

  return (
    <div className={styles.pagination}>
      <a
        className={cn({
          [styles.notActive]: currentPage < 2,
        })}
        onClick={onDecrementPage}
        href={`/${currentPage - 1}`}
      >
        &laquo;
      </a>
      {pages.map((page, index) => {
        return (
          <a
            key={index}
            href={`/${page}`}
            className={cn({
              [styles.active]: currentPage === page,
            })}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </a>
        )
      })}
      <a
        onClick={onIncrementPage}
        href={`/${currentPage + 1}`}
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
