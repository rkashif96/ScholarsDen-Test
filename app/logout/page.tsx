"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import MyButton from '../components/MyButton';
import axios from '../lib/axios';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState('')
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      axios.get('/logout').then((res) => {
        if (res.data.status == 400) {
          alert(res.data.obj.message)
        } else {
          localStorage.clear();
        }
        router.push('/login')
      });
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="container mx-auto mt-20 ">
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md ">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold mb-4">Log Out</h1>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-gray-600 mb-4">Are you sure you want to log out?</p>
          </div>
          <div className="flex items-center justify-center">
            <MyButton
              id='logoutButton'
              type="submit"
              text="Log Out"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;
