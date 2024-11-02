import React from 'react';
import Logo from '../images/logo.png';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const token: string | null = localStorage.getItem("imdb_token")

  const handleLogOut = () => {
    localStorage.removeItem("imdb_token")
    window.location.href = '/'
  }

  return (
    <nav className="p-4 flex items-center justify-center gap-4 md:gap-8 bg-[#121212] text-white">
      <Link to="/"><img src={Logo} className="w-16 h-8" alt="logo" /></Link>
      <input 
        type="text" 
        placeholder="Search..." 
        className="w-full max-w-md px-4 py-1 rounded-md bg-white text-black outline-none" 
      />
      {token ?
        <p onClick={handleLogOut} className='text-sm md:text-base px-2 md:px-4 py-1 hover:bg-gray-800 rounded-md transition duration-300 cursor-pointer whitespace-nowrap'>Log out</p>
      : <Link to='/register' className='text-sm md:text-base px-2 md:px-4 py-1 hover:bg-gray-800 rounded-md transition duration-300 whitespace-nowrap'>Sign In</Link>}
    </nav>
  );
}

export default Navbar