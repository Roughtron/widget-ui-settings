import { isAuthPath } from '@/utils/auth'

export default function ({ store, redirect, route }) {
  if (!store.getters.isAuthenticated && !isAuthPath(route.path)) {
    return redirect('/signin')
  }
  if (store.getters.isAuthenticated) {
    return redirect('/')
  }
}
