import React from 'react'
import HorizontalScrollCard from './horizontalscrollcard'

const ExploreMenu = () => {
  return (
    <div>
      <div className='mb-3' ><h1 className='text-4xl font-semibold' >Explore our menu</h1></div>
      <div className='mb-5' >
        <div className=' text-xs md:text-base w-[100%] md:w-[44rem]' >Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</div>
      </div>
      <HorizontalScrollCard/>
      <div className='border border-slate-400 mb-10' ></div>
    </div>
  )
}

export default ExploreMenu