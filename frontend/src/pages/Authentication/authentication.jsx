import React,{useState} from 'react'
import { assets } from '../../assets/frontend_assets/assets';
import { useFood } from '../../context';

const Login = () => {

  const { loginUser , registerUser } = useFood();
  const [isLogin,setIsLogin] = useState(false);
  const [ email ,setEmail ] = useState('');
  const [ name , setName ] = useState('');
  const [ password , setPassword ] = useState('');

  const handleLogin = () => {
    loginUser( email , password ); 
  };

  const handleRegister = () => {
    registerUser(name , email , password );
  }

  return(
    <div className="bg-bannerImg bg-no-repeat bg-cover mb-5 rounded-2xl bg-bottom w-full flex flex-col items-center justify-center min-h-screen md:py-2">
    <main className="flex items-center w-full px-2 md:px-20">
      <div className="hidden md:inline-flex flex-col flex-1 space-y-1">
        <p className="text-6xl text-white font-black">Tomato</p>
        <p className="font-semibold text-md leading-1 text-white">
          Explore your interests, meet new friends & expand your horizons
        </p>
      </div>
      <div className={`bg-white rounded-2xl shadow-2xl flex flex-col w-full md:w-1/2 items-center max-w-5xl transition duration-1000 ease-out`}>
        <h2 className="p-3 text-3xl font-bold text-[#F26B0F]">Tomato</h2>
        <div className="inline-block border-[1px] justify-center w-20 border-[#F26B0F] border-solid"></div>
        <h3 className="text-xl font-semibold text-[#F26B0F] pt-2">
          {isLogin ? 'Sign In!' : 'Create Account!'}
        </h3>
        <div className="flex flex-col items-center w-full p-2 justify-center">
          {!isLogin && (
            <input
              type="text"
              className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-[#F26B0F]  m-1"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-[#F26B0F] m-1"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-[#F26B0F] m-1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={isLogin ? handleLogin : handleRegister}
            className="rounded-2xl m-2 text-white bg-[#F26B0F] w-2/5 px-4 py-2 shadow-md hover:text-[#F26B0F] hover:bg-white transition duration-200 ease-in"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
        <div className="inline-block border-[1px] justify-center w-20 border-[#F26B0F] border-solid"></div>
        <p className="mt-4 text-sm">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
        </p>
        <p
          className="text-[#F26B0F] mb-4 text-sm font-medium cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Create a New Account?' : 'Sign In to your Account?'}
        </p>
      </div>
    </main>
  </div>
  );
};

export default Login;