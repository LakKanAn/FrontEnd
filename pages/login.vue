<template>
  <div class="inner-login-page">
    <v-row class="row-login" align="center" justify="center">
      <v-col cols="12" sm="8" md="4" align="center" justify="center">
        <v-card v-if="loginPage === 'users'" width="500" class="pa-5 elevation-1 text-left card-login">
          <v-card-title>เข้าสู่ระบบ</v-card-title>
          <v-card-subtitle>เข้าสู่ระบบเพื่อใช้งาน</v-card-subtitle>
          <v-btn
            class="login-button-other my-2 pa-4 google-login"
            width="100%"
            height="50"
            elevation="2"
            depressed
            large
            @click="googleLogin"
          >
            <img src="~/assets/logo/google.png" width="32" height="32" alt="Google Image">&nbsp;Login with Google
          </v-btn>
          <v-divider class="my-3" />
          <v-btn
            class="my-2 pa-2 login-button"
            width="49%"
            large
          >
            Forget Password
          </v-btn>
          <v-btn
            class="my-2 pa-2 login-button"
            width="49%"
            depressed
            large
            @click="switchLogin"
          >
            Admin Login
          </v-btn>
        </v-card>
        <v-card v-if="loginPage === 'admin'" width="500" class="pa-5 elevation-1 text-left">
          <v-card-title>เข้าสู่ระบบของแอดมิน</v-card-title>
          <v-card-subtitle>เข้าสู่ระบบเพื่อใช้งาน</v-card-subtitle>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="auth.email"
                label="Login"
                name="login"
                prepend-icon="mdi-account"
                type="text"
              />

              <v-text-field
                v-model="auth.password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
              />
            </v-form>
          </v-card-text>
          <v-btn
            class="my-2 pa-2 login-button"
            width="100%"
            depressed
            large
            @click="login"
          >
            Login
          </v-btn>
          <v-divider class="my-3" />
          <v-btn
            class="my-2 pa-2 login-button"
            width="49%"
            depressed
            large
            @click="login"
          >
            Forget Password
          </v-btn>
          <v-btn
            class="my-2 pa-2 login-button"
            width="49%"
            depressed
            large
            @click="switchLogin"
          >
            Users Login
          </v-btn>
        </v-card>
        <v-snackbar v-model="snackbar" :timeout="4000" absolute bottom center>
          {{ snackbarText }}
        </v-snackbar>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginPage: 'users',
      snackbar: false,
      snackbarText: 'No error message',
      auth: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      try {
        await this.$fire.auth.signInWithEmailAndPassword(
          this.auth.email,
          this.auth.password
        ).then((user) => {
          const formData = {
            email: this.$nuxt.$fire.auth.currentUser.email,
            userId: this.$nuxt.$fire.auth.currentUser.uid,
            displayName: this.$nuxt.$fire.auth.currentUser.displayName
          }
          this.$axios.$post('/distributors/registration', formData)
          this.$auth.loginWith('local', {
            data: { token: user.user._delegate.accessToken }
          })
          this.$nuxt.$router.push('/distributor/managebook')
        })
      } catch (error) {
      }
    },
    switchLogin () {
      this.loginPage = (this.loginPage === 'users') ? 'admin' : 'users'
    },
    googleLogin () {
      const that = this
      const provider = new this.$nuxt.$fireModule.auth.GoogleAuthProvider()
      this.$fire.auth
        .signInWithPopup(provider)
        .then((user) => {
          const formData = {
            email: this.$nuxt.$fire.auth.currentUser.email,
            userId: this.$nuxt.$fire.auth.currentUser.uid,
            displayName: this.$nuxt.$fire.auth.currentUser.displayName
          }
          this.$axios.$post('/users/registration', formData)
          this.$auth.loginWith('local', {
            data: { token: user.user._delegate.accessToken }
          })
        })
        .catch(function (error) {
          that.snackbarText = error.message
          that.snackbar = true
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
.inner-login-page{
    width: 100%;
    height: 100%;
    background-image: url("~/assets/background/sor.jpg");
    background-size: auto;
}
.row-login{
    height: 100%;
}
.v-card__title{
    display: block;
    text-align: center !important;
}
.v-card__subtitle{
    text-align: center;
}
.login-button{
    background-color: #FF8C00 !important;
}

</style>
