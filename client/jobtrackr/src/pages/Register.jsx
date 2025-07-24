import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import handleError from '../../utils/handleError';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    // Validations
    if (!name || !email || !password) {
      toast.error('All fields are required');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    const trimmedData = {
      name: name.trim(),
      email: email.trim(),
      password: password.trim()
    };

    try {
      setLoading(true);
      const res = await api.post('/auth/register', trimmedData);
      login(res.data.token); // Save token to context
      toast.success('Registration successful');
      navigate('/');
    } catch (err) {
      handleError(err, 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-md mx-auto mt-10 bg-white p-6 rounded shadow-md'>
      <h2 className="text-2xl font-semibold mb-6 text-center">Create an Account</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor='name' className="block text-sm font-medium mb-1">Name</label>
          <input
            id='name'
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Enter your name'
            className='w-full p-2 border rounded'
            required
          />
        </div>

        <div>
          <label htmlFor='email' className="block text-sm font-medium mb-1">Email</label>
          <input
            id='email'
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter your email'
            className='w-full p-2 border rounded'
            required
          />
        </div>

        <div>
          <label htmlFor='password' className="block text-sm font-medium mb-1">Password</label>
          <input
            id='password'
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='Enter your password'
            className='w-full p-2 border rounded'
            required
          />
        </div>

        <button
          type='submit'
          className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-150'
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <p className='mt-4 text-sm text-center'>
        Already have an account?{' '}
        <span
          className='text-blue-500 cursor-pointer hover:underline'
          onClick={() => navigate('/login')}
        >
          Login here
        </span>
      </p>
    </div>
  );
};

export default Register;
