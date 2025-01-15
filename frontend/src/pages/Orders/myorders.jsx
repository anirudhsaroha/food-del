import React, { useEffect, useState } from 'react';
import { useFood } from '../../context';
import axios from 'axios';
import {assets} from '../../assets/frontend_assets/assets'

const MyOrders = () => {
  const { token , url } = useFood();
  const [data, setData] = useState([]); 

  const getOrders = async () => {
    try {
      const result = await axios.post(
        `${url}/api/order/get`,
        {},
        { headers: { token } }
      );
      console.log(result.data.orders);
      setData(result.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotalItems = (items) => {
    return items.reduce((total, product) => total + product.quantity, 0);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-black mb-10">My Orders</h1>

      <div className="mb-10">
        {data.map((item, key) => {
          const totalItems = calculateTotalItems(item.items); 
          return (
            <div
              key={key}
              className="mb-5 border border-gray-300 flex p-5 items-center justify-between rounded-lg shadow-md"
            >
              <div className="md:w-20 md:h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                <img
                  src={assets.parcel_icon}
                  alt="Order Icon"
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <ul>
                  {item.items.map((product, index) => (
                    <div key={product._id || index} className="mb-1 mr-1">
                      <span className="text-sm md:text-base">{product.name}</span> 
                      <span className='text-sm md:text-base' > x{product.quantity} </span>
                    </div>
                  ))}
                </ul>
              </div>

              <div className="font-semibold text-sm md:text-lg">
                Items: {totalItems}
              </div>

              <div className="font-semibold text-sm md:text-lg">${item.amount}</div>

              <div className="flex items-center gap-2">
                <div className={` ${ item.status == "Food Processing" ? "bg-red-400" : "" } ${ item.status == "Out for Delivery" ? "bg-yellow-400" : "" } ${ item.status == "Delivered" ? "bg-green-400" : "" }  rounded-full h-[0.4rem] w-[0.4rem]`}></div>
                <div className={`${ item.status == "Food Processing" ? "bg-red-200 hover:bg-red-300" : "" } ${ item.status == "Out for Delivery" ? "bg-yellow-200 hover:bg-yellow-300" : "" } ${ item.status == "Delivered" ? "bg-green-200 hover:bg-green-300" : "" }  p-2 text-xs md:text-base lg:text-lg rounded-lg w-20 md:w-36 lg:w-44 flex justify-center items-center `} >{item.status}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
