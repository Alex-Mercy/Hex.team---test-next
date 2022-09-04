import { useEffect, useState } from 'react'

import Table from './table'

import Form from '../components/form'

import Pagination from '../components/pagination'

import { linkApi } from '../store/api/linkApi'

import type { NextPage } from 'next'

const Home: NextPage = () => {
  const [token, setToken] = useState('')
  const [links, setlinks] = useState([])
  const [currentPage, setCurerntPAge] = useState(1)
  const perPage = 100

  const getLinks = async () => {
    const res = await fetch(
      `http://79.143.31.216/statistics?order=asc_counter&offset=${(currentPage - 1) * perPage}&limit=${perPage}`,
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

  console.log(currentPage)

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
  }, [currentPage])

  const setPage = (page: number) => {
    setCurerntPAge(page)
  }

  // const { data } = linkApi.useGetLinksQuery(token)

  return (
    <>
      <Form token={token} shortLink={shortLink} />
      <Table data={links} token={token} />
      <Pagination setPage={setPage} currentPage={currentPage} token={token} perPage={perPage} />
    </>
  )
}

export default Home
