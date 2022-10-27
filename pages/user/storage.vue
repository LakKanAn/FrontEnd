<template>
  <div class="inner-index-page font-propmt">
    <div :class="{'content-book-center':!$vuetify.theme.dark, 'content-book-center-dark':$vuetify.theme.dark} ">
      <div class="px-5">
        <v-col cols="12" sm="12" md="12">
          <v-tabs
            v-model="currentItem"
            centered
            grow
          >
            <v-tab>
              ทั้งหมดในชั้นหนังสือ ({{ newBook.length }})
            </v-tab>
            <v-tab>
              หนังสือที่ลงทะเบียนแลกเปลี่ยน ({{ postBook.length }})
            </v-tab>
            <v-tab>
              หนังสือที่ได้รับการแลกเปลี่ยนแล้ว ({{ finishBook.length }})
            </v-tab>
          </v-tabs>
        </v-col>
        <v-row v-if="currentItem == 0" class="card-book py-5">
          <div v-if="newBook.length !== 0">
            <v-col v-for="(items, index) in newBook" :key="index" cols="12" sm="12" md="12">
              <v-card outlined>
                <v-row class="br-bot">
                  <v-col cols="12" sm="1" md="1">
                    <v-img
                      class="ma-auto"
                      :src="items.bookImage"
                      height="190"
                      width="160"
                    />
                  </v-col>
                  <v-col cols="12" sm="8" md="8">
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
                  <v-col cols="3" sm="3" md="3" class="ma-auto">
                    <div class="d-flex justify-center mb-2">
                      <v-btn
                        elevation="4"
                        outlined
                        color="#FF8C00"
                        x-large
                        @click="readBook(items.bookId)"
                      >
                        อ่านหนังสือ
                      </v-btn>
                    </div>
                    <div class="d-flex justify-center">
                      <v-btn
                        elevation="4"
                        outlined
                        color="#FF8C00"
                        x-large
                        @click="confirmDialog = true, currentId = items.bookId "
                      >
                        ลงทะเบียนแลกเปลี่ยน
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </div>
          <div v-if="newBook.length == 0" class="d-flex justify-center ma-auto">
            <div class="ma-auto my-16">
              <v-img :src="require('~/assets/image/stack_of_books.png')" max-width="444" />
              <p class="mt-6 text-center p-no-data">
                ยังไม่มีหนังสือในชั้น
              </p>
            </div>
          </div>
        </v-row>

        <v-row v-if="currentItem == 1" class="card-book py-5">
          <div v-if="postBook.length !== 0">
            <v-col v-for="(items, index) in postBook" :key="index" cols="12" sm="12" md="12">
              <v-card outlined>
                <v-row class="br-bot">
                  <v-col cols="12" sm="1" md="1">
                    <v-img
                      class="ma-auto"
                      :src="items.bookImage"
                      height="190"
                      width="160"
                    />
                  </v-col>
                  <v-col cols="12" sm="8" md="8">
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
                  <v-col cols="3" sm="3" md="3" class="ma-auto">
                    <div class="d-flex justify-center mb-2">
                      <v-btn
                        elevation="4"
                        outlined
                        color="#FF8C00"
                        x-large
                        @click="cancelDialog = true, currentCancelId = items.postId "
                      >
                        ยกเลิกการลงทะเบียน
                      </v-btn>
                    </div>
                    <div class="d-flex justify-center">
                      <v-btn
                        elevation="4"
                        outlined
                        color="#FF8C00"
                        x-large
                        @click="routerGoTrade(items.postId)"
                      >
                        เข้าสู่หน้าแลกเปลี่ยน
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </div>
          <div v-if="postBook.length == 0" class="d-flex justify-center ma-auto">
            <div class="mx-auto my-16">
              <v-img :src="require('~/assets/image/stack_of_books.png')" max-width="444" />
              <p class="mt-6 text-center p-no-data">
                ยังไม่มีหนังสือที่ลงทะเบียนแลกเปลี่ยน
              </p>
            </div>
          </div>
        </v-row>

        <v-row v-if="currentItem == 2" class="card-book py-5">
          <div v-if="finishBook.length !== 0">
            <v-col v-for="(items, index) in finishBook" :key="index" cols="12" sm="12" md="12">
              <v-card outlined>
                <v-row class="br-bot">
                  <v-col cols="12" sm="1" md="1">
                    <v-img
                      class="ma-auto"
                      :src="items.bookImage"
                      height="190"
                      width="160"
                    />
                  </v-col>
                  <v-col cols="12" sm="8" md="8">
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
                  <v-col cols="3" sm="3" md="3" class="ma-auto">
                    <div class="d-flex justify-center">
                      <v-btn
                        elevation="4"
                        outlined
                        color="#FF8C00"
                        x-large
                        @click="readBook(items.bookId)"
                      >
                        อ่านหนังสือ
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </div>
          <div v-if="finishBook.length == 0" class="d-flex justify-center ma-auto">
            <div class="mx-auto my-16">
              <v-img :src="require('~/assets/image/stack_of_books.png')" max-width="444" />
              <p class="mt-6 text-center p-no-data">
                ยังไม่มีหนังสือที่ได้รับการแลกเปลี่ยน
              </p>
            </div>
          </div>
        </v-row>
      </div>
    </div>

    <v-dialog
      v-model="confirmDialog"
      persistent
      max-width="400"
    >
      <v-card>
        <v-card-title>
          กรุณาเลือกจำนวนวันที่จะแลกเปลี่ยน
        </v-card-title>

        <v-card-text>
          <v-radio-group
            v-model="selected"
            column
          >
            <v-radio
              label="1 วัน"
              value="1"
            />
            <v-radio
              label="3 วัน"
              value="3"
            />
            <v-radio
              label="7 วัน"
              value="7"
            />
            <v-radio
              label="14 วัน"
              value="14"
            />
          </v-radio-group>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="#FF8C00"
            text
            @click="confirmDialog = false"
          >
            ยกเลิก
          </v-btn>

          <v-btn
            color="#FF8C00"
            text
            @click="registerBook"
          >
            ตกลง
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="cancelDialog"
      persistent
      max-width="400"
    >
      <v-card>
        <v-card-title>
          กรุณายืนยันที่จะยกเลิกการลงทะเบียน
        </v-card-title>

        <v-card-text>
          คุณต้องการที่จะยกเลิกการลงทะเบียนแลกเปลี่ยนหนังสือหรือไม่ ?
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="#FF8C00"
            text
            @click="cancelDialog = false"
          >
            ยกเลิก
          </v-btn>

          <v-btn
            color="#FF8C00"
            text
            @click="cancelBook"
          >
            ตกลง
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  middleware: ['protectUser', 'authCheck'],
  data () {
    return {
      currentItem: '',
      snackbar: false,
      snackbarText: 'No error message',
      confirmDialog: false,
      cancelDialog: false,
      selected: '',
      currentId: '',
      currentCancelId: '',
      auth: {
        email: '',
        password: ''
      },
      newBook: [],
      postBook: [],
      finishBook: []
    }
  },
  async fetch () {
    const res = await this.$axios.$get(
      '/users/bookshelf'
    )
    const resPost = await this.$axios.$get(
      '/users/bookpost'
    )
    const resFinish = await this.$axios.$get(
      '/users/booktrade'
    )
    this.newBook = res.bookDetail.reverse()
    this.postBook = resPost.bookDetail.reverse()
    this.finishBook = resFinish.bookDetail.reverse()
  },
  methods: {
    login () {
      this.$nuxt.$router.push('/login')
    },
    routerGo (item) {
      this.$nuxt.$router.push('/products/' + item)
    },
    readBook (item) {
      this.$nuxt.$router.push('/products/readPDF?book=' + item + '&trade=' + false)
    },
    tradeReadBook (item) {
      this.$nuxt.$router.push('/products/readPDF?book=' + item + '&trade=' + true)
    },
    registerBook () {
      this.$axios.$post('/users/bookshelf/' + this.currentId + '/post', { timeSet: Number(this.selected) })
      setTimeout(location.reload(), 3000)
    },
    cancelBook () {
      this.$axios.$post('/users/bookshelf/' + this.currentCancelId + '/cancel')
      setTimeout(location.reload(), 3000)
    },
    routerGoTrade (item) {
      localStorage.setItem('owner-trade', item)
      this.$nuxt.$router.push('/market/tradeconfirm')
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
}
.content-book-center{
  padding-top: 30px;
  margin-left: 10%;
  margin-right: 10%;
  background-color: white;
}
.content-book-center-dark{
  padding-top: 30px;
  margin-left: 10%;
  margin-right: 10%;
  background-color: #1E1E1E;
  background-repeat: repeat;
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
.storage-over-text{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.over-text{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.over-text-des{
display: -webkit-box;
-webkit-line-clamp: 4;
-webkit-box-orient: vertical;
overflow: hidden;
text-overflow: ellipsis;
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
.v-tab {
  font-family: 'Prompt';
font-style: normal;
font-weight: 400;
font-size: 20px;
}
.v-tabs-slider-wrapper {
  height: 3px !important;
}
.font-propmt{
    font-family: 'Prompt', sans-serif !important;
 }
 .p-no-data {
  font-family: 'Prompt';
font-style: normal;
font-weight: 400;
font-size: 24px;
 }
</style>
