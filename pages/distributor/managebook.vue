<template>
  <div class="justify-center align-self-center width-100">
    <v-row class="row-login" align="center" justify="center">
      <v-col cols="12" sm="12" md="12" align="center" justify="center">
        <div class="containner" tile outlined>
          <v-row>
            <v-col cols="11" sm="11" md="11">
              <h1 class="text-left">
                รายชื่อหนังสือที่ลงทะเบียน
              </h1>
            </v-col>
            <v-col cols="1">
              <v-btn
                elevation="4"
                outlined
                color="#FF8C00"
                x-large
                @click="addBook"
              >
                เพิ่มหนังสือ
              </v-btn>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="12" md="12" align="center" justify="center">
              <v-data-table
                :headers="headers"
                :items="books"
                item-key="bookTitle"
                calculate-widths
                :items-per-page="5"
                class="elevation-1 text-black"
              >
                <template #[`item.description`]="{ item }">
                  <p class="text-left over-text-des my-2">
                    {{ item.description }}
                  </p>
                </template>
                <template #[`item.actions`]="{ item }">
                  <v-icon
                    large
                    class="mr-2"
                    color="black"
                    @click="editBook(item)"
                  >
                    mdi-pencil
                  </v-icon>
                  <v-icon
                    large
                    color="black"
                    @click="deleteBook(item)"
                  >
                    mdi-delete
                  </v-icon>
                </template>
                <template #[`item.release`]="{ item }">
                  <v-simple-checkbox
                    v-model="item.release"
                    :ripple="false"
                    color="black"
                    @click="sendRelease(item)"
                  />
                </template>
                <template #no-data>
                  <p class="ma-0">
                    ไม่มีข้อมูล
                  </p>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  middleware: ['protectDis', 'authCheck'],
  data () {
    return {
      books: []
    }
  },
  async fetch () {
    const res = await this.$axios.$get(
      '/distributors/books'
    )
    this.books = res.books
  },
  computed: {
    headers () {
      return [
        { text: 'ชื่อหนังสือ', value: 'bookTitle', align: 'start', width: 400 },
        { text: 'ชื่อผู้เขียน', value: 'author', width: 200 },
        { text: 'หมวดหมู่', value: 'category', width: 100 },
        { text: 'รายละเอียด', value: 'description', width: 500 },
        { text: 'ราคา', value: 'price', align: 'center', width: 200 },
        { text: 'Actions', value: 'actions' },
        { text: 'ลงในร้านค้า', value: 'release' }
      ]
    }
  },
  methods: {
    addBook () {
      this.$nuxt.$router.push('/distributor/insertbook')
    },
    editBook (item) {
      const dataLocal = {
        bookTitle: item.bookTitle,
        author: item.author,
        category: item.category,
        genre: item.genre,
        description: item.description,
        price: item.price,
        bookId: item.bookId
      }
      localStorage.setItem('bookObject', JSON.stringify(dataLocal))
      this.$nuxt.$router.push('/distributor/editbook')
    },
    sendRelease (item) {
      this.$axios.$post('/distributors/books/edit/' + item.bookId,
        {
          bookTitle: item.bookTitle,
          author: item.author,
          category: item.category,
          description: item.description,
          price: item.price,
          genre: item.genre,
          release: item.release
        })
    },
    deleteBook (item) {
      this.$axios.$delete(
        '/distributors/books/delete/' + item.bookId
      )
      const id = element => element === item.bookId
      const eiei = this.books.findIndex(id)
      this.books.splice(eiei, 1)
    },
    setRowStyle (item) {
      return 'height-row'
    }
  }
}
</script>

<style>
.v-application{
    font-family: 'Prompt', sans-serif !important;
 }
.v-application .elevation-1 {
    box-shadow: 0px 2px 1px -2px rgba(0, 0, 0,0.1), 0px 1px 1px 0px rgb(0, 0, 0), 0px 1px 3px 5px rgba(0, 0, 0,0.1) !important;
}
.width-100{
  width: 100%;
  height: 100%;

}
.row-login{
    height: 100%;
}
.containner{
  margin-left: 3%;
  margin-right: 3%;
  padding: 5%;
  padding-top: 25px;
  padding-bottom: 35px;
}

.over-text-des{
display: -webkit-box;
-webkit-line-clamp: 5;
-webkit-box-orient: vertical;
overflow-y: scroll;
text-align: left;
}
.v-data-table {
  color: black !important;
  font-weight: 500 !important;
  font-size: 16px !important;
}
</style>
