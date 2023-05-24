import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './pages/layout/Layout';

const App = () => {
  return (
    <BrowserRouter>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/dashboard" element={<Layout />} />
       </Routes>
       <ToastContainer />
    </BrowserRouter>
    
  )
}

export default App