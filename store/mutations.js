import Vue from 'vue'
import { initialState } from './initialState'
import * as MT from './mutation-types'

export default {
  [MT.SET_LANGUAGE]: function (state, language) {
    state.language = language
  },

  [MT.SET_USER]: function (state, user) {
    state.user = user || null
  },

  [MT.LOGOUT]: function (state) {
    state = initialState
  },

  [MT.GET_SETTINGS]: function (state, { data }) {
    state.UI.Widget = { ...data.data }
  },

  [MT.SAVE_SETTINGS]: function (state, { payload }) {
    state.UI.Widget = { ...payload }
  },

  [MT.GET_ROOMS]: function (state, { data }) {
    state.rooms = data.entities.rooms
  },

  [MT.GET_CLIENT_SUBMISSIONS]: function (state, { data }) {
    if (data.length) {
      state.rooms[data[0].roomId].submissions = data
    } else {
      state.rooms = initialState.rooms
    }
  },

  [MT.GET_PAYMENT_PAGE]: function (state, { data }) {
    state.payment = { ...data }
  },

  [MT.CHANGE_SIGNUP_SCREEN]: function (state, { screen, step }) {
    state.UI.Sign.signUpScreen = screen
    state.UI.Sign.signActiveStep = step
  },

  [MT.RESET_SIGNUP_PAGE]: function (state) {
    state.UI.Sign.signUpScreen = 'SignUpForm'
    state.UI.Sign.signActiveStep = 0
  },

  [MT.SEND_MESSAGE_TO_CLIENT]: function (state, payload) {
    state.rooms[payload.roomId].submissions.push({
      id: Math.floor(Math.random() * 1000000) + 1000,
      message: payload.message,
      userType: 1,
      name: payload.name,
      userPictureUrl: payload.userPictureUrl,
      roomId: payload.roomId
    })
  },

  [MT.SHOW_INFO]: function (state) {
    state.UI.Dashboard.showInfo = true
  },

  [MT.HIDE_INFO]: function (state) {
    state.UI.Dashboard.showInfo = false
  },

  [MT.WIDGET_CHANGE_PROPERTY]: function (state, { property, value }) {
    state.UI.Widget[property] = value
  },

  [MT.SHOW_ROOMS_MENU]: function (state) {
    state.UI.Dashboard.isShowRoomsMenu = true
  },

  [MT.HIDE_ROOMS_MENU]: function (state) {
    state.UI.Dashboard.isShowRoomsMenu = false
  },

  [MT.SHOW_DASHBOARD_MAIN_PAGE]: function (state) {
    state.UI.Dashboard.showMainPage = true
  },

  [MT.HIDE_DASHBOARD_MAIN_PAGE]: function (state) {
    state.UI.Dashboard.showMainPage = false
  },

  [MT.GET_OPERATORS]: function (state, { data }) {
    state.user.operators = data
  },

  [MT.ADD_OPERATOR]: function (state, { data }) {
    state.user.operators.push(data)
  },

  [MT.GET_OPERATOR_SETTINGS]: function (state, { data }) {
    state.operator = { ...data }
  },

  [MT.UPLOAD_USERPIC]: function (state, { data }) {
    state.currentFileUpload = { ...data }
  },

  [MT.UPDATE_USERPIC]: function (state, { id, filenameId }) {
    state.operator = { ...state.operator, pictureFileId: filenameId, pictureId: id }
  },

  [MT.REMOVE_OPERATOR]: function (state, { id }) {
    const index = state.user.operators.findIndex(item => item.id === item)
    state.user.operators.splice(index, 1)
  },

  [MT.SAVE_OPERATOR_SETTINGS]: function (state, { data }) {
    state.operator = { ...data }
  },

  [MT.ADD_NEW_MESSAGE]: function (state, payload) {
    state.rooms[payload.roomId].submissions.push(payload)
  },

  [MT.NEW_ROOM]: function (state, payload) {
    const newRooms = Object.assign({}, state.rooms, payload.entities.room)
    Vue.set(state, 'rooms', newRooms)
  },

  [MT.OPERATOR_JOINED_TO_ROOM]: function (state, payload) {
    const { roomId, operator } = payload
    state.rooms[roomId].operators.push(operator)
  },

  [MT.OPERATOR_EXITED_FROM_ROOM]: function (state, payload) {
    const { roomId, operator } = payload
    const index = state.rooms[roomId].operators.findIndex(item => item.id === operator.id)
    if (index !== -1) {
      state.rooms[roomId].operators.splice(index, 1)
    }
  }
}
