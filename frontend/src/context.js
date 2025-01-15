import React, { createContext, useContext, useEffect, useState } from "react";
import { food_list } from "./assets/frontend_assets/assets";
import axios from "axios";
import { toast , Bounce } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [food, setFood] = useState("All");
  const [cartItems, setCartItems] = useState({});
  const [total, setTotal] = useState(0);
  const [show, setShow] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [foodList, setFoodList] = useState([]);
  const [ active , setActive ] = useState(0);
  const [ searchedFood , setSearchedFood ] = useState([]);
  const navigate = useNavigate();
  const url = "http://localhost:4000"

  const notify = (message, type) => {
    const toastOptions = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      transition: Bounce,
      style: {
        color: "#FFD700",
      },
      progressStyle: {
        height: "5px",
      },
    };
  
    if (type === "success") {
      toastOptions.style.backgroundColor = "#228B22";
      toastOptions.progressStyle.background = "#FF6347";
      toast.success(message, toastOptions);
    } else if (type === "error") {
      toastOptions.style.backgroundColor = "#FF6347";
      toastOptions.progressStyle.background = "#228B22";
      toast.error(message, toastOptions);
    } else if (type === "info") {
      toastOptions.style.backgroundColor = "#1E90FF";  
      toastOptions.progressStyle.background = "#4682B4";  
      toast.info(message, toastOptions);
    }
  };
  

  const addToCart = async (id) => {
    if( token ){
      await axios.post(`${url}/api/cart/add` , {id} , {headers: {token}});
      await loadCart(localStorage.getItem("token") );
    }
  };

  const emptyCart = async () =>{
    if( token ){
      await axios.post(`${url}/api/cart/empty` , {} , {headers: {token}} );
      await loadCart(localStorage.getItem("token") );
    }
  }

  const removeFromCart = async (id) => {
    if( token ){
      await axios.post(`${url}/api/cart/remove` , {id} , {headers: {token}});
      await loadCart(localStorage.getItem("token") );
    }
  };

  const loadCart = async (token) => {
    if( token ){
      const result = await axios.post(`${url}/api/cart/get` , {} , {headers: {token}});
      setCartItems(result.data.cartData);
    }
  }

  const subTotal = () => {
    let amount = 0;

    foodList.forEach((food) => {
      if (cartItems[food.id]) {
        amount += food.price * cartItems[food.id];
      }
    });

    setTotal(amount);
    setShow(amount > 0); 
  };

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`${url}api/user/login`, { username: email, password });
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        notify('User logged in Succesfully', 'success');
        navigate('/');
        await loadCart(localStorage.getItem("token") );
      } else {
        console.log("Error with the token");
        notify('Incorrect Password or Email', 'error');
      }
    } catch (error) {
      console.log("Error during login:", error);
      notify('Error while login', 'info');
    }
  };

  const registerUser = async (name, email, password) => {
    try {
      const response = await axios.post(`${url}/api/user/register`, { name, username: email, password });
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        console.log(token);
        console.log(response.data.token);
        navigate('/');
        notify('Registration Successfull', 'success');
      } else {
        notify(response.data.message , 'info');
      }
    } catch (error) {
      console.log("Error during registration:", error);
      notify('Error while registration', 'error');
    }
  };

  const logoutUser = () => {
    setToken(null);
    localStorage.removeItem("token");
    setCartItems({});
    notify('User logged out Succesfully', 'success');
  };

  const fetchFood = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data.rows);
    } catch (error) {
      console.log("Error fetching food data:", error);
    }
  };

  useEffect(() => {
    subTotal();
  }, [cartItems]);

  useEffect(() => {
    async function loadData() {
      await fetchFood();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
      }
      await loadCart(localStorage.getItem("token"));
    }
    loadData();
    console.log("this is the token" + token);
  }, []);

  return (
    <FoodContext.Provider
      value={{
        food,
        setFood,
        addToCart,
        removeFromCart,
        active ,
        setActive,
        cartItems,
        food_list,
        total,
        setTotal,
        show,
        setShow,
        token,
        foodList,
        loginUser,
        registerUser,
        logoutUser,
        emptyCart,
        notify,
        searchedFood,
        setSearchedFood,
        url
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => useContext(FoodContext);
