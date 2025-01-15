import React from 'react'
import ItemCard from './itemcard'
import { useFood } from '../context'

const FoodDisplay = () => {

    const { food , foodList } = useFood();

  return (
    <div className='mb-24' >
        <div className='mb-5' ><h1 className='font-semibold text-4xl' >Top dishes near you</h1></div>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6' >
        {
        foodList.map((food_ , index) => {
                if( food_.category === food || food === "All" ){
                    return(
                        <div key={index} className='hover:scale-105 duration-75 ' >
                            <ItemCard id={food_.id} name={food_.name} price={food_.price} img={food_.image} des={food_.description} cat={food_.category} />
                        </div>
                    )               
                }
            })
        }    
        </div> 
    </div>
  )
}

export default FoodDisplay
