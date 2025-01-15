import React from 'react'
import { useFood } from '../context'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CardTotal = () => {

    const { total , active } = useFood();

  return (
    <div className={`${total === 0 ? 'hidden' : '' } w-full mr-40 mb-10`} >
      <div><h1 className='text-4xl font-bold mb-7' >Cart Totals</h1></div>
      <div className='w-full flex justify-between items-center mb-5' >
        <div className='text-slate-600' >Subtotal</div>
        <div>{total}</div>
      </div>
      <div className='border border-slate-300 w-full mb-5' ></div>
      <div className='w-full flex justify-between items-center mb-5' >
        <div className='text-slate-600' >Deliery Fee</div>
        <div>2</div>
      </div>
      <div className='border border-slate-300 w-full mb-5' ></div>
      <div className='w-full flex justify-between items-center mb-10' >
        <div className='text-slate-600' >Total</div>
        <div>{2+total}</div>
      </div>
      <motion.div
      whileHover={{
        scale: 1.02, // Scale up the link when hovered
        transition: { type: 'spring', stiffness: 200, damping: 30 },
      }}
      whileTap={{
        scale: 0.95, // Shrink the link slightly when clicked
        transition: { type: 'spring', stiffness: 200, damping: 30 },
      }}
    >
      <Link
        to="/order"
        className="bg-orange-500 text-white p-5 font-bold rounded-xl block text-center"
      >
        PROCEED TO CHECKOUT
      </Link>
    </motion.div>
    </div>
  )
}

export default CardTotal
