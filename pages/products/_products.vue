<template>
  <div class="inner-index-page">
    <div :class="{'content-book-center':!$vuetify.theme.dark, 'content-book-center-dark':$vuetify.theme.dark} ">
      <div class="px-5">
        <v-col class="pa-0" cols="12" sm="12" md="12">
          <p class="product-topic justify-center">
            {{ mainBooks.bookTitle }}
          </p>
        </v-col>
        <hr>
        <v-row class="main-card-book py-5">
          <v-col cols="12" sm="12" md="8">
            <div class="d-flex justify-center">
            <v-img :src="mainBooks.bookImage" class="image-cover" max-width="400" />
            </div>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-card class="detail-card-book br-bot" outlined>
              <v-card-title class="pb-6 pt-0 px-0 over-text">
                ผู้เขียน : {{ mainBooks.author }}
              </v-card-title>
              <v-card-subtitle class="py-4 px-0 over-text">
                หมวดหมู่ : {{ mainBooks.category }}
              </v-card-subtitle>
              <v-card-subtitle class="py-4 px-0 over-text">
                ประเภท : {{ mainBooks.genre }}
              </v-card-subtitle>
              <v-card-subtitle class="py-4 px-0 over-text">
                ความยาวหน้า : ****
              </v-card-subtitle>
            </v-card>
            <div class="buy-max">
              <slot>
                <payment :price="mainBooks.price" :id-book="idBook" />
              </slot>
              <v-col class="ma-auto d-flex justify-center">
                <v-btn
                  elevation="2"
                  outlined
                  rounded
                  large
                  class="ma-auto test-button justify-center"
                  disabled
                >
                  ทดลองอ่าน
                </v-btn>
              </v-col>
            </div>
          </v-col>
        </v-row>

        <v-row class="card-book pb-5 pt-0">
          <v-col cols="12" sm="12" md="8">
            <v-card class="main-card-book br-bot card-description " outlined>
              <v-card-title class="pb-4 pt-4 px-4 over-text">
                เรื่องย่อ
              </v-card-title>
              <v-card-text class="text--primary">
                <div>{{ mainBooks.description }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <div class="buy-min">
          <v-col class="justify-center">
            <slot>
              <payment :price="mainBooks.price" :id-book="idBook" />
            </slot>
          </v-col>

          <v-col class="ma-auto d-flex justify-center">
            <v-btn
              elevation="2"
              outlined
              rounded
              large
              class="ma-auto test-button justify-center"
              disabled
            >
              ทดลองอ่าน
            </v-btn>
          </v-col>
        </div>

        <div class="pt-10">
          <v-col class="pa-0" cols="8" sm="6" md="3">
            <h1 class="topic justify-center">
              หนังสือมาใหม่
            </h1>
          </v-col>
          <hr>
          <v-row class="main-card-book py-5">
            <v-col v-for="(items, index) in newBook.slice(0,4)" :key="index" cols="6" sm="6" md="3">
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
  </div>
</template>

<script>
import payment from '~/components/payment.vue'
export default {
  components: { payment },
  data () {
    return {
      modal: false,
      idBook: '',
      snackbar: false,
      snackbarText: 'No error message',
      auth: {
        email: '',
        password: ''
      },
      newBook: [],
      mainBooks: {
        author: 'dsadasd',
        createAt: {
          _seconds: 1653404873,
          _nanoseconds: 814000000
        },
        bookImage: 'https://minioapi.lakkanan.shop/books/281244747_756397855358450_999238111691385875_n.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIOSFODNN7EXAMPLE%2F20220525%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220525T110539Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=6a2a48a592b9ae03513defb77ec851b7de2e0e4c894f1aacc96812f8d7b262bb',
        release: true,
        bookId: 'HyPJlWI0067nttlGIdgm',
        price: '123123',
        distributorId: '1hOKs2HCWyal8VrhgLIZQ7VE32B3',
        genre: 'นิตยสาร',
        Category: 'สิ่งพิมพ์',
        fileUrl: 'https://www.googleapis.com/books/',
        description: '1231232',
        category: 'วารสาร',
        bookTitle: 'dsadasdas',
        id: 'HyPJlWI0067nttlGIdgm'
      }
    }
  },
  async fetch () {
    let slug = this.$nuxt.$route.path
    slug = slug.split('/products/') // When calling /abc the slug will be "abc"
    console.log(slug[1])
    const resMain = await this.$axios.$get(
      '/market/' + slug[1]
    )
    const res = await this.$axios.$get(
      '/market/'
    )
    this.idBook = slug[1]
    console.log(this.idBook)
    this.newBook = res.books.reverse()
    console.log(resMain.BookDetails)
    this.mainBooks = resMain.BookDetails
    this.mainBooks.genre = this.mainBooks.genre.join()
  },
  methods: {
    login () {
      this.$nuxt.$router.push('/login')
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
    routerGo (item) {
      this.$nuxt.$router.push('/products/' + item)
    }
  }
}
</script>

<style>
.v-application{
    font-family: 'Prompt', sans-serif !important;
 }
.detail-card-book .v-card__title{
    display: block;
    text-align: center !important;
    font-size: 24px;
}
.detail-card-book .v-card__subtitle{
    text-align: center;
    font-size: 18px;
}
.login-button-router{
    background-color: aqua !important;
}
.content-book-center{
  padding-top: 30px;
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 2%;
  background-color: white;
  height: 100%;
}
.content-book-center-dark{
  padding-top: 30px;
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 2%;
  background-color: #1E1E1E;
  height: 100%;
}
.buy-min{
    display: none;
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
@media only screen and (max-width: 900px) {
  .buy-min{
    display: flex;
}
  .buy-max{
    display: none;
}
}
.product-topic{
  display: flex;
  font-size: 32px;
}
hr{
  height: 3px;
  color: #FF8C00 !important;
  background-color:#FF8C00 !important;
  border-color: #FF8C00 !important;
}
.main-card-book .v-card__title{
    display: block;
    text-align: left !important;
}
.main-card-book .v-card__subtitle{
    display: block;
    text-align: left !important;
}
.card-description.theme--light.v-sheet--outlined {
    border:  3px solid #FF8C00 !important;
}
.card-description.theme--dark.v-sheet--outlined {
    border:  3px solid #FF8C00 !important;
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
.topic{
  background-color:#FF8C00;
  display: flex;
}
.over-text{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.image-cover{
    height: 100%;
}
.test-button{
    display: flex;
    width: 80%;
    border-color: #FF8C00;
}
.buy-button{
    display: flex;
    width: 80%;
}
.inner-index-page{
    width: 100%;
    height: 100%;
    background-image: url("~/assets/background/book-bg-flat.png");
    background-size: auto;
    background-repeat: repeat;
}
</style>
