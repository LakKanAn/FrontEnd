<template>
  <div class="inner-index-page font-propmt">
    <div :class="{'content-book-center':!$vuetify.theme.dark, 'content-book-center-dark':$vuetify.theme.dark} ">
      <v-col cols="12" sm="12" md="12">
        <v-tabs
          v-model="currentItem"
          mobile-breakpoint
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
      <div class="px-5">
        <v-row v-if="currentItem == 0" class="card-book py-4">
          <div v-if="newBook.length !== 0">
            <v-col v-for="(items, index) in newBook" :key="index" cols="12" sm="12" md="12">
              <v-card outlined>
                <v-row dense>
                  <v-col cols="12" sm="3" md="3">
                    <v-img
                      class="ma-auto"
                      :src="items.bookImage"
                      height="324"
                      width="255"
                    />
                  </v-col>
                  <v-col cols="12" sm="8" md="8">
                    <v-row dense>
                      <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                        <v-card-subtitle class="py-1 px-0">
                          {{ items.category }}
                        </v-card-subtitle>
                        <v-card-title class="pb-4 pt-0 px-0">
                          {{ items.bookTitle }}
                        </v-card-title>

                        <v-card-subtitle class="py-1 px-0">
                          {{ items.author }}
                        </v-card-subtitle>
                        <v-card-text class="pa-0">
                          <p> {{ items.description }}</p>
                        </v-card-text>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        lg="12"
                        xl="12"
                        class="ma-auto"
                      >
                        <div class="mb-2">
                          <v-btn
                            elevation="4"
                            x-large
                            color="primary"
                            rounded
                            width="40%"
                            @click="confirmDialog = true, currentId = items.bookId "
                          >
                            ลงทะเบียนแลกเปลี่ยน
                          </v-btn>
                          <v-btn
                            elevation="4"
                            x-large
                            rounded
                            outlined
                            width="40%"
                            @click="readBook(items.bookId)"
                          >
                            อ่านหนังสือ
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-divider class="my-4" />
              </v-card>
            </v-col>
          </div>
          <div v-if="newBook.length == 0" class="d-flex justify-center ma-auto">
            <div class="ma-auto my-16">
              <v-img :src="require('~/assets/image/stack_of_books.png')" max-width="325" class="ma-auto" />
              <p class="mt-6 text-center p-no-data">
                ยังไม่มีหนังสือในชั้น
              </p>
            </div>
          </div>
        </v-row>

        <v-row v-if="currentItem == 1" class="card-book py-4">
          <div v-if="postBook.length !== 0">
            <v-col v-for="(items, index) in postBook" :key="index" cols="12" sm="12" md="12">
              <v-card outlined>
                <v-row dense>
                  <v-col cols="12" sm="3" md="3" lg="3" xl="3">
                    <v-img
                      class="ma-auto"
                      :src="items.bookImage"
                      height="324"
                      width="255"
                    />
                  </v-col>
                  <v-col cols="12" sm="8" md="8" lg="8" xl="8">
                    <v-row dense>
                      <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                        <v-card-subtitle class="py-1 px-0">
                          {{ items.category }}
                        </v-card-subtitle>
                        <v-card-title class="pb-4 pt-0">
                          {{ items.bookTitle }}
                        </v-card-title>

                        <v-card-subtitle class="py-1">
                          {{ items.author }}
                        </v-card-subtitle>
                        <v-card-text class="pa-0">
                          <p> {{ items.description }}</p>
                        </v-card-text>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        lg="12"
                        xl="12"
                        class="ma-auto"
                      >
                        <div class="mb-2">
                          <v-btn
                            elevation="4"
                            color="primary"
                            x-large
                            rounded
                            width="40%"
                            @click="routerGoTrade(items.postId)"
                          >
                            เข้าสู่หน้าแลกเปลี่ยน
                          </v-btn>
                          <v-btn
                            elevation="4"
                            outlined
                            x-large
                            rounded
                            width="40%"
                            @click="cancelDialog = true, currentCancelId = items.postId "
                          >
                            ยกเลิกการลงทะเบียน
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-divider class="my-4" />
              </v-card>
            </v-col>
          </div>
          <div v-if="postBook.length == 0" class="d-flex justify-center ma-auto">
            <div class="mx-auto my-16">
              <v-img :src="require('~/assets/image/stack_of_books.png')" max-width="325" class="ma-auto" />
              <p class="mt-6 text-center p-no-data">
                ยังไม่มีหนังสือที่ลงทะเบียนแลกเปลี่ยน
              </p>
            </div>
          </div>
        </v-row>

        <v-row v-if="currentItem == 2" class="card-book py-4">
          <div v-if="finishBook.length !== 0">
            <v-col v-for="(items, index) in finishBook" :key="index" cols="12" sm="12" md="12">
              <v-card outlined>
                <v-row dense>
                  <v-col cols="12" sm="3" md="3" lg="3" xl="3">
                    <v-img
                      class="ma-auto"
                      :src="items.bookImage"
                      height="324"
                      width="255"
                    />
                  </v-col>
                  <v-col cols="12" sm="8" md="8" lg="8" xl="8">
                    <v-row dense>
                      <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                        <v-card-subtitle class="py-1 px-0">
                          {{ items.category }}
                        </v-card-subtitle>
                        <v-card-title class="pb-4 pt-0 px-0">
                          {{ items.bookTitle }}
                        </v-card-title>

                        <v-card-subtitle class="py-1 px-0">
                          {{ items.author }}
                        </v-card-subtitle>
                        <v-card-text class="pa-0">
                          <p> {{ items.description }}</p>
                        </v-card-text>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        lg="12"
                        xl="12"
                        class="ma-auto"
                      >
                        <div class="d-flex justify-center  mb-2">
                          <v-btn
                            elevation="4"
                            color="primary"
                            x-large
                            width="50%"
                            rounded
                            @click="tradeReadBook(items.exchangeId)"
                          >
                            อ่านหนังสือ
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-divider class="my-4" />
              </v-card>
            </v-col>
          </div>
          <div v-if="finishBook.length == 0" class="d-flex justify-center ma-auto">
            <div class="ma-auto my-16">
              <v-img :src="require('~/assets/image/stack_of_books.png')" max-width="325" class="ma-auto" />
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
      max-width="500"
    >
      <v-card>
        <v-card-title>
          กรุณาเลือกจำนวนวันที่จะแลกเปลี่ยน
        </v-card-title>
        <v-form ref="selectDay">
          <v-card-text class="px-10 py-0">
            <v-radio-group
              v-model="selected"
              column
              :rules="requireRules"
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
        </v-form>
        <v-card-actions class="py-0 px-10">
          <v-row justify="center" class="my-0">
            <v-col cols="12" md="6" lg="6" xl="6">
              <v-btn
                x-large
                color="primary"
                class="button-choice"
                @click="registerBook"
              >
                ยืนยัน
              </v-btn>
            </v-col>
            <v-col cols="12" md="6" lg="6" xl="6">
              <v-btn
                x-large
                color="black"
                class="button-choice"
                outlined
                @click="confirmDialog = false"
              >
                ยกเลิก
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="cancelDialog"
      persistent
      max-width="400"
    >
      <v-card>
        <div class="d-flex justify-center pt-5">
          <v-icon color="black" size="80">
            mdi-alert-circle-outline
          </v-icon>
        </div>
        <v-card-title class="d-flex justify-center">
          ยืนยันที่จะยกเลิกการลงทะเบียนหรือไม่
        </v-card-title>

        <v-card-actions>
          <v-row justify="center" class="my-0">
            <v-col cols="12" md="6" lg="6" xl="6">
              <v-btn
                x-large
                color="primary"
                class="button-choice"
                @click="cancelBook"
              >
                ยืนยัน
              </v-btn>
            </v-col>
            <v-col cols="12" md="6" lg="6" xl="6">
              <v-btn
                x-large
                color="black"
                class="button-choice"
                outlined
                @click="confirmDialog = false"
              >
                ยกเลิก
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="succDialog"
      max-width="350"
    >
      <v-card rounded="lg" class="pa-4">
        <div class="d-flex justify-center">
          <v-icon color="success" size="80">
            mdi-check-circle-outline
          </v-icon>
        </div>
        <v-card-title class="d-flex justify-center">
          {{ textDialogSuccess }}
        </v-card-title>
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
      textDialogSuccess: '',
      succDialog: false,
      currentCancelId: '',
      auth: {
        email: '',
        password: ''
      },
      newBook: [],
      postBook: [],
      finishBook: [],
      requireRules: [
        v => !!v || 'กรุณาเลือกวัน'
      ]
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
      if (this.$refs.selectDay.validate()) {
        this.$axios.$post('/users/bookshelf/' + this.currentId + '/post', { timeSet: Number(this.selected) })
        this.confirmDialog = false
        this.textDialogSuccess = 'ลงทะเบียนเรียบร้อย'
        this.succDialog = true
        setTimeout(() => { location.reload() }, 2000)
      }
    },
    cancelBook () {
      this.$axios.$post('/users/bookshelf/' + this.currentCancelId + '/cancel')
      this.cancelDialog = false
      this.textDialogSuccess = 'ยกเลิกการลงทะเบียนเรียบร้อย'
      this.succDialog = true
      setTimeout(() => { location.reload() }, 2000)
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
 .button-choice{
    display: flex;
    width: 100%;
}
</style>
