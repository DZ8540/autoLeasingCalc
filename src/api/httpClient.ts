// * Types
import { API_URL } from '@/config/api'
import type { AxiosInstance } from 'axios'
// * Types

import axios from 'axios'

export const HTTP_CLIENT: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  headers: { 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})