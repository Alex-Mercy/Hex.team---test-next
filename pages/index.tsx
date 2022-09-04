import { useEffect, useState } from 'react'

import Table from './table'

import Form from '../components/form'

import Pagination from '../components/pagination'

import { linkApi } from '../store/api/linkApi'

import type { NextPage } from 'next'

const Home: NextPage = () => {
  const [token, setToken] = useState('')
  const [links, setlinks] = useState([])
  const [sortBy, setSortBy] = useState('target')
  const [isAscOrder, setIsAscOrder] = useState(true)

  // creating an array of headers for the table
  const headers = [
    { id: 1, type: 'target', name: 'Long Link' },
    { id: 2, type: 'short', name: 'Short Link' },
    { id: 3, type: 'counter', name: 'Counter' },
  ]

  const [currentPage, setCurerntPAge] = useState(1)
  const perPage = 100

  const getLinks = async () => {
    const res = await fetch(
      `http://79.143.31.216/statistics?order=${isAscOrder ? 'asc' : 'desc'}_${sortBy}&offset=${
        (currentPage - 1) * perPage
      }&limit=${perPage}`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    const data = await res.json()
    setlinks(data)
  }

  console.log(sortBy)

  const changeSortOrder = (headerName: string) => {
    setIsAscOrder(!isAscOrder)
    const type = headers.find((item) => item.name === headerName)?.type
    type && setSortBy(type)
  }

  const shortLink = async (link: string) => {
    const res = await fetch(`http://79.143.31.216/squeeze?link=${link}`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await res.json()
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    accessToken && setToken(accessToken)
    getLinks()
  }, [])

  useEffect(() => {
    getLinks()
  }, [currentPage, isAscOrder, sortBy])

  const setPage = (page: number) => {
    setCurerntPAge(page)
  }

  // const { data } = linkApi.useGetLinksQuery(token)

  return (
    <>
      <Form token={token} shortLink={shortLink} />
      <Table
        data={links}
        token={token}
        headers={headers}
        isAscOrder={isAscOrder}
        sortBy={sortBy}
        changeSortOrder={changeSortOrder}
      />
      <Pagination setPage={setPage} currentPage={currentPage} token={token} perPage={perPage} />
    </>
  )
}

export default Home
