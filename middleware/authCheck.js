export default function ({ app, route, redirect }) {
  if (!app.$auth.loggedIn) {
    return redirect('/')
  }
}
