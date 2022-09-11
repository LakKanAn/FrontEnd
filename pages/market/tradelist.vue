<template>
  <div class="wid-80 ma-auto mt-5">
    <v-col class="pa-0" cols="12" sm="12" md="12">
      <h1 class="d-flex justify-center h1-trade">
        <img class="pr-2" src="~/assets/icon/trade.png" alt="trade-image">ศูนย์รวมการแลกเปลี่ยน
      </h1>
    </v-col>
    <v-row class="mt-4" justify="center">
      <v-col cols="12" sm="3" md="3" lg="3">
        <v-btn
          outlined
          elevation="0"
          color="#ff8c00"
          large
          class="mr-1"
          @click="routerBookShelf"
        >
          <v-icon
            right
            dark
            color="#ff8c00"
            class="mr-2"
          >
            mdi-clock-time-two-outline
          </v-icon>
          ประวัติการแลกเปลี่ยน
        </v-btn>
      </v-col>
      <v-col cols="12" sm="3" md="3" lg="3">
        <v-btn
          elevation="0"
          color="#ff8c00"
          large
          class="ml-1 exchange-button"
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
          <!-- <v-row class="pt-3">
            <v-bottom-navigation grow>
              <v-btn value="recent">
                <span>หนังสือยอดนิยม</span>
              </v-btn>

              <v-btn value="favorites">
                <span>ตั้งรายการใหม่</span>
              </v-btn>

              <v-btn value="nearby">
                <span>แลกเปลี่ยนเรียบร้อย</span>
              </v-btn>
            </v-bottom-navigation>
          </v-row> -->

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
              sm="5"
              lg="5"
              md="5"
              class="pa-0 mb-5"
            >
              <v-card outlined @click="routerGo(list.postId)">
                <v-row class="br-bot">
                  <v-col cols="12" sm="4" md="4">
                    <v-img
                      :src="list.bookImage"
                      height="311"
                      max-width="212"
                    />
                  </v-col>
                  <v-col cols="7" sm="7" md="7">
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
          </v-row>
          <!-- <v-row v-for="(list,index) in listBook" :key="index" class="mt-6">
            <v-col cols="12" class="pa-0">
              <v-card class="mt-6">
                <v-row>
                  <v-col cols="2" class="py-0">
                    <img :src="list.bookImage" alt="" width="100%" height="100%">
                  </v-col>
                  <v-col cols="6">
                    <p>{{ list.bookTitle }}</p>
                    <p>ผู้เขียน {{ list.author }}</p>
                  </v-col>
                  <v-col cols="2" class="text-center d-flex align-center justify-center">
                    <p>{{ list.category }}</p>
                  </v-col>
                  <v-col cols="2" class="text-center d-flex align-center justify-center">
                    <p>{{ list.day }} วัน</p>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row> -->
          <!-- <div class="text-center mt-10">
            <v-pagination
              v-model="page"
              :length="totalPage"
            />
          </div> -->
        </v-col>
        <!-- <v-col cols="3">
          <v-card outlined elevation="4">
            <div class="ma-4">
              <p class="text-center">
                ชื่อ
              </p>
              <v-text-field
                outlined
                placeholder="ชื่อ"
              />
              <p class="text-center">
                หมวดหมู่
              </p>
              <v-select
                dense
                outlined
                placeholder="หมวดหมู่"
              />
              <p class="text-center">
                ประเภท
              </p>
              <v-select
                dense
                outlined
                placeholder="ประเภท"
              />
              <p class="text-center">
                ระยะวัน
              </p>
              <v-select
                dense
                outlined
                placeholder="ประเภท"
              />
            </div>
          </v-card>
        </v-col> -->
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
      listBook: [
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
          id: 'Gezftq5aU5zMsnSuwKiI',
          day: '7'
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
          id: 'JynpLP4mGC4JqxOGp4S9',
          day: '7'
        }
      ]

    }
  },
  async fetch () {
    const res = await this.$axios.$get(
      '/trade/'
    )
    console.log(res)
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
      console.log(raw)
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
      console.log(raw)
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
}
</style>
