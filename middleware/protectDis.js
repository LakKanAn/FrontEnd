export default function ({ app, route, redirect }) {
  console.log(app)
  if (app.$auth.user.role !== 'distributor') {
    return redirect('/')
  }
}
