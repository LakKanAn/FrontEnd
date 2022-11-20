<template>
  <div class="inner-index-page">
    <div class="content-book-center mb-14">
      <v-col cols="12" sm="12" md="12" class="mb-4">
        <v-card outlined rounded="xl" class="pa-4" elevation="3">
          <v-row justify="center" class="mb-6">
            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-col cols="12" class="d-flex justify-center">
                <v-img
                  :src="mainBooks.bookImage"
                  max-height="447"
                  max-width="325"
                />
              </v-col>
              <v-col cols="12">
                <slot>
                  <payment :price="mainBooks.price" :id-book="idBook" />
                </slot>
              </v-col>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
              <div class="px-4">
                <v-card-subtitle class="py-1 px-0 text-caption text-sm-caption text-md-subtitle-1 text-lg-subtitle-1 text-xl-subtitle-1 orange--text text--darken-1">
                  {{ mainBooks.category }}
                </v-card-subtitle>
                <v-card-title class="pb-4 pt-0 px-0 text-subtitle-1 text-sm-subtitle-1 text-md-h4 text-lg-h4 text-xl-h4 ">
                  {{ mainBooks.bookTitle }}
                </v-card-title>
                <v-card-subtitle class="py-1 px-0 text-caption text-sm-caption text-md-h6 text-lg-h6 text-xl-h6">
                  โดย {{ mainBooks.author }}
                </v-card-subtitle>
                <div class="px-0">
                  <v-btn
                    v-for="(item,index) in mainBooks.genre"
                    :key="index"
                    color="#F6C35D"
                    rounded
                    dark
                    elevation="0"
                    class="pa-3 my-1 mr-1"
                  >
                    {{ item }}
                  </v-btn>
                </div>
                <v-card-subtitle class="py-1 px-0 text-caption text-sm-caption text-md-subtitle-1 text-lg-subtitle-1 text-xl-subtitle-1 orange--text text--darken-1">
                  เรื่องย่อ
                </v-card-subtitle>
                <v-card-subtitle class="text-body-2 text-sm-body-2 text-md-h6 text-lg-h6 text-xl-h6 pa-0 font-weight-regular">
                  {{ mainBooks.description }}
                </v-card-subtitle>
                <v-card-title class="pb-4 pt-4 px-0 text-h5 text-sm-h5 text-md-h4 text-lg-h4 text-xl-h4 orange--text text--darken-1 ">
                  ราคา {{ mainBooks.price }} บาท
                </v-card-title>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <div class="recommend-book">
        <v-col cols="12" sm="6" md="6">
          <v-list-item-title class="text-h4 mb-1 head-topic">
            หนังสือแนะนำ
          </v-list-item-title>
        </v-col>
        <v-row dense>
          <v-col v-for="(items, index) in newBook" :key="'new'+index" cols="12" sm="12" md="4">
            <bookcard :main="false" :data-all="items" />
          </v-col>
        </v-row>
      </div>
    </div>
    <compofooter />
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
      mainBooks: []
    }
  },
  async fetch () {
    let slug = this.$nuxt.$route.path
    slug = slug.split('/products/')
    const resMain = await this.$axios.$get(
      '/market/' + slug[1]
    )
    const res = await this.$axios.$get(
      '/market/'
    )
    this.idBook = slug[1]
    this.newBook = res.books.slice(0, 3).reverse()
    this.mainBooks = resMain.BookDetails
    typeof resMain.BookDetails.genre === 'string' ? this.mainBooks.genre = [resMain.BookDetails.genre] : this.mainBooks.genre = resMain.BookDetails.genre
  },
  methods: {
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
.inner-index-page{
    width: 100%;
}
.content-book-center{
  margin-top: 27px;
  margin-left: 10%;
  margin-right: 10%;
  background-color: white;
  /* height: 100%; */
}

@media only screen and (max-width: 600px) {
    .content-book-center {
  margin-left: 2%;
  margin-right: 2%;
  }
}
.topic{
  color: var(--v-texttopic-base) !important;
  background-color:#FF8C00;
  display: flex;
}
/* .category{
  color: var(--v-texttopic-base) !important;
  background-color:#FF8C00;
} */
.search-button{
  width: 100%;
}
.font-propmt{
    font-family: 'Prompt', sans-serif !important;
 }
.banner{
width: 100%;
background: #F6C35D;
font-family: 'Prompt';
font-style: normal;
font-weight: 600 !important;
font-size: 40px;
display: flex;
align-items: center;
}
.banner-subtitle{
font-style: normal !important;
font-weight: 400 !important;
/* font-size: 36px; */
}
.image-footer{
 margin-bottom: -30px;
}
</style>
