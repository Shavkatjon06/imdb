import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const handleLogin = async () => {
    setLoading(true)
    setError("")
    try {
      const response = await axios.post("http://localhost:5000/login", {email, password})
      if (response.data.success) {
        localStorage.setItem('imdb_token', response.data.imdb_token)
        window.location.href = '/'
      } else {
        setError(response.data.message)
      }
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setLoading(false)
    }
}

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-black">Log in</h2>
        <div className="mt-6">
          <div className="mb-4">
            <label className="block text-black">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-700 rounded-md outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-black">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-700 rounded-md outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className='text-red-600 font-semibold text-center'>{error}</p>}          
          <button onClick={handleLogin} className="w-full py-2 mt-4 text-white bg-black rounded-md hover:bg-gray-900" disabled={loading && true}>
              Log{loading && "ging"} in
          </button>
        </div>
        <div className="mt-6 text-center">
          <a href="#" className="text-gray-600 hover:underline">Forgot password?</a>
        </div>
        <div className="mt-2 text-center">
          <p className="text-gray-600">
            Don't have an account? 
            <Link to="/register" className="text-gray-800 hover:underline"> Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
