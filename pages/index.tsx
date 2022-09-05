import { useEffect, useState } from 'react'

import Table from './table'

import Form from '../components/form'

import Pagination from '../components/pagination'

import Search from '../components/search'

import { linkApi, LinkResponseType } from '../store/api/linkApi'

import type { NextPage } from 'next'

const Home: NextPage = () => {
  const [token, setToken] = useState('')
  const [links, setlinks] = useState([])
  const [sortBy, setSortBy] = useState('target')
  const [isAscOrder, setIsAscOrder] = useState(true)
  const [allData, setAllData] = useState<LinkResponseType[]>([])
  const [searchValue, setSearchValue] = useState('')

  // creating an array of headers for the table
  const headers = [
    { id: 1, type: 'target', name: 'Long Link' },
    { id: 2, type: 'short', name: 'Short Link' },
    { id: 3, type: 'counter', name: 'Counter' },
  ]

  const [currentPage, setCurerntPAge] = useState(1)
  const perPage = 100

  let filteredData = new Array()
  if (searchValue === '') {
    filteredData = links
  } else {
    const foundData = allData && allData.find((item) => item.target === searchValue || item.short === searchValue)
    if (foundData) {
      filteredData[0] = foundData
    }
  }

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
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('accessToken')
      accessToken && setToken(accessToken)
    }
    getLinks()
  }, [])

  useEffect(() => {
    getLinks()
  }, [currentPage, isAscOrder, sortBy])

  const setPage = (page: number) => {
    setCurerntPAge(page)
  }

  return (
    <>
      <Form token={token} shortLink={shortLink} />
      <Table
        filteredData={filteredData}
        headers={headers}
        isAscOrder={isAscOrder}
        sortBy={sortBy}
        changeSortOrder={changeSortOrder}
      />
      <div className='footer'>
        <Search setSearchValue={setSearchValue} />
        <Pagination
          setPage={setPage}
          currentPage={currentPage}
          token={token}
          perPage={perPage}
          setAllData={setAllData}
        />
      </div>
    </>
  )
}

export default Home
