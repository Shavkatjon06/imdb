import React from 'react'
import Movies from '../interfaces/movies'
import formatTime from '../utils/format.time.ts'

const DetailedView: React.FC<{movies: Movies[]; loading: boolean}> = ({movies, loading}) => {
  
  return (
    <div className='border rounded p-5 mt-5'>
        {movies && movies.map((movie, idx: number) => (
        <div key={movie.id} className={`mb-8 ${movie.id < movies.length && 'border-b pb-4'} ${loading && "opacity-50"}`}>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{idx+1}. {movie.name}</h1>
            <div className="flex items-center text-yellow-500 mb-3">
            <span className="text-xl font-semibold">{movie.rating} ⭐</span>
            <span className="mx-2">|</span>
            <span className="text-gray-600">{formatTime(movie.runtime)}</span>
            <span className="mx-2">|</span>
            <span className="text-gray-600">{movie.votes.toLocaleString()} votes</span>
            </div>
            <p className="text-gray-700 mb-1"><span className="font-bold">Genre:</span> {movie.genre}</p>
            <p className="text-gray-700 mb-1"><span className="font-bold">Plot:</span> {movie.plot}</p>
            <p className="text-gray-700 mb-1"><span className="font-bold">Directors:</span> {movie.directors.replace(/[\[\]']/g, '')}</p>
            <p className="text-gray-700 mb-4"><span className="font-bold">Stars:</span> {movie.stars.replace(/[\[\]']/g, '')}</p>
            <a href={movie.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold transition duration-200">
            More on IMDb
            </a>
        </div>
        ))}
    </div>
  )
}

export default DetailedView