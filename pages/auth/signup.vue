<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4" align="center" justify="center">
      <v-card width="500" class="pa-5 elevation-1 text-left">
        <v-card-title>register</v-card-title>
        <v-card-subtitle>register in system</v-card-subtitle>
        <v-card-text>
          <v-form>
            <v-text-field
              label="email"
              name="email"
              prepend-icon="mdi-account"
              type="text"
              v-model="auth.email"
            ></v-text-field>

            <v-text-field
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              v-model="auth.password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-btn
          class="my-2 pa-2 login-button"
          @click="register()"
          depressed
          large
          >Register</v-btn
        >

        <v-divider class="my-3"></v-divider>
        <!-- <v-btn
          class="login-button my-2 pa-2"
          width="100%"
          @click="githubLogin"
          depressed
          large
        >
          <v-icon color="black" large> mdi-github </v-icon>&nbsp;Login with
          Github
        </v-btn> -->
        <!-- <v-btn
          class="login-button my-2 pa-2"
          width="100%"
          @click="facebookLogin"
          depressed
          large
        >
          <v-icon color="blue" large> mdi-facebook </v-icon>&nbsp;Login with
          Facebook
        </v-btn> -->
      </v-card>
      <v-snackbar :timeout="4000" v-model="snackbar" absolute bottom center>
        {{ snackbarText }}
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      snackbarText: 'No error message',
      auth: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async register() {
      try {
        await this.$fire.auth
          .createUserWithEmailAndPassword(this.auth.email, this.auth.password)
          .catch(function (error) {
            that.snackbarText = error.message
            that.snackbar = true
          })
          .then((user) => {
            //we are signed in
            $nuxt.$router.push('/auth/signin')
          })

        const userFire = this.$fire.auth.currentUser
        let user = {
          displayName: this.displayName,
          password: userFire.uid,
          email: userFire.email,
        }
        const res = await this.$axios.post(`v1/distributors/register`, user)
        console.log(res)

        // await this.auth()
      } catch (error) {
        console.log(error)
        this.alertTxtSignup = 'Signup Failed'
        this.alertSignup = true
      }

      /*
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Reset Password",
        })
        .then((result) => {
          if (result.isConfirmed) {
          }

        });
*/
    },
  },
}
</script>
