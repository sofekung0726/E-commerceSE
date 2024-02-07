import React from 'react'
import Banner from '../components/Banner'
import Categories from '../components/Categories'
import SpecialProduct from '../components/SpecialProduct'
import Testimonials from '../components/Testimonials'
import OurService from '../components/OurService'

const Home = () => {
  return (
    <div>
        <Banner/>
        <Categories/>
        <SpecialProduct/>
        <Testimonials/>
        <OurService/>
    </div>
  )
}

export default Home