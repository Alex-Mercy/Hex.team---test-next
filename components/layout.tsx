import React, { FC } from 'react'
import Navbar from './navbar'

type LayoutProps = {
  children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className='wrapper'>
      <Navbar />
      {children}
    </div>
  )
}

export default Layout
