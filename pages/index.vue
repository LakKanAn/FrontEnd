<template>
  <div class="inner-index-page font-propmt">
    <v-row class="banner d-flex justify-center ma-0 pa-0" dense>
      <v-col cols="3" class="pa-0 d-sm-none d-none d-md-flex d-lg-flex d-xl-flex">
        <v-img :src="require('~/assets/image/people_read.png')" max-width="444" class="ma-0" />
      </v-col>
      <v-col cols="12" md="6" lg="6" xl="6" class="pa-0 d-sm-none d-none d-md-flex d-lg-flex d-xl-flex">
        <span class="mx-auto">
          <p class="mb-0 text-h5 text-md-h4 text-lg-h4 text-xl-h4 font-weight-bold">LakKanAn (รักการอ่าน)</p>
          <p class="banner-subtitle text-h6 text-md-h6 text-lg-h4 text-xl-h4">เว็บแอปพลิเคชันจําหน่ายและแลกเปลี่ยนหนังสือ</p>
        </span>
      </v-col>
      <v-col cols="12" md="6" lg="6" xl="6" class="py-4 px-0 mx-0 d-sm-flex d-flex d-md-none d-lg-none d-xl-none">
        <v-img :src="require('~/assets/logo/index_mobile.png')" max-width="350" height="53" class="ma-auto" />
      </v-col>
      <v-col cols="12" class="pb-0 pl-6 pr-2 d-sm-flex d-flex d-md-none d-lg-none d-xl-none">
        <v-img :src="require('~/assets/image/people_read.png')" max-width="300" class="ma-auto" />
      </v-col>
    </v-row>
    <div class="content-book-center">
      <div class="recommend-book">
        <v-col cols="12" sm="6" md="6">
          <v-list-item-title class="text-h4 mb-1 head-topic">
            หนังสือแนะนำ
          </v-list-item-title>
        </v-col>
        <v-row dense>
          <v-col v-for="(items, index) in hotBook" :key="'new'+index" cols="12" sm="12" md="6">
            <bookcard :main="true" :data-all="items" />
          </v-col>
        </v-row>
      </div>

      <div class="new-book">
        <v-col cols="12" sm="6" md="6">
          <v-list-item-title class="text-h4 mb-1 head-topic">
            หนังสือมาใหม่
          </v-list-item-title>
        </v-col>
        <v-row dense>
          <v-col v-for="(items, index) in newBook" :key="'new'+index" cols="12" sm="12" md="6">
            <bookcard :main="true" :data-all="items" />
          </v-col>
        </v-row>
      </div>

      <div class="all-book">
        <v-col cols="12" sm="6" md="6">
          <v-list-item-title class="text-h4 mb-1 head-topic">
            หนังสือทั้งหมด
          </v-list-item-title>
        </v-col>
        <v-row class="px-3 pb-3">
          <v-col cols="12" sm="4" md="6">
            <p class="mb-1 pa-0">
              ค้นหาหนังสือ
            </p>
            <v-text-field
              v-model="choiceName"
              solo
              hide-details
              placeholder="ค้นหาชื่อหนังสือ"
              prepend-inner-icon="mdi-magnify"
              @input="searchButton($event)"
            />
          </v-col>
          <v-col cols="6" sm="3" md="3">
            <p class="mb-1 pa-0">
              หมวดหมู่
            </p>
            <v-select
              v-model="genre"
              :items="choieGenre"
              solo
              hide-details
              value="ทั้งหมด"
              label="หมวดหมู่"
              @change="filterCategory($event)"
            />
          </v-col>
          <v-col cols="6" sm="3" md="3">
            <p class="mb-1 pa-0">
              ประเภท
            </p>
            <v-select
              v-model="category"
              :items="choieCategory"
              solo
              hide-details
              value="ทั้งหมด"
              label="ประเภท"
              @change="filterGenre($event)"
            />
          </v-col>
        </v-row>
        <div class="text-center d-flex justify-end">
          <v-pagination
            v-model="page"
            :length="15"
            :total-visible="7"
          />
        </div>
        <v-row dense>
          <v-col v-for="(items, index) in allBook" :key="'new'+index" cols="12" sm="12" md="6">
            <bookcard :main="true" :data-all="items" />
          </v-col>
        </v-row>
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
    </div>
    <compofooter />
  </div>
</template>

<script>
import bookcard from '~/components/bookcard.vue'
import compofooter from '~/components/compofooter.vue'
export default {
  components: { bookcard, compofooter },
  data () {
    return {
      snackbar: true,
      snackbarText: 'No error message',
      auth: {
        email: '',
        password: ''
      },
      choiceName: '',
      genre: '',
      category: '',
      choieGenre: [
        'ทั้งหมด',
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
        'ทั้งหมด',
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
      ],
      page: 1,
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram'
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
    // async searchButton () {
    //   // eslint-disable-next-line eqeqeq
    //   const categoryBuffer = this.category == '' ? '' : 'category=' + this.category
    //   // eslint-disable-next-line eqeqeq
    //   const genreBuffer = this.genre == '' ? '' : 'genre=' + this.genre
    //   const res = await this.$axios.$get('/market/filter?' + categoryBuffer + '&' + genreBuffer)
    //   this.allBook = res.bookDetail
    // },
    searchButton (event) {
      const raw = []
      // eslint-disable-next-line array-callback-return
      this.backupBook.filter((e) => {
        if (e.bookTitle.includes(event)) {
          raw.push(e)
        }
      })
      this.allBook = raw
    },
    filterGenre (event) {
      const raw = []
      // eslint-disable-next-line array-callback-return
      this.backupBook.filter((e) => {
        if (e.category.includes(event)) {
          raw.push(e)
        }
      })
      this.allBook = raw
    },
    filterCategory (event) {
      const raw = []
      // eslint-disable-next-line array-callback-return
      this.backupBook.filter((e) => {
        if (e.genre.includes(event)) {
          raw.push(e)
        }
      })
      this.allBook = raw
    },
    login () {
      this.$nuxt.$router.push('/login')
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
    height: 100%;
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
.v-sheet.v-card {
    border-radius: 0px !important;
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
.font-propmt{
    font-family: 'Prompt', sans-serif !important;
 }
 .theme--light.v-sheet--outlined {
    border: thin solid #FF8C00;
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
.all-book{
  margin-bottom: 20%;
}
</style>
