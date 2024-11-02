import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [verifCode, setVerifCode] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")
  const [showVerification, setShowVerification] = useState(false)

  const handleRegister = async () => {
    setLoading(true)
    setError("")
    try {
      const response = await axios.post("http://localhost:5000/register", {email, password})
      if (response.data.success) {
        setSuccess(response.data.message)
        setShowVerification(true)
      } else {
        setError(response.data.message)
      }
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await axios.post('http://localhost:5000/verify', { email, verifCode })
      if (response.data.success) {
          setError('');
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
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-black">Create Account</h2>
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
          {showVerification && (
            <div className="mb-4">
              <label className="block text-black">Verification code</label>
              <input
                type="text"
                value={verifCode}
                onChange={(e) => setVerifCode(e.target.value)}
                className="w-full px-4 py-2 mt-2 border border-gray-700 rounded-md outline-none"
                placeholder="Enter verification code"
                required
              />
            </div>
          )}
          {error && <p className='text-red-600 font-semibold text-center'>{error}</p>}
          {success && <p className='text-green-600 font-semibold text-center'>{success}</p>}
          {showVerification ? (
            <button onClick={handleVerify} className="w-full py-2 mt-4 text-white bg-black rounded-md hover:bg-gray-900" disabled={loading && true}>
              Verify{loading && "ing"}
            </button>
          ) : (
            <button onClick={handleRegister} className="w-full py-2 mt-4 text-white bg-black rounded-md hover:bg-gray-900" disabled={loading && true}>
              Register{loading && "ing"}
            </button>
          )}
        </div>
        <div className="mt-6 text-center">
          <a href="#" className="text-gray-600 hover:underline">Forgot password?</a>
        </div>
        <div className="mt-2 text-center">
          <p className="text-gray-600">
            Already have an account? 
            <Link to='/login' className="text-gray-800 hover:underline"> Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
