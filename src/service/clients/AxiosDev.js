import axios from 'axios'
import { Notification } from 'element-ui'

const baseDomain = 'http://127.0.0.1:8000'
const baseURL = `${baseDomain}`

const axiosEnv = axios.create({
  baseURL
})

axiosEnv.interceptors.request.use(function(config) {
  // Do something before request is sent
  return config
}, function(error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
axiosEnv.interceptors.response.use(function(response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function(error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  const errorMessage = error.response.data.result.message

  Notification.error({
    title: 'Gagal',
    message: errorMessage,
    duration: 2000
  })

  return Promise.reject(error)
})

export default axiosEnv
