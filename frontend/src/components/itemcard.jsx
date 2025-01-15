import React from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { useFood } from '../context';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ItemCard = ({ id, name, price, img, des }) => {
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart, token , url  } = useFood();

  const handleChange = (id) => {
    if (!token) {
      navigate('/login');
    } else {
      addToCart(id);
    }
  };

  return (
    <motion.div
      className="shadow-gray-300 shadow-md pb-1 relative"
      initial={{ opacity: 0, y: 50 }}  
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ type: 'spring', stiffness: 150, damping: 25 }} 
      viewport={{ once: true }} 
    >
      <div className="flex flex-row md:flex-col">
        <img
          src={`${url}/images/` + img}
          className="rounded-xl h-[16rem]   w-1/2 md:w-full mb-0 md:mb-4"
          alt="Product"
        />

        <div className="flex flex-col justify-between w-1/2 md:w-full p-4">
          <div className="flex justify-between items-center mb-3">
            <div className="text-xl font-medium">{name}</div>
            <img src={assets.rating_starts} className="w-24 h-4" alt="Rating Stars" />
          </div>
          <div className="text-xs text-slate-500 mb-3">{des}</div>
          <div className="text-xl text-orange-600">${price}</div>

          <motion.div
            className="md:absolute md:top-1/3 md:right-5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 120,
              damping: 30,
            }}
          >
            {!cartItems[id] ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 120,
                  damping: 25,
                }}
              >
                <img
                  src={assets.add_icon_white}
                  onClick={() => handleChange(id)}
                  className="w-10 h-10 mt-4 cursor-pointer"
                  alt="Add Icon"
                  whileHover={{
                    scale: 1.1,
                    transition: { type: 'spring', stiffness: 200, damping: 30 },
                  }}
                  whileTap={{
                    scale: 0.95,
                    transition: { type: 'spring', stiffness: 150, damping: 20 },
                  }}
                />
              </motion.div>
            ) : (
              <motion.div
                className="mt-4 flex items-center bg-white rounded-2xl p-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 120,
                  damping: 30,
                  delay: 0.3,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 120,
                    damping: 30,
                  }}
                >
                  <img
                    src={assets.add_icon_green}
                    onClick={() => addToCart(id)}
                    alt="Add Icon"
                    whileHover={{
                      scale: 1.1,
                      transition: { type: 'spring', stiffness: 200, damping: 30 },
                    }}
                    whileTap={{
                      scale: 0.95,
                      transition: { type: 'spring', stiffness: 150, damping: 20 },
                    }}
                  />
                </motion.div>
                <div className="mx-2">{cartItems[id]}</div>
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 120,
                    damping: 30,
                  }}
                >
                  <img
                    src={assets.remove_icon_red}
                    onClick={() => removeFromCart(id)}
                    alt="Remove Icon"
                    whileHover={{
                      scale: 1.1,
                      transition: { type: 'spring', stiffness: 200, damping: 30 },
                    }}
                    whileTap={{
                      scale: 0.95,
                      transition: { type: 'spring', stiffness: 150, damping: 20 },
                    }}
                  />
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ItemCard;
