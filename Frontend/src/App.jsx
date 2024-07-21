import Login from './pages/login/login';
import Home from './pages/home/home';
import './App.css'
import Signup from './pages/signup/signup';
import { Navigate, Route, Routes } from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';

function App() {
const{authUser}=useAuthContext()
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
			<Routes>
				<Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />}  />
				<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />}/>
				<Route path='/signup' element={authUser ? <Navigate to='/' /> : <Signup />} />
			</Routes>
		<Toaster/>
		</div>
  )
}

export default App
