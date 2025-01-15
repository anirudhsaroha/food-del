import { Routes , Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home/home"
import Footer from "./components/footer";
import Login from './pages/Authentication/authentication'
import Cart from "./pages/Cart/cart";
import Order from "./pages/PlaceOrder/order"
import MyOrders from "./pages/Orders/myorders"
import { ToastContainer , Bounce } from 'react-toastify';
import FindSearch from "./pages/Search/search";
import { useFood } from "./context";


function App() {

  return (
    <>
        <Navbar/>
      <div className="w-screen pl-4 pr-4 md:pl-6 md:pr-6 lg:pl-18 lg:pr-8  overflow-x-hidden">
        <div className="mb-5" ></div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/order" element={ <Order/>} />
          <Route path="/viewOrder" element={<MyOrders/>} />
          <Route path="/search" element={<FindSearch/>} />
        </Routes>
      </div>
      <Footer/>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={3}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}

export default App;
