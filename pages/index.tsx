import Head from 'next/head'
import Image from 'next/image'

import type { NextPage } from 'next'
import Statistic from './statistic'
import Form from '../components/form'
import Navbar from '../components/navbar'
import Login from './login'

const Home: NextPage = () => {
  return (
    <>
      <Form />
      <Statistic />
    </>
  )
}

export default Home
