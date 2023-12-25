"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import MyTextField from '../components/MyTextField';
import MyButton from '../components/MyButton';
import axios from '../lib/axios';
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post('/register', formData).then((res) => {
      if (res.data.status == 200) {
        router.push('/login');
      }
      console.log('Submitted:', res);
    }).catch((err: any) => {
      console.log(err)
    })
  };

  return (
    <div className="flex py-10 justify-center ">
      <div className="max-w-md w-full bg-white p-6 rounded-md shadow-md">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>

          <MyTextField
            label="Name"
            type="text"
            placeholder="Enter your name"
            name="name"
            onChange={handleChange}
          />

          <MyTextField
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            name="email"
            onChange={handleChange}
          />

          <MyTextField
            label="Password"
            type="password"
            placeholder="Enter your password"
            name="password"
            onChange={handleChange}
          />

          <MyButton
            type="submit"
            text="Sign Up"
            className="bg-blue-500 text-white w-full px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mt-3"
          />
        </form>
      </div>
    </div>
  );
};

export default Signup;

