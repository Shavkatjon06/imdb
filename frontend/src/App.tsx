import React from 'react'
import Navbar from './components/navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Register from './pages/register'
import Login from './pages/login'

const App: React.FC = () => {
  return (
    <div className='bg-black w-full min-h-screen'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </div>
  )
}

export default App