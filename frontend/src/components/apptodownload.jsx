import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const AppToDownload = () => {
  return (
    <div className='flex-col justify-center items-center w-full mb-24' >   
        <div className='flex justify-center items-center' ><h1 className='text-5xl font-semibold text-center w-[46rem] mb-8' >For Better Experience Download Tomato App</h1></div>
        <div className='flex justify-center items-center' >
            <img src={assets.play_store} className='mr-3 hover:scale-105 duration-100 ' />
            <img src={assets.app_store} className='hover:scale-105 duration-100' />
        </div>
    </div>
  )
}

export default AppToDownload
