import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Main = () => {
  return (
    <div>
    <navbar><Navbar /></navbar>
    <Outlet/>
    <footer><Footer/></footer>
    </div>
  )
}

export default Main