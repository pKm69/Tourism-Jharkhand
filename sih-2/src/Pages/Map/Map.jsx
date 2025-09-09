import React,{useLayoutEffect} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Imap from '../../components/Interactivemap/Imap'
import HeroView from '../../components/Herosection/Heroview'
import IconicDestinations from '../../components/IconDestination/IconDestination'

const Map = () => {
   useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className='maps'>
      <Navbar />
      <HeroView />
      <Imap />
      <IconicDestinations />
      <Footer />
    </div>
  )
}

export default Map
