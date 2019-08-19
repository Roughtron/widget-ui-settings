import jwtDecode from 'jwt-decode'
const Cookie = process.client ? require('js-cookie') : undefined

export const setUser = (user) => {
  if (!process.browser) return
  const newUser = {
    ...user,
    ...jwtDecode(user.token)
  }
  Cookie.set('feedberryUser', JSON.stringify(newUser), { expires: 365, secure: false })
  localStorage.setItem('user', JSON.stringify(newUser))
}

export const updateUser = ({ username, website, phone }) => {
  if (!process.browser) return
  const newUser = {
    ...getUserFromLocalStorage(),
    username,
    website,
    phone
  }
  localStorage.setItem('user', JSON.stringify(newUser))
}

export const unsetUser = () => {
  if (!process.browser) return
  localStorage.removeItem('user')
  localStorage.setItem('logout', Date.now())
  Cookie.remove('feedberryUser')
}

export const getUserFromLocalStorage = () => {
  if (!process.browser) return
  const json = localStorage.user
  return json ? JSON.parse(json) : null
}

export const getUserFromCookies = () => {
  return Cookie.get('feedberryUser')
}

export const isAuthPath = path => {
  const substrings = ['signin', 'signup', 'recovery']
  return substrings.some(item => path.includes(item))
}
