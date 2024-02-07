import React from 'react'
import { Outlet } from 'react-router-dom'

const Main = () => {
  return (
    <div>
    <navbar>Navbar</navbar>
    <Outlet/>
    <footer>Footer</footer>
    </div>
  )
}

export default Main