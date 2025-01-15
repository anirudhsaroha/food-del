import React, { useEffect, useState } from 'react'
import { ToastContainer, toast , Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const List = () => {

  const notifySuccess = () => toast.success('Item removed Succesfully', {
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

  const notifyFailure = () => toast.error('Error while Removing', {
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

  const [ list , setList ] = useState([]);

  const fetchList = async () => {
    try{
      const result = await axios.get('http://localhost:4000/api/food/list');
      setList(result.data.data.rows);
    }
    catch(error){
      console.log(error);
    }
  }

  const handleClick = async (foodId) => {
    console.log(foodId);
    try{
      await axios.delete('http://localhost:4000/api/food/remove', {
        data: { id: foodId },
      });
      await fetchList();
      notifySuccess();
    }
    catch(error){
      console.log(error);
      notifyFailure();
    }
  }

  useEffect( () => {
    fetchList();
  }, [] );

  return (
    <div className='pl-1 md:pl-3 md:pr-3 pr-1 lg:pl-5 lg:pr-5 w-[75%]' >
      <h1 className='text-2xl' >All Food List</h1>
      <div className='border border-gray-300 w-full' >

        <div className='p-2 border-b'>
          <div className='flex w-full items-center justify-between' >
            <div className='flex gap-20' >
              <div className='hidden md:block' >Image</div>
              <div>Name</div>
            </div>
            <div>Category</div>
            <div>Price</div>
            <div>Action</div>
          </div>
        </div>

        <div className='p-2 border-b'>
          <div className='flex-row w-full items-center justify-between' >
            {
              list.map((item,size) => {
                return (
                  <div key={size} className='mb-3 flex items-center justify-between' >
                      <div className='flex gap-10 items-center ' >
                        <img className='h-16 w-20 hidden md:block ' src={'http://localhost:4000/images/' + item.image} />
                        <div className='w-24 capitalize text-sm' >{item.name}</div>
                      </div>
                      <div className='w-10' >{item.category}</div>
                      <div>{item.price}</div>
                      <div onClick={() => handleClick(item.id)} >X</div>
                  </div>
                )
              })
            }
          </div>
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
  )
}

export default List
