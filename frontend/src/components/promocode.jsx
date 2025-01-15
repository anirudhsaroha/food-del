import React, { useEffect, useState } from 'react';
import { useFood } from '../context';

const PromoCode = () => {
  const { total , setTotal, active , setActive  , notify } = useFood();
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (code === 'ANIRUDHISTHEBEST') {
      // Apply discount based on the total price
      if (active === 0) {  // Check if no discount is already applied
        if (total <= 10) {
          const newTotal = total - 5;
          setTotal(newTotal > 0 ? newTotal : 0);  // Prevent total from going negative
          setActive(5); // Set discount applied to 5
          notify('Hurrrrayyy !! You have got an additional discount of $5', 'info');
        } else {
          const newTotal = total - 10;
          setTotal(newTotal > 0 ? newTotal : 0);  // Prevent total from going negative
          setActive(10);  // Set discount applied to 10
          notify('Hurrrrayyy !! You have got an additional discount of $10', 'info');
        }
      }
    } else if (code !== 'ANIRUDHISTHEBEST' && active !== 0) {
      const newTotal = total + active;
      setTotal(newTotal);  // Add back the discount amount
      setActive(0);  // Reset active discount
      setCode("");  // Clear the coupon code input
      notify('No such Coupon exists', 'info');
    }
    else if( code !== 'ANIRUDHISTHEBEST' ){
      notify('Invalid Code', 'info');
    }
  };
  

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  useEffect( () => {
    if( active ) setCode("ANIRUDHISTHEBEST")
  }, [] )

  return (
    <div className={`${total === 0 ? 'hidden' : 'block'} w-full mb-10`}>
      <div>If you have a promo code, Enter it here</div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="promo code"
          value={code}
          onChange={handleChange}
          className="p-2 bg-gray-200 w-80 focus:outline-none text-slate-600"
        />
        <button className="p-2 bg-black text-white font-semibold w-36">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PromoCode;
