import React, { useEffect, useState } from 'react';
import Logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../features/hook';
import { resetSearchResults, searchMovies } from '../features/movies.slice';
import { MdLocalMovies } from 'react-icons/md';
import formatTime from '../utils/format.time.ts'

const Navbar: React.FC = () => {
  const token: string | null = localStorage.getItem("imdb_token")
  const [search, setSearch] = useState<string>('')
  const dispatch: AppDispatch = useDispatch()
  const {searchMovie, searchloading, searchError} = useAppSelector((state) => state.movies)

  const handleLogOut = () => {
    localStorage.removeItem("imdb_token")
    window.location.href = '/'
  }

  useEffect(() => {
    if (search.trim()) {
        dispatch(searchMovies({ search }))
    } else {
      dispatch(resetSearchResults())
    }
  }, [search])

  return (
    <>
      <nav className="w-full p-4 flex items-center justify-center gap-4 md:gap-8 bg-[#121212] text-white">
        <Link to="/"><img src={Logo} className="w-16 h-7 md:h-8" alt="logo" /></Link>
        <input 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          type="text" 
          placeholder="Search..." 
          className="px-4 w-full md:max-w-lg py-1 bg-gray-100 text-black outline-none rounded-md"
        />
        {token ?
          <p onClick={handleLogOut} className='text-sm md:text-base px-2 md:px-3 py-1 bg-red-600 text-white rounded-md transition duration-300 cursor-pointer whitespace-nowrap'>Log out</p>
        : <Link to='/register' className='text-sm md:text-base px-2 md:px-3 py-1 hover:bg-gray-800 rounded-md transition duration-300 whitespace-nowrap'>Sign In</Link>}
      </nav>
      <div className="flex flex-col items-center relative z-50 mx-2 md:mx-0">
        {searchError && (
            <div className="absolute z-50 text-white bg-gray-800 w-full md:max-w-xl p-4 rounded-md mt-2 shadow-lg">
                <p className="text-white text-center text-lg font-semibold">{searchError}</p>
            </div>
        )}
        {searchMovie.length > 0 && !searchError && (
            <div className={`absolute z-50 text-white bg-gray-800 w-full md:max-w-xl p-4 rounded-md mt-2 shadow-lg h-fit max-h-[300px] overflow-y-auto ${searchloading && "opacity-30"}`}>
                <h3 className="text-lg font-bold mb-2">Search Results:</h3>
                <ul className='flex flex-col gap-3'>
                    {searchMovie.map((movie, idx) => (
                        <a href={movie.link} target="_blank" rel="noopener noreferrer" key={movie.id} className="bg-gray-700 rounded-md p-2">
                            <h3 className="text-lg font-semibold">{idx + 1}. {movie.name}</h3>
                            <div className="flex items-center gap-2 justify-end my-2 text-yellow-500 text-sm">
                                <p className='line-clamp-1'>{movie.genre}</p>
                                <span className="mx-2">|</span>
                                <div className="flex items-center gap-1">
                                    <span>⭐</span>
                                    <span className="font-bold">{movie.rating}</span>
                                </div>
                                <span className="mx-2">|</span>
                                <div className="flex items-center gap-1 whitespace-nowrap">
                                    <MdLocalMovies />
                                    <span>{formatTime(movie.runtime)}</span>
                                </div>
                            </div>
                            <div className='text-gray-300 text-sm'>
                              <p className='line-clamp-2'><span className="font-bold text-[15px] text-yellow-500">Plot:</span> {movie.plot}</p>
                              <p><span className="font-bold text-[15px] text-yellow-500">Stars:</span> {movie.stars.replace(/[\[\]']/g, '')}</p>
                            </div>
                        </a>
                    ))}
                </ul>
            </div>
        )}
      </div>
    </>
  );
}

export default Navbar