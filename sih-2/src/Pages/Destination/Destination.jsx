import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import HeroSection from '../../components/Herosection/Herodestination'
import IconicDestinations from '../../components/IconDestination/IconDestination'
import SmartTourism from '../../components/SmartTourism/SmartTourism'
import Footer from '../../components/Footer/Footer'

const Destination = () => {
  return (
    <div className='destination'>
      <Navbar />
      <HeroSection />
      <IconicDestinations />
      <SmartTourism />
      <Footer />
    </div>
  )
}

export default Destination
