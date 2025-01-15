import React from 'react';
import { motion } from "framer-motion";
import { assets } from '../assets/frontend_assets/assets'

const Header = () => {

  const handleClick = () => {
      window.scrollTo({
        top: window.scrollY + 680, 
        behavior: "smooth",
      });
  }

  return (
    <div className='mb-5' >
        <div className='relative' >
          <img src={assets.header_img} alt="header" />
          <div className='absolute top-1/4 left-10' >
            <div className='mb-2 md:mb-1' >
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 100, // Softer, more fluid motion
                  damping: 30,    // Slightly less bounce for smoothness
                }}
                className='text-white text-xl md:text-3xl w-48 md:w-72 lg:w-[34rem] lg:text-5xl font-bold'
              >
                Order your favourite food here
              </motion.div>
            </div>
            <div className='hidden md:block mb-3' >
              <motion.div 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 120, // Softer, gentle spring
                  damping: 30,    // Less bounce for calm effect
                }} 
                className='text-white text-xs lg:text-base' 
              >
                Choose from a diverse menu featuring a delectable array of dishes crafted with the finest
              </motion.div>
              <motion.div 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 30,
                }} 
                className='text-white text-xs lg:text-base'>
                ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your
              </motion.div>
              <motion.div 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 30,
                }} 
                className='text-white text-xs lg:text-base'>
                dining experience, one delicious meal at a time.
              </motion.div>
            </div>
            <motion.button
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 120, // Softer stiffness for smoother motion
                damping: 25,    // Reduced damping for more natural movement
              }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#f0f0f0", // Lighter hover background
                transition: { type: "spring", stiffness: 200, damping: 30 }, // Smooth scaling
              }}
              whileTap={{
                scale: 0.95, // Gentle tap effect
                transition: { type: "spring", stiffness: 150, damping: 20 }
              }} 
              onClick={handleClick} 
              className='w-24 md:w-28 p-2 lg:p-4 lg:w-36 hover:bg-slate-200 rounded-3xl bg-white text-xs md:text-base text-slate-700'
            >
              View Menu
            </motion.button>
          </div>
        </div>
    </div>
  );
}

export default Header;
