<template>
  <div class="inner-index-page font-propmt">
    <div class="content-book-center">
      <!-- <div :class="{'content-book-center':!$vuetify.theme.dark, 'content-book-center-dark':$vuetify.theme.dark} "> -->
      <div class="px-5 my-10">
        <v-card
          outlined
          class="pa-5"
        >
          <v-col class="pa-0" cols="12" sm="6" md="6">
            <v-list-item-title class="text-h4 mb-1 head-topic">
              หนังสือมาใหม่
            </v-list-item-title>
          </v-col>
          <v-row class="card-book py-5">
            <v-col v-for="(items, index) in newBook" :key="'new'+index" cols="12" sm="4" md="3">
              <v-card class="br-bot v-card-index" outlined @click="routerGo(items.bookId)">
                <v-img
                  :src="items.bookImage"
                  height="450px"
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
        </v-card>
      </div>

      <div class="px-5 mb-10">
        <v-card
          outlined
          class="pa-5"
        >
          <v-col class="pa-0" cols="12" sm="6" md="3">
            <v-list-item-title class="text-h4 mb-1 head-topic">
              หนังสือที่น่าสนใจ
            </v-list-item-title>
          </v-col>
          <v-row class="card-book py-5">
            <v-col v-for="(items, index) in hotBook" :key="'sd'+index" cols="12" sm="12" md="12">
              <v-card class="v-card-index" outlined @click="routerGo(items.bookId)">
                <v-row class="br-bot">
                  <v-col cols="12" sm="3" md="3">
                    <div class="d-flex justify-center">
                      <v-img
                        :src="items.bookImage"
                        height="311"
                        max-width="212"
                      />
                    </div>
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
                    <v-card-text class="pa-0 over-text-des">
                      <p> {{ items.description }}</p>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col v-for="(items, index) in subHotBook" :key="'th'+index" cols="12" sm="6" md="6">
              <v-card class="v-card-index" outlined @click="routerGo(items.bookId)">
                <v-row class="br-bot">
                  <v-col cols="5" sm="4" md="4">
                    <v-img
                      :src="items.bookImage"
                      height="238"
                      max-width="163"
                    />
                  </v-col>
                  <v-col cols="7" sm="8" md="8">
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
        </v-card>
      </div>

      <!-- <div class="px-5 mb-10">
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
      </div> -->

      <div class="px-5 pb-0">
        <v-col class="px-0 pb-0 " cols="12" sm="6" md="3">
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
          <v-col align-self="center" cols="12" sm="2" md="2" lg="2">
            <v-btn color="#FF8C00" x-large class="text-center mb-0 search-button wid-100" @click="searchButton()">
              ค้นหา
            </v-btn>
          </v-col>
        </v-row>
        <hr>
        <v-row class="card-book py-5">
          <v-col v-for="(items, index) in allBook" :key="'four'+index" cols="6" sm="4" md="3">
            <v-card class="br-bot v-card-index" outlined @click="routerGo(items.bookId)">
              <v-img
                :src="items.bookImage"
                height="450px"
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
      newBook: [],
      hotBook: [],
      subHotBook: [],
      allBook: [],
      backupBook: [],
      rules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!'
      ]
    }
  },
  async fetch () {
    const res = await this.$axios.$get(
      '/market/'
    )
    this.backupBook = res.books
    this.newBook = res.books.slice(0, 4)
    this.hotBook = res.books.slice(0, 4)
    this.subHotBook = res.books.slice(0, 4)
    this.allBook = res.books
    this.hotBook = this.hotBook.reverse()
  },
  methods: {
    async searchButton () {
      // eslint-disable-next-line eqeqeq
      const categoryBuffer = this.category == '' ? '' : 'category=' + this.category
      // eslint-disable-next-line eqeqeq
      const genreBuffer = this.genre == '' ? '' : 'genre=' + this.genre
      const res = await this.$axios.$get('/market/filter?' + categoryBuffer + '&' + genreBuffer)
      this.allBook = res.bookDetail
    },
    login () {
      this.$nuxt.$router.push('/login')
    },
    routerGo (item) {
      this.$nuxt.$router.push('/products/' + item)
    }
  }
}
</script>

<style scoped>
.v-application{
    font-family: 'Prompt', sans-serif !important;
 }
 .head-topic{
  font-family: 'Prompt', sans-serif !important;
  font-weight: 500;
 }
 .v-card-index .v-card__title{
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
    /* background-image: url("~/assets/background/book-bg-flat.png"); */
    background-size: auto;
    background-repeat: repeat;
}
.content-book-center{
  padding-top: 30px;
  margin-left: 20%;
  margin-right: 20%;
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
.theme--light.v-sheet--outlined .v-card-index{
    border: 0;
}
.theme--dark.v-sheet--outlined .v-card-index{
    border: 0;
}
.v-sheet.v-card {
    border-radius: 0px !important;
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
.wid-100{
  width: 100%;
}
.font-propmt{
    font-family: 'Prompt', sans-serif !important;
 }
 .theme--light.v-sheet--outlined {
    border: thin solid #FF8C00;
}
</style>
