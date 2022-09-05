import Image from 'next/image'
import React, { FC, useEffect, useState } from 'react'

import sortImage from '../assets/images/sort.png'
import sortImageByAsc from '../assets/images/sortByAsc.png'
import sortImageByDesc from '../assets/images/sortByDesc.png'

import { linkApi, LinkResponseType } from '../store/api/linkApi'

import styles from '../styles/Table.module.scss'

const cn = require('classnames')

type HeaderType = {
  id: number
  type: string
  name: string
}

type TableProps = {
  filteredData?: any
  headers: HeaderType[]
  isAscOrder: boolean
  sortBy: string
  changeSortOrder: (sortType: string) => void
}

const Table: FC<TableProps> = ({ headers, isAscOrder, sortBy, changeSortOrder, filteredData }) => {
  const [activeButton, setActiveButton] = useState('')
  let imageSort: any
  if (isAscOrder === true) {
    imageSort = sortImageByAsc
  } else {
    imageSort = sortImageByDesc
  }

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    changeSortOrder(e.currentTarget.innerText)
  }

  const copyLink = (link: string) => {
    setActiveButton(link)
    navigator.clipboard.writeText(`http://79.143.31.216/s/${link}`)
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            <th className={cn(styles.header, styles.id)}>Id</th>
            {headers.map((header) => {
              return (
                <th className={styles.header} key={header.id} onClick={handleClick}>
                  <div className={styles.headerWithFilter}>
                    {header.name}
                    <Image src={header.type === sortBy ? imageSort : sortImage} alt='Sort png' width={20} height={20} />
                  </div>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {}
          {filteredData?.map((item: any) => {
            return (
              <tr key={item.id}>
                <td className={styles.columns}>{item.id}</td>
                <td className={cn(styles.columns, styles.target)}>{item.target}</td>

                <td className={styles.columns}>
                  <div className={styles.shortLink}>
                    {item.short}
                    <a
                      className={cn(
                        {
                          [styles.active]: activeButton === item.short,
                        },
                        styles.copyButton,
                      )}
                      onClick={() => copyLink(item.short)}
                    >
                      {activeButton === item.short ? 'Copied' : 'Copy'}
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
