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

      <div class="px-5 mb-10">
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
      </div>

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
    // const res = {
    //   books: [
    //     {
    //       createAt: {
    //         _seconds: 1653722464,
    //         _nanoseconds: 652000000
    //       },
    //       bookId: 'Gezftq5aU5zMsnSuwKiI',
    //       distributorId: 'LpWBgBNMJaXC39ygnkbkdkpzAC92',
    //       release: true,
    //       genre: [
    //         'วิทยาศาสตร์',
    //         'ผจญภัย',
    //         'ระทึกขวัญ'
    //       ],
    //       price: '613',
    //       description: "A masterful tale of ''buccaneers and buried gold''. First published in the children's magazine Young Folks, and considered a coming of age story, it is an adventure tale of superb atmosphere, character, and action, as well as a wry commentary on the ambiguity of morality—as seen in Long John Silver—unusual for children's literature then and now. It is one of the most frequently dramatised of all novels, and its influence on popular lore about pirates can not be overestimated.",
    //       author: 'Robert Louis Stevenson',
    //       category: 'บันเทิงคดี',
    //       bookImage: null,
    //       bookTitle: 'Treasure Island',
    //       id: 'Gezftq5aU5zMsnSuwKiI'
    //     },
    //     {
    //       bookId: 'JynpLP4mGC4JqxOGp4S9',
    //       release: true,
    //       distributorId: 'LpWBgBNMJaXC39ygnkbkdkpzAC92',
    //       price: '300',
    //       bookTitle: 'The Adventures of Sherlock Holmes',
    //       author: 'Arthur Conan Doyle',
    //       category: 'บันเทิงคดี',
    //       createAt: {
    //         _seconds: 1653723744,
    //         _nanoseconds: 955000000
    //       },
    //       description: 'A delight for a public which enjoys incident, mystery, and above all that matching of the wits of a clever man against the dumb resistance of the secrecy of inanimate things, which results in the triumph of the human intelligence.',
    //       bookImage: null,
    //       genre: [
    //         'วิทยาศาสตร์',
    //         'ระทึกขวัญ',
    //         'โรแมนติก'
    //       ],
    //       id: 'JynpLP4mGC4JqxOGp4S9'
    //     },
    //     {
    //       price: '294',
    //       bookTitle: 'Adventures of pinocchio',
    //       bookImage: null,
    //       release: true,
    //       bookId: 'cQnyLdr8ioehbVxgRUnM',
    //       author: 'Carlo Collodi',
    //       createAt: {
    //         _seconds: 1662916542,
    //         _nanoseconds: 828000000
    //       },
    //       category: 'บันเทิงคดี',
    //       description: "rionette and, what is much worse, you have a wooden head.\" At these last words, Pinocchio jumped up in a fury, took a hammer from the bench, and threw it with all his strength at the Talking Cricket.  Perhaps he did not think he would strike it. But, sad to relate, my dear children, he did hit the Cricket, straight on its head.  With a last weak \"cri-cri-cri\" the poor Cricket fell from the wall, dead!  CHAPTER 5 Pinocchio is hungry and looks for an egg to cook himself an omelet; but, to his surprise, the omelet flies out of the window.  If the Cricket's death scared Pinocchio at all, it was only for a very few moments. For, as night came on, a queer, empty feeling at the pit of his stomach reminded the Marionette that he had eaten nothing as yet.  A boy's appetite grows very fast, and in a few moments the queer, empty feeling had become hunger, and the hunger grew bigger and bigger, until soon he was as ravenous as a bear.  Poor Pinocchio ran to the fire",
    //       distributorId: 'LpWBgBNMJaXC39ygnkbkdkpzAC92',
    //       genre: [
    //         'โรแมนติก',
    //         'ระทึกขวัญ'
    //       ],
    //       id: 'cQnyLdr8ioehbVxgRUnM'
    //     },
    //     {
    //       bookTitle: 'Alice in Wonderland',
    //       author: 'Lewis Carroll',
    //       release: true,
    //       genre: [
    //         'วิทยาศาสตร์',
    //         'ต่อสู้',
    //         'แฟนตาซี',
    //         'ตลก'
    //       ],
    //       description: "The story of a girl named Alice who falls down a rabbit hole into a fantasy world populated by peculiar and anthropomorphic creatures. The tale is filled with allusions to Dodgson's friends. The tale plays with logic in ways that have given the story lasting popularity with adults as well as children. It is considered to be one of the most characteristic examples of the genre of literary nonsense, and its narrative course and structure have been enormously influential, especially in the fantasy genre.",
    //       price: '450',
    //       createAt: {
    //         _seconds: 1661229962,
    //         _nanoseconds: 540000000
    //       },
    //       category: 'บันเทิงคดี',
    //       distributorId: 'LpWBgBNMJaXC39ygnkbkdkpzAC92',
    //       bookId: 'oE6KcAgwgJGKsyuYW8py',
    //       bookImage: null,
    //       id: 'oE6KcAgwgJGKsyuYW8py'
    //     },
    //     {
    //       category: 'บันเทิงคดี',
    //       description: "A missing student. A gunned-down detective. A woman in fear for her life. All three are connected. Detective Inspector Carl Sant and his team get on the case. But what links the disappearance of a university student, the death of an off-duty police sergeant, and a professor reluctant to help them solve the case? Their only clue is a sequence of numbers, etched on a misty window. Soon, both the past and the present are on a collision course with the very heart of Sant’s profession. Racing against time, D.I. Sant must find out what's behind the mysterious events - before the bodies start piling up.",
    //       author: 'Dan Laughey',
    //       release: true,
    //       bookImage: null,
    //       genre: [
    //         'สืบสวนสอบสวน',
    //         'ระทึกขวัญ'
    //       ],
    //       price: '300',
    //       createAt: {
    //         _seconds: 1662915763,
    //         _nanoseconds: 2000000
    //       },
    //       bookTitle: 'Chloe-Lost Girl',
    //       distributorId: 'LpWBgBNMJaXC39ygnkbkdkpzAC92',
    //       bookId: 'pY8BHtVsWDlCec2cCoy4',
    //       id: 'pY8BHtVsWDlCec2cCoy4'
    //     }
    //   ]
    // }
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
      console.log(res)
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
