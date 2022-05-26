export default function ({ app, route, redirect }) {
  if (app.$fire.auth.currentUser) {
    return redirect('/')
  }
}
