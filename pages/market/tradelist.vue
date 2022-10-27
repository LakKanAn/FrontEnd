<template>
  <div class="wid-80 ma-auto mt-5">
    <v-col class="pa-0" cols="12" sm="12" md="12">
      <h1 class="d-flex justify-center h1-trade">
        <img class="pr-2" src="~/assets/icon/trade.png" alt="trade-image">ศูนย์รวมการแลกเปลี่ยน
      </h1>
    </v-col>
    <v-row class="mt-4" justify="center">
      <v-col cols="12" sm="3" md="3" lg="3" class="d-flex justify-center">
        <v-btn
          outlined
          elevation="0"
          color="#ff8c00"
          large
          class=""
          @click="routerBookShelf"
        >
          <v-icon
            right
            dark
            color="#ff8c00"
            class="mr-1"
          >
            mdi-clock-time-two-outline
          </v-icon>
          ประวัติการแลกเปลี่ยน
        </v-btn>
      </v-col>
      <v-col cols="12" sm="3" md="3" lg="3" class="d-flex justify-center">
        <v-btn
          elevation="0"
          color="#ff8c00"
          large
          class="exchange-button"
          @click="routerBookShelf"
        >
          <v-icon
            right
            dark
            color="white"
            class="mr-2"
          >
            mdi-plus-circle
          </v-icon>
          สร้างคำขอแลกเปลี่ยน
        </v-btn>
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-bottom-navigation grow>
        <v-btn value="recent">
          <span>รายการที่ลงทะเบียน</span>
        </v-btn>

        <v-btn value="favorites">
          <span>รายการของฉัน</span>
        </v-btn>

        <v-btn value="nearby">
          <span>ประวัติ</span>
        </v-btn>
      </v-bottom-navigation>
    </v-row> -->

    <div class="body-market mt-5">
      <v-row class="mb-5">
        <v-col cols="12">
          <v-row justify="center" class="py-5">
            <v-col cols="12" sm="4" md="4">
              <v-text-field
                v-model="choieName"
                outlined
                hide-details
                label="ชื่อเรื่อง"
                @input="searchButton($event)"
              />
            </v-col>
            <v-col cols="6" sm="3" md="3">
              <v-select
                v-model="genre"
                :items="choieGenre"
                outlined
                hide-details
                label="หมวดหมู่"
                @change="filterCategory($event)"
              />
            </v-col>
            <v-col cols="6" sm="3" md="3">
              <v-select
                v-model="category"
                :items="choieCategory"
                outlined
                hide-details
                label="ประเภท"
                @change="filterGenre($event)"
              />
            </v-col>
            <!-- <v-col align-self="center" cols="2" sm="2" md="2">
              <v-btn color="#FF8C00" x-large class="text-center mb-0 search-button " @click="searchButton()">
                ค้นหา
              </v-btn>
            </v-col> -->
          </v-row>
          <hr class="mt-2">
          <v-row class="py-5" justify="center">
            <v-col
              v-for="(list,index) in listBook"
              :key="index"
              cols="12"
              sm="6"
              lg="5"
              md="6"
              class="pb-5 br-bot"
            >
              <v-card elevation="0" @click="routerGo(list.postId)">
                <v-row justify="center">
                  <v-col cols="12" sm="5" md="5" class="center-600">
                    <v-img
                      :src="list.bookImage"
                      class="ml-2"
                      height="311"
                      max-width="212"
                    />
                  </v-col>
                  <v-col cols="11" sm="7" md="7">
                    <v-card-title class="pb-4 pt-0 px-0 over-text">
                      {{ list.bookTitle }}
                    </v-card-title>

                    <v-card-subtitle class="py-1 px-0 over-text">
                      {{ list.author }}
                    </v-card-subtitle>
                    <v-card-subtitle class="py-1 px-0 over-text">
                      จากคุณ <span class="ownername">{{ list.ownerName }}</span>
                    </v-card-subtitle>
                    <v-card-subtitle class="py-1 px-0 d-flex align-end during">
                      <img class="pr-2" src="~/assets/icon/bi_clock.png"> ระยะเวลาการแลกเปลี่ยน: {{ list.during }} วัน
                    </v-card-subtitle>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <div v-if="listBook.length == 0" class="d-flex justify-center ma-auto">
              <div class="mx-auto my-16">
                <v-img :src="require('~/assets/image/stack_of_books.png')" max-width="444"/>
                <p class="mt-6 text-center p-no-data">
                  ไม่มีหนังสือที่ลงทะเบียนแลกเปลี่ยน
                </p>
              </div>
            </div>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
export default {
  middleware: ['protectUser', 'authCheck'],
  data () {
    return {
      page: 1,
      totalPage: 1,
      choieName: '',
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
      backUPList: [],
      listBook: []
    }
  },
  async fetch () {
    const res = await this.$axios.$get(
      '/trade/'
    )
    this.listBook = res.books
    this.backUPList = res.books
    this.page = res.config.currentPage
    this.totalPage = res.config.totalPage
  },
  methods: {
    routerGo (item) {
      localStorage.setItem('data-trade', item)
      this.$nuxt.$router.push('/market/tradepage')
    },
    routerBookShelf () {
      this.$nuxt.$router.push('/user/storage')
    },
    searchButton (event) {
      const raw = []
      // eslint-disable-next-line array-callback-return
      this.backUPList.filter((e) => {
        if (e.bookTitle.includes(event)) {
          raw.push(e)
        }
      })
      this.listBook = raw
    },
    filterGenre (event) {
      const raw = []
      // eslint-disable-next-line array-callback-return
      this.backUPList.filter((e) => {
        if (e.category.includes(event)) {
          raw.push(e)
        }
      })
      this.listBook = raw
    },
    filterCategory (event) {
      const raw = []
      // eslint-disable-next-line array-callback-return
      this.backUPList.filter((e) => {
        if (e.genre.includes(event)) {
          raw.push(e)
        }
      })
      this.listBook = raw
    }
  }
}
</script>

<style >
.wid-80 {
  width: 80%;
}
.body-market .v-sheet.v-card:not(.v-sheet--outlined) {
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%) !important;
}
.topic{
  display: flex;
}
hr{
  height: 3px;
  color: #FF8C00 !important;
  background-color:#FF8C00 !important;
  border-color: #FF8C00 !important;
}
.br-bot{
    border-bottom: 3px solid #FF8C00 !important;
}
.search-button{
  width: 100%;
  height: 100%;
}
.during{
  color: #FF8C00;
  font-weight: bold;
}
.ownername{
  color: #FF8C00;
}
.font-white{
  color: white;
}
.exchange-button{
  color: white !important;
}
@media screen and (max-width: 479px) {
  .h1-trade {
  font-size: 18px !important;
  align-items: center;
}
 .center-600 {
  display: flex;
  justify-self: center;
}
}
@media screen and (max-width: 600px) {
 .center-600 {
  display: flex;
  justify-content: center;
}
}
 .p-no-data {
  font-family: 'Prompt';
font-style: normal;
font-weight: 400;
font-size: 24px;
 }
</style>
