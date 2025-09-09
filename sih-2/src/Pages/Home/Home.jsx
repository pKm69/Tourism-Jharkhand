import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Herosection/Hero';
import SmartTourism from '../../components/SmartTourism/SmartTourism';
import IconicDestinations from '../../components/IconDestination/IconDestination';
import StatsSection from '../../components/StatsSection/StatsSection';
import CallToAction from '../../components/CallToAction/CallToAction';
import Footer from '../../components/Footer/Footer';

import "./Home.css"

const Home = () => {
  return (
    <div className='home'>
        <Navbar />
        <Hero />
        <SmartTourism />
        <IconicDestinations />
        <StatsSection />
        <CallToAction />
        <Footer />
    </div>
  )
}

export default Home
