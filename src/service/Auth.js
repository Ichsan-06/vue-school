import login from './clients/AxiosDev'

const resource = 'api/auth/login'
// const config = { headers: { 'Content-Type': 'multipart/form-data' }}

export default {
  login(data) {
    return login.post(`${resource}`, data)
  }

}
