import axios from 'axios';

const baseURL = process.env.ENVIRONMENT=='development'?'http://localhost:3000/api':'https://scholarden-test-eight.vercel.app/api/'

const instance = axios.create({ baseURL });

export default instance;