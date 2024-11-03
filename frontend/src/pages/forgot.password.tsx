import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../features/hook';
import { forgotPassword } from '../features/auth.slice';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const dispatch = useAppDispatch()
  const {loading, error, success} = useAppSelector((state) => state.auth)

  const resetPassword = async () => {
    dispatch(forgotPassword({email, password, confirmPassword}))
  }

  if (localStorage.getItem('imdb_token')) {
    window.location.href = '/'
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md mx-2 md:mx-0">
        <h2 className="text-2xl font-bold text-center text-black">Forgot password</h2>
        <div className="mt-6">
          <div className="mb-2">
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
          <div className="mb-2">
            <label className="block text-black">New password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-700 rounded-md outline-none"
              placeholder="New password"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-black">Confirm password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-700 rounded-md outline-none"
              placeholder="Confirm new password"
              required
            />
          </div>
          {success && <p className='text-green-600 font-semibold text-center'>{success}</p>}
          {error && <p className='text-red-600 font-semibold text-center'>{error}</p>}
          <button onClick={resetPassword} className="w-full py-2 mt-4 text-white bg-black rounded-md hover:bg-gray-900" disabled={loading && true}>
              Reset{loading && "ting"} password
          </button>
        </div>
        <div className="mt-6 text-center">
          <Link to="/login" className="text-gray-600 hover:underline">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
