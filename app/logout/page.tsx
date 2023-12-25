"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import MyTextField from '../components/MyTextField';
import MyButton from '../components/MyButton';
import axios from '../lib/axios';
import { useRouter } from 'next/navigation';

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.get('/logout').then((res) => {
      if (res.data.status == 400) {
        localStorage.clear();
        router.push('/login')
      }
      localStorage.clear();
      router.push('/signup')

    });
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
