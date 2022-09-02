import React, { useEffect, useState } from 'react'

import { linkApi } from '../store/api/linkApi'

import styles from '../styles/Table.module.scss'

// creating an array of headers for the table
const headers = [
  { id: 1, type: 'number', name: 'Number' },
  { id: 2, type: 'longLink', name: 'Long Link' },
  { id: 3, type: 'shortLink', name: 'Short Link' },
  { id: 4, type: 'statistic', name: 'Statistic' },
]

const Table = () => {
  const [token, setToken] = useState('')
  const { data } = linkApi.useGetLinksQuery(token)

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    accessToken && setToken(accessToken)
  }, [])

  return (
    <div className={styles.table}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            {headers.map((header) => {
              return (
                <th className={styles.headerWithFilter} key={header.id}>
                  {header.name}
                  {/* <img
                    className={styles.sortImage}
                    src={header.type === sortBy ? imageSort : sortImage}
                    alt='Sort png'
                  /> */}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => {
            return (
              <tr key={item.id}>
                <td className={styles.columns}>{item.id}</td>
                <td className={styles.columns}>{item.target}</td>

                <td className={styles.columns}>
                  <div className={styles.shortLink}>
                    {item.short}
                    <a href='' className={styles.copyButton}>
                      Copy
                    </a>
                  </div>
                </td>
                <td className={styles.columns}>{item.counter}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table
