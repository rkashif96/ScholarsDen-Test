import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_ENVIRONMENT == 'development' ? 'http://localhost:3000/api' : 'https://scholarden-test-rust.vercel.app/api/'
const instance = axios.create({ baseURL });

export default instance;