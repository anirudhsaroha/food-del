import React, { useState } from 'react';
import { menu_list } from '../assets/frontend_assets/assets';
import { useFood } from '../context';

const HorizontalScrollCard = () => {

    const { food, setFood } = useFood();
    const [ active , setActive ] = useState();

    const handleClick = (index , name) => {
        if( index === active ){
            setActive(-1);
            setFood("All");
            console.log(food);
        }
        else{
            setActive(index);
            setFood(name);
            console.log(food);
        }
    }

    return (
        <div className='flex justify-between gap-5 items-center overflow-x-scroll scrollbar-hide px-5 mb-10'>
        {menu_list.map((menu, index) => (
            <div key={index} onClick={() => handleClick(index,menu.menu_name)} className='shrink-0'>
            <img src={menu.menu_image} alt={menu.menu_name} className={`mb-3 ${active === index ? 'border-4 border-orange-500 rounded-full ' : '' } w-full h-28 rounded-full md:h-32 lg:h-36 `} />
            <div className='text-center text-slate-700 font-semibold'>{menu.menu_name}</div>
            </div>
        ))}
        </div>
    );
    }

export default HorizontalScrollCard;
