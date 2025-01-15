import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar"
import Add from './pages/add'
import Order from './pages/order'
import List from './pages/list'

function App() {
  return (
      <div className='w-screen min-h-screen' >
        <Navbar/>
        <div className='flex w-full' >
          <Sidebar/>
          <Routes>
              <Route path="/" element={<Add/>} />
              <Route path="/add" element={<Add/>} />
              <Route path="/order" element={<Order/>} />
              <Route path="/list" element={<List/>} />
          </Routes>
        </div>
    </div>
  );
}

export default App;
