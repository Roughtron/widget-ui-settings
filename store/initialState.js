export const initialState = {
  user: {
    email: '',
    formId: null
  },
  operator: {},
  payment: {},
  rooms: {},
  currentFileUpload: {},
  UI: {
    Sign: {
      signUpScreen: 'SignUpForm',
      signActiveStep: 0
    },
    Dashboard: {
      showInfo: false,
      isShowRoomsMenu: false,
      showMainPage: false
    },
    Widget: {
      headerColor: '#5d576b',
      headerTextColor: '#fff',
      headerText: 'Отправьте нам сообщение!',
      bodyColor: '#fff',
      bodyTextColor: '#566376',
      bodyText: 'Оставьте свое сообщение в этой форме, мы получим его на e-mail и обязательно ответим!',
      primaryColor: '#00a7e1',
      buttonTextColor: '#fff',
      sendButtonText: 'Отправить',
      successSendText: 'Спасибо за ваше сообщение! Мы обязательно свяжемся с вами в ближайшее время',
      closeButtonText: 'Закрыть',
      closeIconColor: '#000',
      position: 'right'
    }
  },
  language: 'en_GB',
  availableLanguages: [
    {
      title: 'English',
      iso: 'en_GB',
      aliases: ['en_GB', 'en']
    }, {
      title: 'Portugal',
      iso: 'pt_PT',
      aliases: ['pt_PT', 'pt_BR', 'pt']
    }, {
      title: 'Russian',
      iso: 'ru_RU',
      aliases: ['ru_RU', 'ru']
    }
  ]
}
