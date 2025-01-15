import React from 'react'
import { assets } from '../assets/admin_assets/assets'
import {Link} from 'react-router-dom'
import { useState } from 'react'

const Sidebar = () => {

  const [ select , setSelect ] = useState(0); 

  return (
    <div className='w-[25%]  border border-r relative border-b-white border-t-white border-l-white min-h-screen' > 
      <Link to='/add' onClick={()=> setSelect(0)} className={` ${select === 0 ? 'bg-orange-100' : ''} absolute right-0 top-[5rem] flex w-28 md:w-56 border-b-2 border-l-2 border-t-2 p-2 md:p-5 justify-start gap-5 items-center`} >
        <img src={assets.order_icon} alt='' />
        <div>Add Items</div>
      </Link>
      <Link to='/list' onClick={()=> setSelect(1)} className={` ${select === 1 ? 'bg-orange-100' : ''} absolute right-0 top-[15rem] flex w-28 md:w-56 border-b-2 border-l-2 border-t-2 p-2 md:p-5 justify-start gap-5 items-center`} >
        <img src={assets.order_icon} alt='' />
        <div>List Items</div>
      </Link>
      <Link to='/order' onClick={()=> setSelect(2)} className={` ${select === 2 ? 'bg-orange-100' : ''} absolute right-0 top-[25rem] flex w-28 md:w-56 border-b-2 border-l-2 border-t-2 p-2 md:p-5 justify-start gap-5 items-center`} >
        <img src={assets.order_icon} alt='order' />
        <div>Orders</div>
      </Link>
    </div>
  )
}

export default Sidebar