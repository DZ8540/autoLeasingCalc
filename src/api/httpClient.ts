import type { AxiosInstance } from 'axios'
import axios from 'axios'

export const HTTP_CLIENT: AxiosInstance = axios.create({
  baseURL: 'https://hookb.in',
  timeout: 1000,
  headers: { 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})