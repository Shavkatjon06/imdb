import React, { useEffect, useState } from 'react'
import { MdViewList, MdViewModule, MdDownload } from "react-icons/md";
import GridView from '../components/grid.view.tsx';
import DetailedView from '../components/detailed.view.tsx';
import {countType, sortType} from '../interfaces/literals.ts'
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../features/hook.ts';
import { downloadMovies, fetchMovies, resetError } from '../features/movies.slice.ts';
import { AppDispatch } from '../store.ts';


const Home: React.FC = () => {
  const [view, setView] = useState<"detailed" | "grid">("grid")
  const [count, setCount] = useState<countType>(25)
  const [sortBy, setSortBy] = useState<sortType>("Ranking")
  const dispatch: AppDispatch = useDispatch()
  const {movies, loading, error} = useAppSelector((state) => state.movies)

  useEffect(() => {
    dispatch(fetchMovies({count, sortBy}))
  }, [count, sortBy, dispatch])

  const handleDownload = () => {
    dispatch(downloadMovies())
  }

  if (error) {
    setTimeout(() => {
      dispatch(resetError())
    }, 5000)
  }

  return (
    <div className="md:my-6 bg-white w-full max-w-6xl min-h-[calc(100vh-65px)] mx-auto px-4 py-6 md:px-6 lg:px-8">
      <div className="py-6 md:py-10">
        <h2 className="text-xl font-bold mb-2 md:text-2xl">IMDb Charts</h2>
        <h1 className="border-l-4 border-[#F5C518] pl-2 text-3xl font-medium mb-2 md:text-4xl">
          IMDb Top {count} Movies
        </h1>
        <p className="text-gray-600 text-sm md:text-base">Please sign-up to download data.</p>
      </div>
      <div className="flex items-center justify-between text-2xl text-gray-600">
        <MdDownload onClick={handleDownload} className="cursor-pointer hover:text-blue-600" />
        <div className='flex items-center gap-3'>
          <select value={count} onChange={(e) => setCount(Number(e.target.value) as countType)} className="border border-gray-300 rounded-md text-base outline-none">
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={250}>250</option>
            <option value={500}>500</option>
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as sortType)} className="border border-gray-300 rounded-md text-base outline-none">
            <option value="Ranking">Ranking</option>
            <option value="Alphabetical">Alphabetical</option>
            <option value="Number of ratings">Number of ratings</option>
            <option value="Runtime">Runtime</option>
          </select>
          <MdViewList onClick={() => setView("detailed")} className={`cursor-pointer hover:text-blue-600 ${view === "detailed" && "text-blue-600"}`} />
          <MdViewModule onClick={() => setView("grid")} className={`cursor-pointer hover:text-blue-600 ${view === "grid" && "text-blue-600"}`} />
        </div>
      </div>
      {error && <p className='text-red-600 font-semibold text-center mt-3'>{error}</p>}
      {view === "grid" ? <GridView movies={movies} loading={loading} /> : <DetailedView movies={movies} loading={loading} />}
    </div>
  )
}

export default Home