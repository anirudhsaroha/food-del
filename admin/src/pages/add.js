import React, { useState } from 'react';
import { assets } from '../assets/admin_assets/assets';
import { ToastContainer, toast , Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Add = () => {
  const [image, setImage] = useState(); 
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const notifySuccess = () => toast.success('Item added Successfully', {
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

const notifyFailure = () => toast.error('Error while Adding', {
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

const notifyFields = () => toast.info('All fields are required, including an image', {
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

  const handleAdd = async () => {
    if (name && description && category && price && image) {
      
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('price', price);
      formData.append('image', image);

      try {
        const response = await axios.post('http://localhost:4000/api/food/add', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', 
          },
        });
        setPrice('');
        setName('');
        setDescription('');
        setImage();
        setCategory('');
        notifySuccess();
      } catch (error) {
        notifyFailure();
        console.error('Error uploading data:', error);
      }
    } else {
        notifyFields();
    }
  };

  return (
    <div className='pt-5 w-[75%] pl-1 md:pl-3 md:pr-3 pr-1 lg:pl-5 lg:pr-5'>
      <div className='text-lg mb-1'>Upload Image</div>
      {image && <img src={image?URL.createObjectURL(image):assets.upload_area} className='mb-1 w-32 h-20' alt='upload_area' />}
      <input type='file' className='mb-4 text-white' onChange={handleImageUpload} />
      
      <div className='text-lg mb-1'>Product Name</div>
      <input 
        placeholder='Type here' 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        className='focus:outline-none border w-1/2 mb-4 h-10 p-3 border-black' 
      />

      <div className='text-lg mb-1'>Product Description</div>
      <textarea 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder='Write content here' 
        className='focus:outline-none border w-1/2 border-black h-28 p-3 mb-4' 
      />

      <div className='flex justify-start items-center w-1/2 gap-8 mb-4'>
        <div>
          <div className='mb-1 h-16 flex justify-center items-center'>Product Category</div>
          <select 
            className='focus:outline-none border w-32 flex justify-center items-center p-3 border-black' 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Category</option>
            <option>Salad</option>
            <option>Rolls</option>
            <option>Deserts</option>
            <option>Sandwich</option>
            <option>Cake</option>
            <option>Pure Veg</option>
            <option>Pasta</option>
            <option>Noodles</option>
            <option>Burger</option>
            <option>Pizza</option>
          </select>
        </div>
        <div>
          <div className='mb-1 h-16 flex justify-center items-center'>Product Price</div>
          <input 
            placeholder='$20' 
            className='focus:outline-none border w-32 flex justify-center items-center p-3 border-black' 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
          />
        </div>
      </div>

      <button 
        className='border mb-5 border-black w-32 p-2 bg-black text-white hover:bg-blue-950' 
        onClick={handleAdd}
      >
        Add
      </button>


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

export default Add;
