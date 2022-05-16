export default function ({ app, route, redirect }) {
  console.log(app.$fire.auth.currentUser)
  if (!app.$fire.auth.currentUser) {
    console.log('kuy')
    return redirect('/')
  }
}
