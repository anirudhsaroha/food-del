import React from 'react'
import CartItems from '../../components/cartitems' 
import CardTotal from '../../components/cardtotal'
import PromoCode from '../../components/promocode'

const Cart = () => {
  return (
    <div>
        <CartItems/>
        <div className='w-full mb-10' >
          <CardTotal/>  
        </div>
    </div>
  )
}

export default Cart
