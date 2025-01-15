import React from 'react'
import {assets} from '../assets/admin_assets/assets'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between p-5 border-4 border-t-white border-l-white border-r-white border-b' >
    <div >
      <img className='w-32' src={assets.logo} alt='logo' />
    </div>
    <img src={assets.profile_image} alt='profile' />
  </div>
  )
}

export default Navbar
