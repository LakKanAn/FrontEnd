<template>
  <div class="inner-login-page">
    <v-row class="row-login" align="center" justify="center">
      <v-col
        cols="12"
        sm="12"
        md="8"
        lg="5"
        xl="5"
        align="center"
        justify="center"
      >
        <v-img :src="require('~/assets/image/people_gadgets.png')" max-width="302" max-height="456" />
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="12"
        lg="7"
        xl="7"
        class="bg-login"
      >
        <v-card width="650" class="ma-auto text-left card-login mobile-login" tile flat>
          <v-card-title class="text-h5 text-sm-h5 text-md-h4 text-lg-h4 text-xl-h4">
            เข้าสู่ระบบ
          </v-card-title>
          <v-card-actions v-if="loginPage === 'main'">
            <v-row justify="space-around">
              <v-col
                cols="11"
                sm="11"
                md="3"
                lg="3"
                xl="3"
              >
                <v-card width="160" class="pa-4 ma-auto" @click="loginPage = 'users'">
                  <div class="py-0 d-flex justify-center">
                    <v-icon color="#171E45" size="50">
                      mdi-account
                    </v-icon>
                  </div>
                  <v-card-subtitle class="pa-2 d-flex justify-center">
                    บุคคลทั่วไป
                  </v-card-subtitle>
                </v-card>
              </v-col>
              <v-col
                cols="11"
                sm="11"
                md="3"
                lg="3"
                xl="3"
              >
                <v-card width="160" class="pa-4 ma-auto" @click="loginPage = 'distributor'">
                  <div class="d-flex justify-center">
                    <v-icon color="#171E45" size="50">
                      mdi-account-tie-woman
                    </v-icon>
                  </div>
                  <v-card-subtitle class="pa-2 d-flex justify-center">
                    ผู้จัดจำหน่าย
                  </v-card-subtitle>
                </v-card>
              </v-col>
              <v-col
                cols="11"
                sm="11"
                md="3"
                lg="3"
                xl="3"
              >
                <v-card width="160" class="pa-4 ma-auto" @click="loginPage = 'admin'">
                  <div class="d-flex justify-center">
                    <v-icon color="#171E45" size="50">
                      mdi-account-tie-hat
                    </v-icon>
                  </div>
                  <v-card-subtitle class="pa-2 d-flex justify-center">
                    ผู้ดูแลระบบ
                  </v-card-subtitle>
                </v-card>
              </v-col>
            </v-row>
          </v-card-actions>

          <v-card-actions v-if="loginPage === 'users'">
            <v-row justify="center" align="center" dense>
              <v-col cols="12" class="d-flex justify-center align-center">
                <v-card-subtitle class=" orange--text text--darken-1 pa-1 text-body-2 text-sm-body-2 text-md-h6 text-lg-h6 text-xl-h6 font-weight-regular">
                  <v-icon color="#FF8C00" size="30">
                    mdi-account
                  </v-icon>
                  บุคคลทั่วไป
                </v-card-subtitle>
              </v-col>
              <v-col cols="12">
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
              </v-col>
              <v-col cols="12" class="d-flex justify-center">
                <v-card-text class="orange--text text--darken-1 d-flex justify-center pa-0 text-decoration-underline" @click="loginPage = 'main'">
                  ย้อนกลับ
                </v-card-text>
              </v-col>
            </v-row>
          </v-card-actions>

          <v-card-actions v-if="loginPage === 'distributor'">
            <v-row justify="center" align="center" dense>
              <v-col cols="12" class="d-flex justify-center align-center">
                <v-card-subtitle class=" orange--text text--darken-1 pa-1 text-body-2 text-sm-body-2 text-md-h6 text-lg-h6 text-xl-h6 font-weight-regular">
                  <v-icon color="#FF8C00" size="30">
                    mdi-account-tie-woman
                  </v-icon>
                  ผู้จัดจำหน่าย
                </v-card-subtitle>
              </v-col>
              <v-col cols="12">
                <p class="mb-1 pa-0">
                  Email
                </p>
                <v-text-field
                  v-model="auth.email"
                  solo
                  hide-details
                  placeholder="Email"
                />
              </v-col>
              <v-col cols="12">
                <p class="mb-1 pa-0">
                  Password
                </p>
                <v-text-field
                  v-model="auth.password"
                  solo
                  hide-details
                  placeholder="Password"
                  type="password"
                />
              </v-col>
              <v-col cols="12">
                <v-btn
                  class="my-2 pa-2 login-button"
                  width="100%"
                  depressed
                  large
                  dark
                  elevation="4"
                  @click="login"
                >
                  Login
                </v-btn>
              </v-col>
              <v-col v-if="disText" cols="12" class="d-flex justify-center">
                <p class="text-red d-flex justify-center px-auto">
                  {{ disText }}
                </p>
              </v-col>
              <v-col cols="12" class="d-flex justify-center">
                <v-card-text class="orange--text text--darken-1 d-flex justify-center pa-0 text-decoration-underline" @click="loginPage = 'main'">
                  ย้อนกลับ
                </v-card-text>
              </v-col>
            </v-row>
          </v-card-actions>

          <v-card-actions v-if="loginPage === 'admin'">
            <v-row justify="center" align="center" dense>
              <v-col cols="12" class="d-flex justify-center align-center">
                <v-card-subtitle class=" orange--text text--darken-1 pa-1 text-body-2 text-sm-body-2 text-md-h6 text-lg-h6 text-xl-h6 font-weight-regular">
                  <v-icon color="#FF8C00" size="30">
                    mdi-account-tie-hat
                  </v-icon>
                  ผู้ดูแลระบบ
                </v-card-subtitle>
              </v-col>
              <v-col cols="12">
                <p class="mb-1 pa-0">
                  Email
                </p>
                <v-text-field
                  v-model="auth.email"
                  solo
                  hide-details
                  placeholder="Email"
                />
              </v-col>
              <v-col cols="12">
                <p class="mb-1 pa-0">
                  Password
                </p>
                <v-text-field
                  v-model="auth.password"
                  solo
                  hide-details
                  placeholder="Password"
                  type="password"
                />
              </v-col>
              <v-col cols="12">
                <v-btn
                  class="my-2 pa-2 login-button"
                  width="100%"
                  depressed
                  large
                  dark
                  elevation="4"
                  @click="adminLogin"
                >
                  Login
                </v-btn>
              </v-col>
              <v-col v-if="disText" cols="12" class="d-flex justify-center">
                <p class="text-red d-flex justify-center px-auto">
                  {{ disText }}
                </p>
              </v-col>
              <v-col cols="12" class="d-flex justify-center">
                <v-card-text class="orange--text text--darken-1 d-flex justify-center pa-0 text-decoration-underline" @click="loginPage = 'main'">
                  ย้อนกลับ
                </v-card-text>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
        <!--
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
            @click="adminLogin"
          >
            Login
          </v-btn>
          <div class="d-flex justify-center">
            <p v-if="adminText !== ''" class="red--text">
              {{ adminText }}
            </p>
          </div>
          <v-divider class="my-3" />
          <v-btn
            class="my-2 pa-2 login-button"
            width="49%"
            depressed
            large
            @click="loginPage = 'distributor'"
          >
            Distributor Login
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
        <v-card v-if="loginPage === 'distributor'" width="500" class="pa-5 elevation-1 text-left">
          <v-card-title>เข้าสู่ระบบของผู้จัดจำหน่าย</v-card-title>
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
          <div class="d-flex justify-center">
            <p v-if="disText" class="text-red d-flex justify-center px-auto">
              {{ disText }}
            </p>
          </div>
          <v-divider class="my-3" />
          <v-btn
            class="my-2 pa-2 login-button"
            width="49%"
            depressed
            large
            @click="switchLogin"
          >
            Admin Login
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
        </v-card> -->
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginPage: 'main',
      snackbar: false,
      snackbarCheck: false,
      snackbarText: 'No error message',
      adminValidate: false,
      disValidate: false,
      adminText: '',
      disText: '',
      errorNoUser: 'Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).',
      errorWrongPassword: 'Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).',
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
            distributorId: this.$nuxt.$fire.auth.currentUser.uid
          }
          this.$axios.$post('/distributors/registration', formData)
          this.$auth.loginWith('local', {
            data: { token: user.user._delegate.accessToken }
          })
          this.$nuxt.$router.push('/distributor/managebook')
        })
      } catch (error) {
        console.log(error)
        error.message === this.errorNoUser ? this.disText = 'ไม่มีผู้ใช้งานนี้' : this.snackbarText = 'No error message'
        error.message === this.errorWrongPassword ? this.disText = 'รหัสผ่านไม่ถูกต้อง' : this.snackbarText = 'No error message'
      }
    },

    async adminLogin () {
      try {
        await this.$fire.auth.signInWithEmailAndPassword(
          this.auth.email,
          this.auth.password
        ).then((user) => {
          this.$auth.loginWith('admin', {
            data: { token: user.user._delegate.accessToken }
          })
        })
      } catch (errore) {
        console.log(errore.message)
        errore.message === this.errorNoUser ? this.adminText = 'ไม่มีผู้ใช้งานนี้' : this.snackbarText = 'No error message'
        errore.message === this.errorWrongPassword ? this.adminText = 'รหัสผ่านไม่ถูกต้อง' : this.snackbarText = 'No error message'
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
          this.$auth.loginWith('user', {
            data: { token: user.user._delegate.accessToken }
          })
        })
        .catch(function (error) {
          that.snackbarText = error.message
          that.snackbar = true
        })
    }
  }
}
</script>

<style scoped>
.v-application{
    font-family: 'Prompt', sans-serif !important;
 }
.inner-login-page{
    width: 100%;
    height: 100%;
    background-color: #F6C35D;
    background-repeat: repeat;
    background-size: auto;
}
.row-login{
    height: 100%;
}
@media only screen and (max-width: 1024px) {
.mobile-login{
  margin-top: 10% !important;
}
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
.text-red {
  color: red !important;
}
.bg-login {
 background-color: white;
 height: 100%;
 display: flex;
 justify-items: center;
}
</style>
