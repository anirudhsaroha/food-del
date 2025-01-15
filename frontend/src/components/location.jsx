import React, { useState } from 'react';
import { useFood } from '../context';
import { food_list } from '../assets/frontend_assets/assets';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PromoCode from './promocode';
import { motion } from 'framer-motion';

const Location = () => {
  const navigate = useNavigate();
  const [ method , setMethod ] = useState('none');
  
  const handleClick = () => {
    if( method === 'none' ) setMethod('COD');
    else setMethod('none');
  }
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pin: '',
    country: '',
    phone: '',
  });

  const { cartItems, emptyCart , total , setTotal , setActive , url ,  token , active , notify } = useFood();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const field in formData) {
      if (!formData[field]) {
        notify(`Please fill in the ${field} field` , 'info');
        return;
      }
    }

    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item };
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: formData,
      items: orderItems,
      amount: total + 2,
    };

    console.log(orderData);

    try {
      const response = await axios.post(
        `${url}/api/order/place`,
        orderData,
        { headers: { token } }
      );
      notify('You Order has been Placed', 'success');
      setFormData({
        name: '',
        email: '',
        street: '',
        city: '',
        state: '',
        pin: '',
        country: '',
        phone: '',
      });
      navigate("/viewOrder");
      setActive(0);
      setTotal(0);
      emptyCart();
    } catch (error) {
      notify('Error while placing your Order', 'error');
    }
  };


  return (
    <div>
      <div>
        <form>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="p-2 mb-5 focus:outline-none w-full border border-slate-600"
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
            className="p-2 mb-5 focus:outline-none w-full border border-slate-600"
          />
          <input
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Street"
            className="p-2 mb-5 focus:outline-none w-full border border-slate-600"
          />
          <div className="flex mb-5 gap-5">
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="p-2 focus:outline-none w-full border border-slate-600"
            />
            <input
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              className="p-2 focus:outline-none w-full border border-slate-600"
            />
          </div>
          <div className="flex mb-5 gap-5">
            <input
              name="pin"
              value={formData.pin}
              onChange={handleChange}
              placeholder="Pin code"
              className="p-2 focus:outline-none w-full border border-slate-600"
            />
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              className="p-2 focus:outline-none w-full border border-slate-600"
            />
          </div>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="p-2 mb-10 focus:outline-none w-full border border-slate-600"
          />
        </form>
      </div>

      <PromoCode/>

      <div className={`${total === 0 ? 'hidden' : '' } w-full mr-40 mb-10`} >
      <div><h1 className='text-4xl font-bold mb-7' >Cart Totals</h1></div>
      <div className='w-full flex justify-between items-center mb-5' >
        <div className='text-slate-600' >Subtotal</div>
        <div>{total+active}</div>
      </div>
      <div className='border border-slate-300 w-full mb-5' ></div>
      <div className='w-full flex justify-between items-center mb-5' >
        <div className='text-slate-600' >Code Discount</div>
        <div>-{active}</div>
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
        <form className='flex justify-start gap-8 items-center' onSubmit={handleSubmit}>
        <motion.button
      type="submit"
      className={`${ method === 'none' ? 'bg-gray-200 text-black' : 'bg-orange-500 text-white' } p-5 font-bold rounded-xl`}
      whileHover={{
        scale: 1.05, // Scale up the button when hovered
        transition: { type: 'spring', stiffness: 200, damping: 30 },
      }}
      whileTap={{
        scale: 0.95, // Shrink the button slightly when clicked
        transition: { type: 'spring', stiffness: 200, damping: 30 },
      }}
    >
      PROCEED TO PAYMENT
    </motion.button>
    <div className="mt-4 flex items-center gap-2">
    <input
      type="checkbox"
      id="cod"
      className="w-6 h-6 accent-orange-500 cursor-pointer"
      onClick={handleClick}
    />
    <label htmlFor="cod" className="text-gray-700 font-medium cursor-pointer">
             Cash on Delivery
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Location;
