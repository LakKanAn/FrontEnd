<template>
  <div class="inner-index-page">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4" align="center" justify="center">
        <v-card width="500" class="pa-5 elevation-1 text-left">
          <v-card-title>หน้าหลัก</v-card-title>
          <v-card-subtitle>กดปุ่มด้านล่างเพื่อเข้าสู่หน้าล็อคอิน</v-card-subtitle>
          <v-btn
            v-if="!$nuxt.$fire.auth.currentUser"
            class="my-2 pa-2 login-button-router"
            width="100%"
            depressed
            large
            @click="login"
          >
            เข้าสู่หน้าล็อคอิน
          </v-btn>
          <v-btn
            v-if="$nuxt.$fire.auth.currentUser"
            class="my-2 pa-2 login-button-router"
            width="100%"
            depressed
            large
            @click="signout"
          >
            ล็อคเอ้า
          </v-btn>
          <v-divider class="my-3" />
          <v-btn
            class="my-2 pa-2 login-button-router"
            width="100%"
            depressed
            large
            @click="callConsole"
          >
            ตรวจสอบ
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </div>
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
      // const that = this
      // this.$fire.auth
      //   .signInWithEmailAndPassword(this.auth.email, this.auth.password)
      //   .catch(function (error) {
      //     that.snackbarText = error.message
      //     that.snackbar = true
      //   })
      //   .then((user) => {
      //     // we are signed in
      //     console.log('Hello')
      //     this.$nuxt.$router.push('/')
      //   })
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
    // githubLogin() {
    //   let that = this
    //   const provider = new $nuxt.$fireModule.auth.GithubAuthProvider()
    //   this.$fire.auth
    //     .signInWithPopup(provider)
    //     .catch(function (error) {
    //       that.snackbarText = error.message
    //       that.snackbar = true
    //     })
    //     .then((user) => {
    //       //we are signed in
    //       $nuxt.$router.push('/')
    //     })
    // },
    // facebookLogin() {
    //   let that = this
    //   const provider = new $nuxt.$fireModule.auth.FacebookAuthProvider()
    //   this.$fire.auth
    //     .signInWithPopup(provider)
    //     .catch(function (error) {
    //       that.snackbarText = error.message
    //       that.snackbar = true
    //     })
    //     .then((user) => {
    //       //we are signed in
    //       $nuxt.$router.push('/')
    //     })
    // },
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

<style>
.v-application{
    font-family: 'Prompt', sans-serif !important;
 }
 .v-card__title{
    display: block;
    text-align: center !important;
}
.v-card__subtitle{
    text-align: center;
}
.login-button-router{
    background-color: aqua !important;
}
.inner-index-page{
    width: 100%;
    height: 100%;
    background-image: url("~/assets/background/warrior.jpg");
    background-size: auto;
}
</style>
