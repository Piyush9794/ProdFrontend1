import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Register from './Components/Register';
import MainPage from './Components/MainPage'
import Home from './Components/Home'
import Login from './Components/Login'
import NavBar from './Components/NavBar'; // NavBar import karo
import AddProduct from './Components/AddProduct';
import ViewProducts from './Components/ViewProducts';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'

function App() {
  return (
    <>
     <ToastContainer position="top-center" autoClose={2000} theme="colored" />
      <AuthProvider >
        <HashRouter>
          <NavBar /> {/* NavBar ko routes ke upar add karo */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/AddProduct' element={<AddProduct/>} />
            <Route path='/ViewProducts' element={<ViewProducts/>} />
            <Route path='/Register' element={<Register />} />
            <Route path='/MainPage' element={<MainPage />} />
            <Route path='/Login' element={<Login />} />
          </Routes>
        </HashRouter>
      </AuthProvider>
    </>
  )
}

export default App