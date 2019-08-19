import { normalize } from 'normalizr'
import schemas from './schema'
import * as MT from './mutation-types'
import { setUser, getUserFromLocalStorage, unsetUser, updateUser, isAuthPath } from '~/utils/auth'
import room from './schema/room'
const cookieparser = process.server ? require('cookieparser') : undefined

export default {
  async nuxtServerInit ({ commit, dispatch }, { req, route, redirect }) {
    let user = null
    if (req && req.headers && req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.feedberryUser)
      } catch (err) {
      }
    }

    if (user) {
      commit(MT.SET_USER, user)
      await dispatch('getRooms', user.token)
      await dispatch('getOperatorSettings', {
        token: user.token,
        id: user.formId
      })
    } else {
      if (route.path !== '/site.webmanifest') {
        if (!isAuthPath(route.path)) {
          redirect('/signin')
        }
      }
    }
  },

  checkUserExist ({ commit }) {
    try {
      const user = getUserFromLocalStorage()
      commit(MT.SET_USER, user)
    } catch (error) {
      throw error
    }
  },

  async login ({ commit }, { email, password }) {
    try {
      const { data } = await this.$axios.post('api/auth/signin', { email, password })
      if (data.success) {
        const { token, formId, hasTrial, username, website, phone, role } = data
        setUser({
          token,
          formId,
          hasTrial,
          username,
          website,
          phone,
          role
        })
        commit(MT.SET_USER, getUserFromLocalStorage())
      } else {
        throw Error(data.error)
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async signup ({ commit }, { email, password }) {
    try {
      const { data } = await this.$axios.post('api/auth/signup', { email, password })
      if (data.success) {
        const { token, formId, hasTrial, username, website, phone, role } = data
        setUser({
          token,
          formId,
          hasTrial,
          username,
          website,
          phone,
          role
        })
        commit(MT.SET_USER, getUserFromLocalStorage())
      } else {
        throw Error(data.error)
      }
    } catch (error) {
      throw error
    }
  },

  async updateUser ({ commit }, { username, website, phone, token }) {
    try {
      const { data } = await this.$axios({
        method: 'post',
        url: 'api/user/update',
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-auth': token
        },
        data: {
          username,
          website,
          phone
        }
      })

      if (data.success) {
        updateUser({
          username,
          website,
          phone
        })
        commit(MT.SET_USER, getUserFromLocalStorage())
      } else {
        throw Error(data.error)
      }
    } catch (error) {
      throw error
    }
  },

  async logout ({ commit }) {
    unsetUser()
    commit(MT.LOGOUT)
  },

  async recovery ({ commit }, { email }) {
    try {
      const { data } = await this.$axios.post(`api/auth/reset`, {
        email
      })
      if (!data.success) {
        throw Error(data.error)
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async getSettings ({ commit }, token) {
    try {
      const { data } = await this.$axios({
        method: 'get',
        url: `api/user/config`,
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-auth': token
        },
        data: {}
      })
      commit(MT.GET_SETTINGS, { data })
    } catch (error) {
      throw error
    }
  },

  async saveSettings ({ commit }, { payload, token }) {
    try {
      await this.$axios({
        method: 'post',
        url: `api/user/config`,
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-auth': token
        },
        data: JSON.stringify(payload)
      })
      commit(MT.SAVE_SETTINGS, { payload })
    } catch (error) {
      throw error
    }
  },

  async getRooms ({ commit }, token) {
    try {
      if (token) {
        const { data } = await this.$axios({
          method: 'get',
          url: `api/rooms`,
          withCredentials: true,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-auth': token
          },
          data: {}
        })
        if (data.data.length) {
          // TODO it does go from backend
          data.data.forEach(item => {
            item.submissions = []
            return item
          })
          const normalizedData = normalize(data.data, schemas.rooms)
          commit(MT.GET_ROOMS, { data: normalizedData })
        }
      }
    } catch (error) {
      throw error
    }
  },

  async getClientSubmissions ({ commit }, { id, token }) {
    try {
      if (token && id) {
        const { data } = await this.$axios({
          method: 'get',
          url: `/api/rooms/${id}/messages`,
          withCredentials: true,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-auth': token
          },
          data: {}
        })
        commit(MT.GET_CLIENT_SUBMISSIONS, { data: data.data })
      }
    } catch (error) {
      throw error
    }
  },

  async getPaymentPage ({ commit }, { id, token }) {
    try {
      const { data } = await this.$axios({
        method: 'get',
        url: `/api/payment/details/${id}`,
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-auth': token
        },
        data: {}
      })
      commit(MT.GET_PAYMENT_PAGE, { data: data.data })
    } catch (error) {
      throw error
    }
  },

  changeSignUpScreen ({ commit }, { screen, step }) {
    commit(MT.CHANGE_SIGNUP_SCREEN, { screen, step })
  },

  resetSignUpPage ({ commit }) {
    commit(MT.RESET_SIGNUP_PAGE)
  },

  async sendMessageToClient ({ commit }, { roomId, message, name, userPictureUrl }) {
    try {
      this._vm.$socket.emit('operatorChatEvent', {
        roomId,
        message
      })
      commit(MT.SEND_MESSAGE_TO_CLIENT, { message, roomId: parseInt(roomId), name, userPictureUrl })
    } catch (error) {
      throw error
    }
  },

  showInfo ({ commit }) {
    commit(MT.SHOW_INFO)
  },

  hideInfo ({ commit }) {
    commit(MT.HIDE_INFO)
  },

  changeWidgetProperty ({ commit }, data) {
    commit(MT.WIDGET_CHANGE_PROPERTY, data)
  },

  showRoomsMenu ({ commit }) {
    commit(MT.SHOW_ROOMS_MENU)
  },

  hideRoomsMenu ({ commit }) {
    commit(MT.HIDE_ROOMS_MENU)
  },

  showDashboardMainPage ({ commit }) {
    commit(MT.SHOW_DASHBOARD_MAIN_PAGE)
  },

  hideDashboardMainPage ({ commit }) {
    commit(MT.HIDE_DASHBOARD_MAIN_PAGE)
  },

  async getOperators ({ commit }, token) {
    try {
      if (token) {
        const { data } = await this.$axios({
          method: 'get',
          url: 'api/user/operators',
          withCredentials: true,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-auth': token
          },
          data: {}
        })
        commit(MT.GET_OPERATORS, { data: data.data })
      }
    } catch (error) {
      throw error
    }
  },

  async addOperator ({ commit }, { email, role, token }) {
    try {
      const { data } = await this.$axios({
        method: 'post',
        url: 'api/user/operators',
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-auth': token
        },
        data: {
          email,
          role
        }
      })
      commit(MT.ADD_OPERATOR, { data: data.data })
    } catch (error) {
      throw error
    }
  },

  async getOperatorSettings ({ commit }, { id, token }) {
    try {
      if (id && token) {
        const { data } = await this.$axios({
          method: 'get',
          url: `api/user/operators/settings/${id}`,
          withCredentials: true,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-auth': token
          },
          data: {}
        })
        commit(MT.GET_OPERATOR_SETTINGS, { data: data.data })
      }
    } catch (error) {
      throw error
    }
  },

  async uploadUserpic ({ commit }, { file, token }) {
    try {
      const { data } = await this.$axios({
        method: 'post',
        url: `api/files`,
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'x-auth': token
        },
        data: file
      })
      commit(MT.UPLOAD_USERPIC, { data: data.data })
    } catch (error) {
      throw error
    }
  },

  changeOperatorUserpic ({ commit }, data) {
    commit(MT.UPDATE_USERPIC, data)
  },

  async removeOperator ({ commit }, { id, token }) {
    try {
      await this.$axios({
        method: 'delete',
        url: `api/user/operators/${id}`,
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-auth': token
        },
        data: {}
      })
      commit(MT.REMOVE_OPERATOR, { id })
    } catch (error) {
      throw error
    }
  },

  async saveOperatorSettings ({ commit }, { payload, id, token }) {
    try {
      await this.$axios({
        method: 'put',
        url: `/api/user/operators/settings/${id}`,
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-auth': token
        },
        data: payload
      })
      commit(MT.SAVE_OPERATOR_SETTINGS, { data: payload })
    } catch (error) {
      throw error
    }
  },

  async signupOperator ({ commit }, payload) {
    try {
      const { data } = await this.$axios({
        method: 'post',
        url: `api/auth/signup/operator`,
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: payload
      })
      const { token, formId, hasTrial, role } = data
      const { username, phone } = payload
      setUser({
        token,
        formId,
        hasTrial,
        username,
        phone,
        role
      })
      commit(MT.SET_USER, getUserFromLocalStorage())
    } catch (error) {
      throw error
    }
  },

  operatorJoinedEvent () {
    this._vm.$socket.emit('operatorJoinedEvent', { token: this._vm.userToken })
  },

  addNewMessage ({ commit }, payload) {
    commit(MT.ADD_NEW_MESSAGE, payload)
  },

  socket_serverChatEvent ({ commit }, payload) {
    commit(MT.ADD_NEW_MESSAGE, payload)
  },

  socket_newRoomEvent ({ commit }, payload) {
    payload.submissions = []
    const normalizeRoom = normalize(payload, room)
    commit(MT.NEW_ROOM, normalizeRoom)
  },

  socket_operatorJoinedToRoom ({ commit }, payload) {
    commit(MT.OPERATOR_JOINED_TO_ROOM, payload)
  },

  socket_operatorExitedFromRoom ({ commit }, payload) {
    commit(MT.OPERATOR_EXITED_FROM_ROOM, payload)
  }
}
