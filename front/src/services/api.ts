import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

// api.interceptors.request.use((config) => {
//   try {
//     const token = localStorage.getItem('token')
//     config.headers.Authorization = `Bearer ${token}`
//     console.log('try', config.headers.Authorization)
//     return config
//   } catch (err) {
//     console.log('catch', config.headers.Authorization)
//     return config
//   }
// })
