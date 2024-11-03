import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../features/hook';
import { loginUser } from '../features/auth.slice';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const dispatch = useAppDispatch()
  const {loading, error} = useAppSelector((state) => state.auth)

  const handleLogin = () => {
    dispatch(loginUser({email, password}))
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md mx-2 md:mx-0">
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
          <Link to="/forgot-password" className="text-gray-600 hover:underline">Forgot password?</Link>
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
