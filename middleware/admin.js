export default function ({ store, redirect }) {
  if (!store.getters.isAdminOrOwner) {
    return redirect('/')
  }
}
