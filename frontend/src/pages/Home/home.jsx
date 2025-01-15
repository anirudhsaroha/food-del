import React from 'react'
import Header from '../../components/header'
import ExploreMenu from '../../components/exploremenu'
import FoodDisplay from '../../components/fooddisplay'
import AppToDownload from '../../components/apptodownload'


const Home = () => {
  return (
    <div>
      <Header/>
      <ExploreMenu/>
      <FoodDisplay/>
      <AppToDownload/>
    </div>
  )
}

export default Home
