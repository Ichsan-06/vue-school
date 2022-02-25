import Auth from '@/service/Auth'

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user ? { status: { loggedIn: true }, user } : { status: { loggedIn: false }, user: null }
const userData = localStorage.getItem('userData')
const accountData = userData !== 'undefined' ? JSON.parse(userData) : '-'

const app = {
  state: {
    initialState,
    accountData
  },
  actions: {
    loginUsers({ commit }, user) {
      return Auth.login(user).then(
        user => {
          commit('saveSession', user)
          return Promise.resolve(user)
        },
        error => {
          return Promise.reject(error)
        }
      )
    }
  },
  mutations: {
    saveSession(state, data) {
      state.accountData = data
      localStorage.setItem('user', JSON.stringify(data))
    }
  }
}

export default app
