<template>
  <div />
</template>

<script>
export default {
  data () {
    return {
      snackbar: false,
      snackbarText: 'No error message',
      auth: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$nuxt.$router.push('/login')
    },
    signout () {
      if (this.$nuxt.$fire.auth.currentUser) {
        this.$nuxt.$fire.auth.signOut()
      } else {
        this.$nuxt.$auth.logout()
      }
    },
    callConsole () {
    },
    googleLogin () {
      const that = this
      const provider = new this.$nuxt.$fireModule.auth.GoogleAuthProvider()
      this.$fire.auth
        .signInWithPopup(provider)
        .catch(function (error) {
          that.snackbarText = error.message
          that.snackbar = true
        })
        .then((user) => {
          // we are signed in
          this.$nuxt.$router.push('/auth/signin')
        })
    },
    forgotPassword () {
      const that = this
      this.$fire.auth
        .sendPasswordResetEmail(this.auth.email)
        .then(function () {
          that.snackbarText = 'reset link sent to ' + that.auth.email
          that.snackbar = true
        })
        .catch(function (error) {
          that.snackbarText = error.message
          that.snackbar = true
        })
    }
  }
}
</script>
