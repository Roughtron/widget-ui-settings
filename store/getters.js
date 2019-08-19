export default {
  isAuthenticated (state) {
    return !!state.user
  },
  loggedUser (state) {
    return state.user
  },
  userEmail (state) {
    return state.user ? state.user.email : ''
  },
  userToken (state) {
    return state.user ? state.user.token : null
  },
  username (state) {
    return state.user ? state.user.username : ''
  },
  role (state) {
    return state.user ? state.user.role : null
  },
  isAdmin (state) {
    return state.user ? state.user.role === 'ADMIN' : false
  },
  isAdminOrOwner (state) {
    return state.user ? state.user.role === 'ADMIN' || state.user.role === 'OWNER' : false
  },
  formId (state) {
    return state.user ? state.user.formId : null
  },
  rooms (state) {
    return Object.keys(state.rooms).map(item => state.rooms[item])
  },
  sortedRoomsByDate (state) {
    return Object.keys(state.rooms).map(item => state.rooms[item]).sort((a, b) => {
      if (a.localDateTime > b.localDateTime) {
        return -1
      }
      if (a.localDateTime < b.localDateTime) {
        return 1
      }
      return 0
    })
  },
  newRoomsWithoutOperatorsSortedByDate (state) {
    const roomsWithoutOperaror = Object.keys(state.rooms)
      .map(item => state.rooms[item])
      .filter(item => item.operators.length === 0)

    return roomsWithoutOperaror.sort((a, b) => {
      if (a.localDateTime > b.localDateTime) {
        return -1
      }
      if (a.localDateTime < b.localDateTime) {
        return 1
      }
      return 0
    })
  },
  roomById (state) {
    return id => state.rooms[id]
  },
  settings (state) {
    return state.UI.Widget || {}
  },
  notifications (state) {
    return state.UI.Widget.notifications || []
  },
  submissions (state) {
    return roomId => state.rooms[roomId].submissions
  },
  merchantId (state) {
    return state.payment.merchantId || null
  },
  paymentAmount (state) {
    return state.payment.paymentAmount || null
  },
  currencyId (state) {
    return state.payment.currencyId || null
  },
  description (state) {
    return state.payment.description || null
  },
  successUrl (state) {
    return state.payment.successUrl || null
  },
  failUrl (state) {
    return state.payment.failUrl || null
  },
  signature (state) {
    return state.payment.signature || null
  },
  paymentId (state) {
    return state.payment.paymentId || null
  },
  signUpScreen (state) {
    return state.UI.Sign.signUpScreen
  },
  signActiveStep (state) {
    return state.UI.Sign.signActiveStep
  },
  showInfo (state) {
    return state.UI.Dashboard.showInfo
  },
  widgetUI (state) {
    return state.UI.Widget
  },
  widgetPosition (state) {
    return state.UI.Widget.position
  },
  widgetHeaderColor (state) {
    return state.UI.Widget.headerColor
  },
  widgetProperty (state) {
    return property => state.UI.Widget[property]
  },
  isRoomsMenuShow (state) {
    return state.UI.Dashboard.isShowRoomsMenu
  },
  isDashboardMainPageShow (state) {
    return state.UI.Dashboard.showMainPage
  },
  operators (state) {
    return state.user ? state.user.operators : []
  },
  operator (state) {
    return state.operator
  },
  operatorId (state) {
    return state.operator.id
  },
  operatorName (state) {
    return state.operator ? state.operator.username : ''
  },
  operatorPosition (state) {
    return state.operator ? state.operator.presentPosition : ''
  },
  operatorRole (state) {
    return state.operator ? state.operator.role : 'OPERATOR'
  },
  workTimeNotification (state) {
    return state.operator ? state.operator.workTimeNotification : true
  },
  operatorUserpic (state) {
    return state.operator ? state.operator.pictureFileId : ''
  },
  operatorUserpicId (state) {
    return state.operator ? state.operator.pictureId : ''
  },
  operatorWorkHours (state) {
    return state.operator ? state.operator.workHours : []
  },
  operatorTimezone (state) {
    return state.operator ? state.operator.timezone : 'Europe/Moscow'
  },
  currentFileUpload (state) {
    return state.currentFileUpload
  },
  availableLanguages (state) {
    return state.availableLanguages
  },
  language (state) {
    return state.language
  }
}
