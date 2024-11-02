import React from 'react'
import Movies from '../interfaces/movies'
import { MdLocalMovies } from 'react-icons/md';

const GridView: React.FC<{movies: Movies[]; loading: boolean}> = ({movies, loading}) => {
  
  const formatTime = (time: string): string => {
    const formattedTime: number = Number(time.slice(0,-4))
    const result: string = Math.floor(formattedTime / 60) + 'h ' + formattedTime % 60 + 'min'
    return result
  }

  return (
    <div className="border rounded p-3 mt-5 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies && movies.map((movie, idx: number) => (
          <div key={movie.id} className={`flex flex-col justify-between border p-4 rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition ${loading && "opacity-50"}`}>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{idx+1}. {movie.name}</h3>
            <div className="flex items-center gap-2 justify-between mb-2 text-yellow-500">
              <div className='flex items-center gap-1'>
                <span>⭐</span>
                <span className="text-md font-bold">{movie.rating}</span>
              </div>
              <div className='flex items-center gap-1'>
                <MdLocalMovies/>
                <span className="text-gray-500 text-sm">{formatTime(movie.runtime)}</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-2"><span className='font-medium'>Genre:</span> {movie.genre}</p>
            <p className="text-gray-700 text-xs mb-4 line-clamp-4">{movie.plot}</p>
            <a href={movie.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">
              More on IMDb
            </a>
          </div>
        ))}
    </div>
  )
}

export default GridView