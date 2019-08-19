import { getUserFromLocalStorage } from '~/utils/auth'
import { SET_USER } from '~/store/mutation-types'

export default function ({ store }) {
  if (!process.browser) return
  const loggedUser = getUserFromLocalStorage()
  store.commit(SET_USER, loggedUser)
}
