export default function ({ store, redirect }) {
  if (!store.getters.isAuthenticated) {
    return redirect('/signin')
  } else {
    if (!process.server) {
      store.dispatch('operatorJoinedEvent')
    }
  }
}
