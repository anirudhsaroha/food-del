import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast , Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { assets } from '../assets/frontend_assets/assets';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getOrders = async () => {
    try {
      const result = await axios.get("http://localhost:4000/api/order/getOrder");
      console.log(result.data.orders);
      setOrders(result.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const notifySuccess = () => toast.success('Status updated Succesfully', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    transition: Bounce,
    style: {
      backgroundColor: "#228B22", 
      color: "#FFD700",         
    },
    progressStyle: {
      background: "#FF6347",     
      height: "5px",             
    },
  });

  const notifyFailure = () => toast.error('Error while changing Status', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    transition: Bounce,
    style: {
      backgroundColor: "#FF6347", 
      color: "#FFD700",         
    },
    progressStyle: {
      background: "#228B22",     
      height: "5px",             
    },
  });

  const calculateTotalItems = (items) => {
    return items.reduce((total, product) => total + product.quantity, 0);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);

    try{
      const response = await axios.patch(
        "http://localhost:4000/api/order/update",
        { orderId, newStatus }, 
      );
      notifySuccess();
    }
    catch(error){
      notifyFailure();
      console.log(error);
    }

  };

  const toggleDropdown = (orderId) => {
    setSelectedOrder(selectedOrder === orderId ? null : orderId);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="pt-5 pl-1 md:pl-3 md:pr-3 pr-1 lg:pl-5 lg:pr-5 w-[75%]">
      <div className="text-2xl">Orders</div>
      <div>
        <div className="mb-10">
          {orders.map((item, key) => {
            const totalItems = calculateTotalItems(item.items);

            return (
              <div
                key={key}
                className="mb-5 border border-gray-300 flex p-1 md:p-3 lg:p-5 items-center justify-between rounded-lg shadow-md"
              >
                <div className="w-20 h-20 bg-gray-200 hidden  rounded-lg lg:flex lg:tems-center lg:justify-center">
                  <img
                    src={assets.parcel_icon}
                    alt="Order Icon"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <ul>
                    {item.items.map((product, index) => (
                      <li key={product._id || index} className="mb-1">
                        <span className="font-medium text-xs md:text-sm lg:text-base ">{product.name} x{product.quantity} </span> 
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-sm text-gray-700">
                  <div className="font-medium text-xs md:text-sm lg:text-base  ">Address:</div>
                  <div className='text-xs md:text-sm lg:text-base ' >{item.address.name}</div>
                  <div className='text-xs md:text-sm lg:text-base ' >{item.address.street}</div>
                  <div className='text-xs md:text-sm lg:text-base ' >
                    {item.address.city}, {item.address.state}, {item.address.pin}
                  </div>
                  <div className='text-xs md:text-sm lg:text-base ' >{item.address.country}</div>
                  <div className='text-xs md:text-sm lg:text-base ' >{item.address.phone}</div>
                </div>

                <div className="font-semibold text-lg hidden lg:block">Items: {totalItems}</div>

                <div className="font-semibold text-xs md:text-sm lg:text-base ">${item.amount}</div>

                <div className="relative">
                  <div className='text-xs text-center font-black ' >{item.status}</div>
                  <button
                    className="bg-red-200 hover:bg-red-300 text-sm md:text-base transition flex justify-center items-center  px-1 py-1 md:px-4 md:py-2 rounded-lg"
                    onClick={() => toggleDropdown(item.id)}
                  >
                    Change Status 
                  </button>
                  {selectedOrder === item.id && (
                    <div
                      className="absolute right-1 bg-white border border-gray-300 rounded-lg shadow-lg mt-2 w-40 z-10"
                    >
                      <ul className="text-gray-800">
                        {['Out for Delivery', 'Food Processing', 'Delivered'].map(
                          (status) => (
                            <li
                              key={status}
                              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                              onClick={() => handleStatusChange(item.id, status)}
                            >
                              {status}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>
      <ToastContainer position="top-right "
        autoClose={5000}
        limit={3}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="colored"
        transition={Bounce} />
    </div>
  );
};

export default Order;
