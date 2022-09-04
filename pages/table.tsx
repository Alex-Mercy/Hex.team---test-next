import Image from 'next/image'
import React, { FC, useEffect, useState } from 'react'

import sortImage from '../assets/images/sort.png'
import sortImageByAsc from '../assets/images/sortByAsc.png'
import sortImageByDesc from '../assets/images/sortByDesc.png'

import { linkApi, LinkResponseType } from '../store/api/linkApi'

import styles from '../styles/Table.module.scss'

const cn = require('classnames')

// creating an array of headers for the table
const headers = [
  { id: 2, type: 'longLink', name: 'Long Link' },
  { id: 3, type: 'shortLink', name: 'Short Link' },
  { id: 4, type: 'statistic', name: 'Statistic' },
]

type TableProps = {
  data?: LinkResponseType[]
  token?: string
}

const Table: FC<TableProps> = ({ data, token }) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            <th className={styles.header}>Id</th>
            {headers.map((header) => {
              return (
                <th className={styles.header} key={header.id}>
                  <div className={styles.headerWithFilter}>
                    {header.name}
                    <Image
                      // src={header.type === sortBy ? imageSort : sortImage}
                      src={sortImage}
                      alt='Sort png'
                      width={20}
                      height={20}
                    />
                  </div>
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
                <td className={cn(styles.columns, styles.target)}>{item.target}</td>

                <td className={styles.columns}>
                  <div className={styles.shortLink}>
                    {item.short}
                    <a href='' className={styles.copyButton}>
                      Copy
                    </a>
                  </div>
                </td>
                <td className={cn(styles.columns, styles.columnsNumber)}>{item.counter}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table
