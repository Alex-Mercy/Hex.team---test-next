import React from 'react'

import styles from '../styles/Statistic.module.scss'

// creating an array of headers for the table
const headers = [
  { id: 1, type: 'number', name: 'Number' },
  { id: 2, type: 'longLink', name: 'Long Link' },
  { id: 3, type: 'shortLink', name: 'Short Link' },
  { id: 4, type: 'statistic', name: 'Statistic' },
]

const Statistic = () => {
  return (
    <div className={styles.table}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            <th>Дата</th>
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
          <tr>
            <td className={styles.columns}>sdg</td>
            <td className={styles.columns}>asdg</td>
            <td className={styles.columns}>adg</td>
            <td className={styles.columns}>
              <div className={styles.shortLink}>
                asdg
                <a href='' className={styles.copyButton}>
                  Copy
                </a>
              </div>
            </td>
            <td className={styles.columns}>asdg</td>
          </tr>
          <tr>
            <td className={styles.columns}>sdg</td>
            <td className={styles.columns}>asdg</td>
            <td className={styles.columns}>adg</td>
            <td className={styles.columns}>asdg</td>
            <td className={styles.columns}>asdg</td>
          </tr>
          <tr>
            <td className={styles.columns}>sdg</td>
            <td className={styles.columns}>asdg</td>
            <td className={styles.columns}>adg</td>
            <td className={styles.columns}>asdg</td>
            <td className={styles.columns}>asdg</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Statistic
