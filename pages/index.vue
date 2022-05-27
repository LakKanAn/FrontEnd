<template>
  <div class="inner-index-page">
    <div :class="{'content-book-center':!$vuetify.theme.dark, 'content-book-center-dark':$vuetify.theme.dark} ">
      <div class="px-5">
        <v-col class="pa-0" cols="6" sm="6" md="3">
          <h1 class="topic justify-center">
            หนังสือมาใหม่
          </h1>
        </v-col>
        <hr>
        <v-row class="card-book py-5">
          <v-col v-for="(items, index) in newBook" :key="index" cols="6" sm="4" md="3">
            <v-card class="br-bot" outlined @click="routerGo(items.bookId)">
              <v-img
                :src="items.bookImage"
                height="300px"
                max-width="359"
              />
              <v-card-subtitle class="py-1 px-0 over-text">
                {{ items.category }}
              </v-card-subtitle>
              <v-card-title class="pb-4 pt-0 px-0 over-text">
                {{ items.bookTitle }}
              </v-card-title>

              <v-card-subtitle class="py-1 px-0 over-text">
                {{ items.author }}
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
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
      },
      newBook: []
    }
  },
  async fetch () {
    const res = await this.$axios.$get(
      '/market/books'
    )
    this.newBook = res.books.reverse()
  },
  methods: {
    login () {
      this.$nuxt.$router.push('/login')
    },
    routerGo (item) {
      this.$nuxt.$router.push('/products/' + item)
    },
    signout () {
      if (this.$nuxt.$fire.auth.currentUser) {
        this.$nuxt.$fire.auth.signOut()
        this.$nuxt.$auth.logout()
      } else {
        this.$nuxt.$fire.auth.signOut()
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

<style scoped>
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
.content-book-center{
  padding-top: 30px;
  margin-left: 10%;
  margin-right: 10%;
  background-color: white;
  height: 100%;
}
.content-book-center-dark{
  padding-top: 30px;
  margin-left: 10%;
  margin-right: 10%;
  background-color: #1E1E1E;
  height: 100%;
}

@media only screen and (max-width: 600px) {
  .content-book-center-dark {
  margin-left: 2%;
  margin-right: 2%;
  }
    .content-book-center {
  margin-left: 2%;
  margin-right: 2%;
  }
      h1{
    font-size: 24px;
  }
}
.topic{
  background-color:#FF8C00;
  display: flex;
}
hr{
  height: 3px;
  color: #FF8C00 !important;
  background-color:#FF8C00 !important;
  border-color: #FF8C00 !important;
}
.card-book .v-card__title{
    display: block;
    text-align: left !important;
}
.card-book .v-card__subtitle{
    display: block;
    text-align: left !important;
}
.theme--light.v-sheet--outlined {
    border: 0;
}
.theme--dark.v-sheet--outlined {
    border: 0;
}
.br-bot{
    border-bottom: 3px solid #FF8C00 !important;
}
.over-text{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
