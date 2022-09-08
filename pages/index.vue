<template>
  <div class="inner-index-page">
    <div :class="{'content-book-center':!$vuetify.theme.dark, 'content-book-center-dark':$vuetify.theme.dark} ">
      <div class="px-5">
        <v-col class="pa-0" cols="12" sm="6" md="3">
          <h1 class="topic justify-center">
            หนังสือมาใหม่
          </h1>
        </v-col>
        <hr>
        <v-row class="card-book py-5">
          <v-col v-for="(items, index) in newBook" :key="'new'+index" cols="12" sm="4" md="3">
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

      <div class="px-5 mb-10">
        <v-col class="pa-0" cols="12" sm="6" md="3">
          <h1 class="topic justify-center">
            หนังสือขายดี
          </h1>
        </v-col>
        <hr>
        <v-row class="card-book py-5">
          <v-col v-for="(items, index) in newBook" :key="'sd'+index" cols="12" sm="12" md="12">
            <v-card outlined @click="routerGo(items.bookId)">
              <v-row class="br-bot">
                <v-col cols="12" sm="4" md="4">
                  <v-img
                    src="https://picsum.photos/id/11/10/6"
                    height="311"
                    max-width="212"
                  />
                </v-col>
                <v-col cols="8" sm="8" md="8">
                  <v-card-subtitle class="py-1 px-0 over-text">
                    {{ items.category }}
                  </v-card-subtitle>
                  <v-card-title class="pb-4 pt-0 px-0 over-text">
                    {{ items.bookTitle }}
                  </v-card-title>

                  <v-card-subtitle class="py-1 px-0 over-text">
                    {{ items.author }}
                  </v-card-subtitle>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col v-for="(items, index) in newBook" :key="'th'+index" cols="12" sm="6" md="6">
            <v-card outlined @click="routerGo(items.bookId)">
              <v-row class="br-bot">
                <v-col cols="5" sm="5" md="5">
                  <v-img
                    src="https://picsum.photos/id/11/10/6"
                    height="238"
                    max-width="163"
                  />
                </v-col>
                <v-col cols="7" sm="7" md="7">
                  <v-card-subtitle class="py-1 px-0 over-text">
                    {{ items.category }}
                  </v-card-subtitle>
                  <v-card-title class="pb-4 pt-0 px-0 over-text">
                    {{ items.bookTitle }}
                  </v-card-title>

                  <v-card-subtitle class="py-1 px-0 over-text">
                    {{ items.author }}
                  </v-card-subtitle>
                  <v-card-text class="pa-0 over-text-des">
                    <p> {{ items.description }}</p>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <p class="addon mb-20">
          เพิ่มเติม หนังสือใหม่ขายดี
        </p>
      </div>

      <div class="px-5 mb-10">
        <v-col class="pa-0" cols="12" sm="6" md="3">
          <h1 class="topic justify-center">
            หมวดหมู่หนังสือ
          </h1>
        </v-col>
        <hr>
        <v-row class="py-5">
          <v-col cols="6" sm="3" md="3">
            <p class="category text-center py-10 mb-0">
              สยองขวัญ
            </p>
          </v-col>
          <v-col cols="6" sm="3" md="3">
            <p class="category text-center py-10 mb-0">
              โรแมนติก
            </p>
          </v-col>
          <v-col cols="6" sm="3" md="3">
            <p class="category text-center py-10 mb-0">
              ตลก
            </p>
          </v-col>
          <v-col cols="6" sm="3" md="3">
            <p class="category text-center py-10 mb-0">
              ต่อสู้
            </p>
          </v-col>
        </v-row>
        <hr>
        <p class="addon mb-20 pt-2">
          เพิ่มเติม หมวดหมู่หนังสือ
        </p>
      </div>

      <div class="px-5">
        <v-col class="pa-0" cols="12" sm="6" md="3">
          <h1 class="topic justify-center">
            หนังสือทั้งหมด
          </h1>
        </v-col>
        <hr>
        <v-row class="py-5">
          <v-col cols="12" sm="4" md="4">
            <v-text-field
              outlined
              hide-details
              label="ชื่อเรื่อง"
            />
          </v-col>
          <v-col cols="6" sm="3" md="3">
            <v-select
              v-model="genre"
              :items="choieGenre"
              outlined
              hide-details
              label="หมวดหมู่"
            />
          </v-col>
          <v-col cols="6" sm="3" md="3">
            <v-select
              v-model="category"
              :items="choieCategory"
              outlined
              hide-details
              label="ประเภท"
            />
          </v-col>
          <v-col align-self="center" cols="2" sm="2" md="2">
            <v-btn color="#FF8C00" x-large class="text-center mb-0 search-button " @click="searchButton()">
              ค้นหา
            </v-btn>
          </v-col>
        </v-row>
        <hr>
        <v-row class="card-book py-5">
          <v-col v-for="(items, index) in newBook" :key="'four'+index" cols="6" sm="4" md="3">
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
      snackbar: true,
      snackbarText: 'No error message',
      auth: {
        email: '',
        password: ''
      },
      genre: '',
      category: '',
      choieGenre: [
        'ตลก',
        'ต่อสู้',
        'โรแมนติก',
        'วิทยาศาสตร์',
        'แฟนตาซี',
        'ระทึกขวัญ',
        'สืบสวนสอบสวน',
        'อิงประวัติศาสตร์'
      ],
      choieCategory: [
        'สารคดี',
        'บันเทิงคดี',
        'สิ่งพิมพ์',
        'ตำรา',
        'วารสาร',
        'นิตยสาร'
      ],
      newBook: [
        {
          genre: [
            'วิทยาศาสตร์',
            'ผจญภัย',
            'ระทึกขวัญ'
          ],
          author: 'Robert Louis Stevenson',
          distributorId: 'LpWBgBNMJaXC39ygnkbkdkpzAC92',
          release: true,
          bookImage: null,
          createAt: {
            _seconds: 1653722464,
            _nanoseconds: 652000000
          },
          bookId: 'Gezftq5aU5zMsnSuwKiI',
          bookTitle: 'Treasure Island',
          description: "A masterful tale of ''buccaneers and buried gold''. First published in the children's magazine Young Folks, and considered a coming of age story, it is an adventure tale of superb atmosphere, character, and action, as well as a wry commentary on the ambiguity of morality—as seen in Long John Silver—unusual for children's literature then and now. It is one of the most frequently dramatised of all novels, and its influence on popular lore about pirates can not be overestimated.",
          category: 'บันเทิงคดี',
          price: '613',
          id: 'Gezftq5aU5zMsnSuwKiI'
        },
        {
          author: 'Arthur Conan Doyle',
          release: true,
          category: 'บันเทิงคดี',
          bookTitle: 'The Adventures of Sherlock Holmes',
          genre: [
            'วิทยาศาสตร์',
            'ระทึกขวัญ',
            'โรแมนติก'
          ],
          description: 'A delight for a public which enjoys incident, mystery, and above all that matching of the wits of a clever man against the dumb resistance of the secrecy of inanimate things, which results in the triumph of the human intelligence.',
          createAt: {
            _seconds: 1653723744,
            _nanoseconds: 955000000
          },
          distributorId: 'LpWBgBNMJaXC39ygnkbkdkpzAC92',
          bookImage: null,
          price: '300',
          bookId: 'JynpLP4mGC4JqxOGp4S9',
          id: 'JynpLP4mGC4JqxOGp4S9'
        }
      ]
    }
  },
  async fetch () {
    const res = await this.$axios.$get(
      '/market/'
    )
    //     const res = await this.$axios.$get(
    //   '/market/'
    // )
    this.newBook = res.books
    console.log(res)
  },
  methods: {
    async searchButton () {
      // eslint-disable-next-line eqeqeq
      const categoryBuffer = this.category == '' ? '' : 'category=' + this.category
      // eslint-disable-next-line eqeqeq
      const genreBuffer = this.genre == '' ? '' : 'genre=' + this.genre
      const res = await this.$axios.$get('/market/filter?' + categoryBuffer + '&' + genreBuffer)
      console.log(res)
      this.newBook = res.bookDetail
    },
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
      this.snackbar = true
      console.error('Sad')
      // const that = this
      // this.$fire.auth
      //   .sendPasswordResetEmail(this.auth.email)
      //   .then(function () {
      //     that.snackbarText = 'reset link sent to ' + that.auth.email
      //     that.snackbar = true
      //   })
      //   .catch(function (error) {
      //     that.snackbarText = error.message
      //     that.snackbar = true
      //   })
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
  color: var(--v-texttopic-base) !important;
  background-color:#FF8C00;
  display: flex;
}
.category{
  color: var(--v-texttopic-base) !important;
  background-color:#FF8C00;
}
.addon{
  color: #FF8C00;
  display: flex;
  float: right;
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
.search-button{
  width: 100%;
  height: 100%;
}
.over-text{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.over-text-des{
display: -webkit-box;
-webkit-line-clamp: 5;
-webkit-box-orient: vertical;
overflow: hidden;
text-overflow: ellipsis;
}
</style>
