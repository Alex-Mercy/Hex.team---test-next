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

  const getLinks = async () => {
    const res = await fetch(`http://79.143.31.216/statistics?order=asc_short&offset=0`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await res.json()
    setlinks(data)
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
    // console.log(data)
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    accessToken && setToken(accessToken)
    getLinks()
  }, [])

  const setPage = (page: number) => {
    setCurerntPAge(page)
  }

  // const { data } = linkApi.useGetLinksQuery(token)

  return (
    <>
      <Form token={token} shortLink={shortLink} />
      <Table data={links} token={token} />
      <Pagination qty={links.length} setPage={setPage} />
    </>
  )
}

export default Home
