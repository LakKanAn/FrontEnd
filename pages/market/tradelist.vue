<template>
  <div class="wid-100 mx-auto">
    <div class="content-book-center">
      <v-row justify="space-between" class="mx-auto">
        <v-col
          class="pa-0 d-flex justify-center"
          cols="12"
          sm="12"
          md="6"
          lg="4"
          xl="4"
        >
          <span class="mb-0 mx-auto text-h5 text-sm-h5 text-md-h4 text-lg-h4 text-xl-h4 font-weight-medium">
            ศูนย์รวมการแลกเปลี่ยน
          </span>
        </v-col>
        <v-col
          class="pa-0 d-flex justify-end"
          cols="12"
          sm="12"
          md="3"
          lg="3"
          xl="3"
        >
          <v-btn
            elevation="0"
            color="#ff8c00"
            large
            rounded
            class="exchange-button ma-auto"
            @click="routerBookShelf"
          >
            สร้างคำขอแลกเปลี่ยน
          </v-btn>
        </v-col>
      </v-row>
      <div class="body-market mt-5">
        <v-row class="mb-5">
          <v-col cols="12">
            <v-row class="px-3 pb-3">
              <v-col cols="12" sm="4" md="6">
                <p class="mb-1 pa-0">
                  ค้นหาหนังสือ
                </p>
                <v-text-field
                  v-model="choieName"
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
                  @change="filterGenre($event)"
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
                  @change="filterCategory($event)"
                />
              </v-col>
            </v-row>
            <div class="text-center d-flex justify-end">
              <v-pagination
                v-model="page"
                :length="totalPage"
                :total-visible="7"
                @input="changePagination($event)"
              />
            </div>
            <v-row class="py-5">
              <v-col v-for="(items, index) in listBook" :key="'new'+index" cols="12" sm="12" md="6">
                <bookcard :main="true" :data-all="items" />
              </v-col>
              <!-- <v-col
              v-for="(list,index) in listBook"
              :key="index"
              cols="12"
              sm="6"
              lg="5"
              md="6"
              class="pb-5 br-bot"
            > -->
              <!-- <v-card elevation="0" @click="routerGo(list.postId)">
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
              </v-card> -->
              <!-- </v-col> -->
              <div v-if="listBook.length == 0" class="d-flex justify-center ma-auto">
                <div class="mx-auto my-16">
                  <v-img :src="require('~/assets/image/stack_of_books.png')" max-width="325" class="ma-auto" />
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
    <compofooter />
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
      genre: 'ทั้งหมด',
      category: 'ทั้งหมด',
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
      backupAllBook: [],
      backupBook: [],
      listBook: []
    }
  },
  async fetch () {
    const res = await this.$axios.$get(
      '/trade/'
    )
    this.listBook = res.books
    this.backupAllBook = res.books
    this.backupBook = res.books
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
    changePagination (event) {
      const startIndex = 2 * (event - 1)
      const endIndex = 2 * event
      this.listBook = this.backupAllBook.slice(startIndex, endIndex)
    },
    searchButton (event) {
      const raw = []
      // eslint-disable-next-line array-callback-return
      this.backupBook.filter((e) => {
        if (e.bookTitle.includes(event)) {
          raw.push(e)
        }
      })
      this.backupAllBook = raw
      this.totalPage = Math.floor(raw.length / 6)
      this.listBook = raw.slice(0, 6)
    },
    filterGenre (event) {
      let raw = []
      this.backupAllBook = this.backupBook
      if (event === 'ทั้งหมด') {
        if (this.category === 'ทั้งหมด') {
          raw = this.backupBook
          this.arrayLoop = this.backupBook
        } else {
          // eslint-disable-next-line array-callback-return
          this.backupBook.filter((e) => {
            if (e.category.includes(this.category)) {
              raw.push(e)
            }
          })
        }
      } else if (this.category === 'ทั้งหมด') {
        // eslint-disable-next-line array-callback-return
        this.backupAllBook.filter((e) => {
          if (e.genre.includes(event)) {
            raw.push(e)
          }
        })
      } else {
        const rawSencond = []
        // eslint-disable-next-line array-callback-return
        this.backupAllBook.filter((e) => {
          if (e.genre.includes(event)) {
            raw.push(e)
          }
        })
        // eslint-disable-next-line array-callback-return
        raw.filter((e) => {
          if (e.category.includes(this.category)) {
            rawSencond.push(e)
          }
        })
        raw = rawSencond
      }
      this.backupAllBook = raw
      this.arrayLoop = raw
      this.totalPage = Math.floor(raw.length / 6)
      this.listBook = raw.slice(0, 6)
    },
    filterCategory (event) {
      let raw = []
      this.backupAllBook = this.backupBook
      if (event === 'ทั้งหมด') {
        if (this.genre === 'ทั้งหมด') {
          raw = this.backupBook
        } else {
          // eslint-disable-next-line array-callback-return
          this.backupBook.filter((e) => {
            if (e.genre.includes(this.genre)) {
              raw.push(e)
            }
          })
        }
      } else if (this.genre === 'ทั้งหมด') {
        // eslint-disable-next-line array-callback-return
        this.backupBook.filter((e) => {
          if (e.category.includes(event)) {
            raw.push(e)
          }
        })
      } else {
        const rawSencond = []
        // eslint-disable-next-line array-callback-return
        this.backupAllBook.filter((e) => {
          if (e.category.includes(event)) {
            raw.push(e)
          }
        })
        // eslint-disable-next-line array-callback-return
        raw.filter((e) => {
          if (e.genre.includes(this.event)) {
            rawSencond.push(e)
          }
        })
        raw = rawSencond
      }
      this.backupAllBook = raw
      this.totalPage = Math.floor(raw.length / 6)
      this.listBook = raw.slice(0, 6)
    }
  }
}
</script>

<style >
.wid-100 {
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
.body-market .v-sheet.v-card:not(.v-sheet--outlined) {
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%) !important;
}
.topic{
  display: flex;
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
