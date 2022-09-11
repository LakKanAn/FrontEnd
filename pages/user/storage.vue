<template>
  <div class="inner-index-page">
    <div :class="{'content-book-center':!$vuetify.theme.dark, 'content-book-center-dark':$vuetify.theme.dark} ">
      <div class="px-5">
        <v-col class="pa-0" cols="12" sm="8" md="6">
          <h1 class="topic justify-center">
            ทั้งหมดในชั้นหนังสือ ({{ newBook.length }})
          </h1>
        </v-col>
        <hr>
        <v-row class="card-book py-5">
          <v-col v-for="(items, index) in newBook" :key="index" cols="12" sm="6" md="6">
            <v-card outlined>
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
                  <v-card-actions>
                    <v-btn
                      text
                      outlined
                      color="#FF8C00"
                      @click="confirmDialog = true, currentId = items.bookId "
                    >
                      ลงทะเบียนแลกเปลี่ยน
                    </v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>

    <div :class="{'content-book-center':!$vuetify.theme.dark, 'content-book-center-dark':$vuetify.theme.dark} ">
      <div class="px-5">
        <v-col class="pa-0" cols="12" sm="8" md="6">
          <h1 class="topic justify-center">
            หนังสือที่ลงทะเบียนแลกเปลี่ยน ({{ postBook.length }})
          </h1>
        </v-col>
        <hr>
        <v-row class="card-book py-5">
          <v-col v-for="(items, index) in postBook" :key="index" cols="12" sm="6" md="6">
            <v-card outlined>
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
                  <v-card-actions>
                    <v-row>
                      <v-col cols="12" sm="6" md="6" lg="6">
                        <v-btn
                          text
                          outlined
                          color="#FF8C00"
                          @click="cancelDialog = true, currentCancelId = items.postId "
                        >
                          ยกเลิกการลงทะเบียน
                        </v-btn>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" lg="6">
                        <v-btn
                          text
                          outlined
                          color="#FF8C00"
                          @click="routerGoTrade(items.postId)"
                        >
                          เข้าสู่หน้าแลกเปลี่ยน
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <!-- <v-card class="br-bot" outlined @click="routerGoTrade(items.postId)">
              <v-img
                :src="items.bookImage"
                height="200px"
                max-width="200"
              />
              <v-card-title class="pb-2 pt-2 px-0 storage-over-text">
                {{ items.bookTitle }}
              </v-card-title>
            </v-card> -->
      </div>
    </div>
    <div :class="{'content-book-center':!$vuetify.theme.dark, 'content-book-center-dark':$vuetify.theme.dark} ">
      <div class="px-5">
        <v-col class="pa-0" cols="12" sm="10" md="6">
          <h1 class="topic justify-center">
            หนังสือที่ได้รับการแลกเปลี่ยนแล้ว ({{ finishBook.length }})
          </h1>
        </v-col>
        <hr>
        <v-row class="card-book py-5">
          <v-col v-for="(items, index) in finishBook" :key="index" cols="12" sm="6" md="6">
            <v-card outlined>
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
                  <v-card-text class="pa-0 over-text-des">
                    จาก {{ items.description }}
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <!-- <v-card class="br-bot" outlined @click="routerGoTrade(items.postId)">
              <v-img
                :src="items.bookImage"
                height="200px"
                max-width="200"
              />
              <v-card-title class="pb-2 pt-2 px-0 storage-over-text">
                {{ items.bookTitle }}
              </v-card-title>
            </v-card> -->
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
    registerBook () {
      this.$axios.$post('/users/bookshelf/' + this.currentId + '/post', { timeSet: Number(this.selected) })
    },
    cancelBook () {
      this.$axios.$post('/users/bookshelf/' + this.currentCancelId + '/cancel')
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
-webkit-line-clamp: 5;
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
</style>
