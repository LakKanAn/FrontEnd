/* eslint-disable vue/valid-v-slot */
<template>
  <div class="justify-center align-self-center width-100">
    <v-row class="row-login" align="center" justify="center">
      <v-col cols="12" sm="12" md="12" align="center" justify="center">
        <v-card class="containner">
          <v-row align="center" justify="center">
            <v-col cols="12" sm="12" md="12" align="center" justify="center">
              <h1>รายชื่อหนังสือที่ลงทะเบียน</h1>
            </v-col>
          </v-row>
          <v-row align="center" justify="end">
            <v-col
              class="pa-0"
              cols="4"
              sm="4"
              md="4"
              align="center"
              justify="center"
            >
              <v-btn @click="addBook">
                เพิ่มหนังสือ
              </v-btn>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="12" md="12" align="center" justify="center">
              <v-data-table
                :headers="headers"
                :items="books"
                :items-per-page="5"
                class="elevation-1"
              >
                <template #[`item.actions`]="{ item }">
                  <v-icon
                    small
                    class="mr-2"
                    @click="editBook(item)"
                  >
                    mdi-pencil
                  </v-icon>
                  <v-icon
                    small
                    @click="deleteBook(item)"
                  >
                    mdi-delete
                  </v-icon>
                </template>
                <template #[`item.release`]="{ item }">
                  <v-simple-checkbox
                    v-model="item.release"
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
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  middleware: ['protectDis', 'authCheck'],
  data () {
    return {
      headers: [
        { text: 'ชื่อหนังสือ', value: 'bookTitle', align: 'start' },
        { text: 'ชื่อผู้เขียน', value: 'author' },
        { text: 'หมวดหมู่', value: 'category' },
        { text: 'รายละเอียด', value: 'description' },
        { text: 'ราคา', value: 'price' },
        { text: 'Actions', value: 'actions' },
        { text: 'ลงในร้านค้า', value: 'release' }
      ],
      books: []
    }
  },
  async fetch () {
    const res = await this.$axios.$get(
      '/distributors/books'
    )
    this.books = res.books
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
    }
  }
}
</script>

<style>
.v-application{
    font-family: 'Prompt', sans-serif !important;
 }
.v-application .elevation-1 {
    box-shadow: 0px 2px 1px -1px rgb(255, 140, 0), 0px 1px 1px 0px rgb(255, 140, 0), 0px 1px 3px 0px rgb(255, 140, 0) !important;
}
.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
    border-bottom: thin solid rgba(255, 140, 0,0.7);
    border-bottom-width: thin;
    border-bottom-style: solid;
    border-bottom-color: rgba(255, 140, 0,0.7);
}
.theme--dark.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
    border-bottom: thin solid rgba(255, 140, 0,0.7);
    border-bottom-width: thin;
    border-bottom-style: solid;
    border-bottom-color: rgba(255, 140, 0,0.7);
}
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row), .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
    border-bottom: thin solid rgba(255, 140, 0,0.7);
}
.theme--dark.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row), .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
    border-bottom: thin solid rgba(255, 140, 0,0.7);
}
.v-data-table-header{
      border-top: thin solid rgba(255, 140, 0,0.7);
}
table{
  border-top: thin solid rgba(255, 140, 0,0.7);
}
.theme--light.v-data-table .v-data-footer {
    border-top: thin solid rgba(255, 140, 0,0.7);
}
.theme--dark.v-data-table .v-data-footer {
    border-top: thin solid rgba(255, 140, 0,0.7);
}
.width-100{
  width: 100%;
  height: 100%;
  background-image: url("~/assets/background/book-bg.jpg");
  background-size: auto;
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
.v-sheet.v-card:not(.v-sheet--outlined) {
    box-shadow: 0px 3px 1px -2px rgb(255, 140, 0), 0px 2px 2px 0px rgb(255, 140, 0), 0px 1px 5px 0px rgb(255, 140, 0);
}

</style>
