export default function ({ app, route, redirect }) {
  if (app.$auth.user.role !== 'distributor') {
    return redirect('/')
  }
}
