import React, { useState, useEffect } from 'react';
import { SearchX } from 'lucide-react';
import { useFood } from '../../context';
import ItemCard from '../../components/itemcard';

const FinsSearch = () => {
  const { searchedFood } = useFood();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] ">

      {searchedFood.length === 0 ? (
        <div className='flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] ' >
          <SearchX className="w-16 h-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">No items found</h2>
          <p className="text-gray-500">Try adjusting your search to find what you're looking for.</p>
        </div>
      ) : (
        <>
          <div className='text-gray-400 mb-2' >{searchedFood.length} results found</div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5' >
          {
            searchedFood.map((food_ , index ) => {
              return(
                <div key={index} className='' >
                    <ItemCard id={food_.id} name={food_.name} price={food_.price} img={food_.image} des={food_.description} cat={food_.category} />
                </div>
              )  
            })
          }
          </div>
        </>
      
      )}

  
    </div>
  );
};

export default FinsSearch;
