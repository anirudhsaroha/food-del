import React, { useState } from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { Link } from 'react-router-dom';
import { useFood } from '../context';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Navbar = () => {
  const [active, setActive] = useState("home");
  const { show, token, logoutUser , setSearchedFood , url } = useFood();
  const [visible, setVisible] = useState(false);
  const [ search ,setSearch ] = useState("");

  const handleActiveChange = (section) => {
    setActive(section);
    if (section === "contact") {
      window.scrollTo({
        top: window.scrollY + 6000, 
        behavior: "smooth",
      });
    }
  };

  const handleChange = async (e) => {
    const searchTerm = e.target.value;
    if( searchTerm === "" ){
      setSearchedFood([]);
      setSearch("");
    }
    else{
      setSearch(searchTerm); 
  
      const response = await axios.post(`${url}/api/food/get`, { word: searchTerm });
    
      setSearchedFood(response.data.data);
    }

  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleClick = () => {
    logoutUser();
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 sm:px-8 sm:py-5">
      <Link to="/" onClick={() => handleActiveChange("home")}>
        <img className="w-24 sm:w-32" src={assets.logo} alt="Logo" />
        
      </Link>

      <div className="flex gap-3 sm:gap-9 text-slate-700 font-medium">
          <Link
            key="home"
            to="/"
            className={`${
              active === "home" ? "border-b-2 border-slate-700" : ""
            } cursor-pointer duration-100 text-xs sm:text-base`}
            onClick={() => handleActiveChange("home")}
          >
            home
          </Link>
          <Link
            key="orders"
            to={`${token == null ? "/login" : "/viewOrder"}`}
            className={`${
              active === "orders" ? "border-b-2 border-slate-700" : ""
            } cursor-pointer duration-100 text-xs sm:text-base`}
            onClick={() => handleActiveChange("orders")}
          >
            orders
          </Link>
          <div
            key="orders"
            className={`${
              active === "contact" ? "border-b-2 border-slate-700" : ""
            } cursor-pointer duration-100 text-xs sm:text-base`}
            onClick={() => handleActiveChange("contact")}
          >
            contact
          </div>
         

      </div>

      <div className="flex items-center gap-3 sm:gap-8">
        <Link to="/search" onClick={() => setActive("search")}>
          <img className="w-5 sm:w-8" src={assets.search_icon} alt="Search Icon" />
        </Link>

        {active === "search" && (
          <form onSubmit={handleSubmit} >
            <input
              value={search}
              onChange={(e)=> handleChange(e)}
              type="text"
              placeholder="Search..."
              className="border rounded-md p-1 text-xs sm:text-base"
            />
          </form>
        )}

        {active !== "search" && token && (
          <div className="relative flex items-center gap-3">
            <Link to="/cart" onClick={() => handleActiveChange("")} className="relative">
              <div
                className={`${
                  show ? "absolute" : "hidden"
                } bg-orange-400 rounded-full h-2 w-2 sm:h-3 sm:w-3 bottom-0 right-0`}
              ></div>
              <img src={assets.bag_icon} className="w-5 sm:w-8" alt="Bag Icon" />
            </Link>

            <div onClick={() => setVisible(!visible)} className="cursor-pointer">
              <img src={assets.profile_icon} className="w-5 sm:w-8" alt="Profile Icon" />
            </div>

            {visible && (
              <div className="absolute z-50 flex flex-row items-center top-12 p-2 right-0 rounded-lg bg-orange-300 border border-black">
                <Link
                  to="/viewOrder"
                  className="mr-2 text-center border-2 border-slate-700 rounded-3xl sm:w-20 w-16 text-xs sm:text-base hover:bg-slate-400 duration-100"
                >
                  Orders
                </Link>
                <div
                  onClick={handleClick}
                  className="text-center border-2 border-slate-700 rounded-3xl sm:w-20 w-16 text-xs sm:text-base hover:bg-slate-400 duration-100 cursor-pointer"
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        )}

        {!token && active !== "search" && (
          <Link
            to="/login"
            className="border-2 text-center w-16 sm:w-20 border-slate-700 rounded-3xl text-xs sm:text-base hover:bg-slate-400 duration-100"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
