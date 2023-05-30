import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../layout/clientLayout/Header'
const Home = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default Home