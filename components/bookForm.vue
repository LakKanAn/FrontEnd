<template>
  <div class="inner-index-page">
    <div class="content-book-center font-propmt">
      <v-row class="row-login" justify="center">
        <v-col
          cols="12"
          sm="12"
          md="3"
          lg="3"
          xl="3"
        >
          <v-btn
            x-large
            width="100%"
            elevation="4"
            class="mb-3"
            to="/distributor/profile"
            nuxt
          >
            ข้อมูลส่วนตัว
          </v-btn>
          <v-btn
            color="primary"
            x-large
            dark
            width="100%"
            elevation="4"
            class="mb-3"
          >
            เพิ่มหนังสือ
          </v-btn>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="8"
          lg="8"
          xl="8"
          align="center"
          justify="center"
          class="ma-auto"
        >
          <v-row>
            <v-col cols="12" sm="12" md="12" class="d-flex justify-start">
              <p class="ma-0 text-h6 text-md-h6 text-lg-h4 text-xl-h4 font-weight-medium pb-4 ">
                ลงทะเบียนหนังสือ
              </p>
            </v-col>
          </v-row>
          <v-card class="d-flex justify-center py-10 px-4">
            <v-row justify="center" class="py-4">
              <v-col cols="12" sm="10" md="10">
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                >
                  <v-row dense>
                    <v-col cols="12">
                      <p class="mb-1 pa-0 d-flex justify-start">
                        ชื่อหนังสือ
                      </p>
                      <v-text-field
                        v-model="bookTitle"
                        :rules="nameRules"
                        required
                        solo
                        placeholder="ชื่อหนังสือ"
                      />
                    </v-col>
                    <v-col cols="12">
                      <p class="mb-1 pa-0 d-flex justify-start">
                        ชื่อผู้เขียน
                      </p>
                      <v-text-field
                        v-model="author"
                        :rules="nameRules"
                        required
                        solo
                        placeholder="ชื่อผู้เขียน"
                      />
                    </v-col>
                    <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                      <p class="mb-1 pa-0 d-flex justify-start">
                        ประเภท
                      </p>
                      <v-select
                        v-model="category"
                        :items="items"
                        :rules="[v => !!v || 'จำเป็นต้องใส่ช่องนี้']"
                        required
                        solo
                        placeholder="ประเภทหนังสือ"
                      />
                    </v-col>
                    <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                      <p class="mb-1 pa-0 d-flex justify-start">
                        หมวดหมู่
                      </p>
                      <v-select
                        v-model="genreSelect"
                        :items="itemsGenre"
                        required
                        solo
                        placeholder="หมวดหมู่"
                        :rules="[v => v.length !== 0 || 'กรุณากรอกช่องนี้']"
                        multiple
                      />
                    </v-col>
                    <v-col cols="12">
                      <p class="mb-1 pa-0 d-flex justify-start">
                        รายละเอียด
                      </p>
                      <v-textarea
                        v-model="description"
                        required
                        solo
                        :rules="[v => !!v || 'กรุณากรอกช่องนี้']"
                        placeholder="รายละเอียด"
                        no-resize
                      />
                    </v-col>
                    <v-col cols="12">
                      <p class="mb-1 pa-0 d-flex justify-start">
                        ราคา
                      </p>
                      <v-text-field
                        v-model="price"
                        :rules="nameRules"
                        required
                        solo
                        placeholder="ราคา"
                        type="number"
                        hide-spin-buttons
                      />
                    </v-col>
                    <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                      <p class="mb-1 pa-0 d-flex justify-start">
                        ไฟล์หนังสือ
                      </p>
                      <v-file-input
                        v-model="pdfFile"
                        accept="application/pdf"
                        :rules="fileRules"
                        required
                        persistent-hint
                        solo
                        hint="กรุณาใช้ชื่อไฟล์เหมือนกันทั้งสองไฟล์"
                        placeholder="เลือกไฟล์หนังสือ (PDF)"
                      />
                    </v-col>
                    <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                      <p class="mb-1 pa-0 d-flex justify-start">
                        ไฟล์ปกหนังสือ
                      </p>
                      <v-file-input
                        v-model="fileImage"
                        accept="image/jpeg,image/png"
                        :rules="fileRules"
                        required
                        persistent-hint
                        solo
                        hint="กรุณาใช้ชื่อไฟล์เหมือนกันทั้งสองไฟล์"
                        placeholder="เลือกไฟล์ปกหนังสือ (.JPG, .PNG)"
                        @change="image_preview"
                      />
                    </v-col>
                  </v-row>
                </v-form>
                <v-row class="mt-5" justify="center">
                  <v-col cols="12" md="6" lg="6" xl="6">
                    <v-btn
                      x-large
                      :disabled="!valid"
                      color="primary"
                      class="button-choice"
                      @click="validate"
                    >
                      บันทึก
                    </v-btn>
                  </v-col>
                  <v-col cols="12" md="6" lg="6" xl="6">
                    <v-btn
                      x-large
                      color="black"
                      class="button-choice"
                      outlined
                      @click="cancelBook"
                    >
                      ยกเลิก
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
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
          บันทึกหนังสือเรียบร้อย
        </v-card-title>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    bookId: 0,
    valid: true,
    bookTitle: '',
    author: '',
    category: '',
    description: '',
    price: '',
    genreSelect: [],
    succDialog: false,
    genre: [],
    fileImage: [],
    imageUrl: null,
    pdfFile: null,
    nameRules: [
      v => !!v || 'กรุณากรอกช่องนี้',
      v => (v && v.length <= 100) || 'ตัวอักษรจำเป็นต้องน้อยกว่า 100 ตัว'
    ],
    fileRules: [
      v => !!v || 'กรุณากรอกช่องนี้'
    ],
    email: '',
    select: null,
    items: [
      'สารคดี',
      'บันเทิงคดี',
      'สิ่งพิมพ์',
      'ตำรา',
      'วารสาร',
      'นิตยสาร'
    ],
    itemsGenre: [
      'ตลก',
      'ต่อสู้',
      'โรแมนติก',
      'วิทยาศาสตร์',
      'แฟนตาซี',
      'ระทึกขวัญ',
      'สืบสวนสอบสวน',
      'อิงประวัติศาสตร์'
    ],
    checkbox: false,
    checkPath: false
  }),
  fetch () {
    if (this.$nuxt.$route.path === '/distributor/editbook') {
      this.checkPath = true
      this.fileRules = []
      const retrievedObject = localStorage.getItem('bookObject')
      const jsonP = JSON.parse(retrievedObject)
      this.bookTitle = jsonP.bookTitle
      this.author = jsonP.author
      this.category = jsonP.category
      typeof jsonP.genre === 'string' ? this.genreSelect = [jsonP.genre] : this.genreSelect = jsonP.genre
      this.description = jsonP.description
      this.price = jsonP.price
      this.bookId = jsonP.bookId
    }
  },
  methods: {
    image_preview () {
      if (this.fileImage !== null) {
        this.imageUrl = URL.createObjectURL(this.fileImage)
      } else {
        this.imageUrl = ''
      }
    },
    addBook () {
      this.$nuxt.$router.push('/distributor/insertbook')
    },
    addGenre () {
      let checks = false
      this.genre.forEach((e) => {
        if (e === this.genreSelect) {
          checks = true
        }
      })
      if (this.genreSelect !== '' && checks !== true) {
        this.genre.push(this.genreSelect)
      }
    },
    deleteGenre (index) {
      this.genre.splice(index, 1)
    },
    validate () {
      if (this.$refs.form.validate()) {
        let newName
        let typeNew = String(this.fileImage.name).split('.')
        let blob = this.fileImage.slice(0, this.fileImage.size, this.fileImage.type)
        let newFile
        if (this.pdfFile !== null && this.fileImage !== null) {
          newName = String(this.pdfFile.name).split('.')
          typeNew = String(this.fileImage.name).split('.')
          blob = this.fileImage.slice(0, this.fileImage.size, this.fileImage.type)
          newFile = new File([blob], newName[0] + '.' + typeNew[1], { type: this.fileImage.type })
        }
        if (this.$nuxt.$route.path === '/distributor/editbook') {
          this.$axios.$post('/distributors/books/edit/' + this.bookId,
            {
              bookTitle: this.bookTitle,
              author: this.author,
              category: this.category,
              description: this.description,
              price: this.price,
              genre: this.genreSelect
            }).then((user) => {
            if (this.pdfFile !== null && this.fileImage !== null) {
              const formData = new FormData()
              const formData2 = new FormData()
              formData.append('image', newFile)
              formData2.append('content', this.pdfFile)
              this.$axios.$post('/distributors/books/' + this.bookId, formData)
              this.$axios.$post('/distributors/books/' + this.bookId, formData2)
            }
          })
          this.succDialog = true
          setTimeout(() => { this.$nuxt.$router.push('/distributor/managebook') }, 2000)
        } else {
          this.$axios.$post('/distributors/books',
            {
              bookTitle: this.bookTitle,
              author: this.author,
              category: this.category,
              description: this.description,
              price: this.price,
              genre: this.genreSelect
            }).then((user) => {
            const formData = new FormData()
            const formData2 = new FormData()
            formData.append('image', newFile)
            formData2.append('content', this.pdfFile)
            this.$axios.$post('/distributors/books/' + user.newBook.bookId, formData)
            this.$axios.$post('/distributors/books/' + user.newBook.bookId, formData2)
          })
          this.succDialog = true
          setTimeout(() => { this.$nuxt.$router.push('/distributor/managebook') }, 2000)
        }
      }
    },
    cancelBook () {
      this.$nuxt.$router.push('/distributor/managebook')
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style scoped>
@media only screen and (max-width: 600px) {
    .content-book-center {
  margin-left: 2%;
  margin-right: 2%;
  }
}
.content-book-center{
  margin-top: 5%;
  margin-left: 10%;
  margin-right: 10%;
  background-color: white;
}
.font-propmt{
    font-family: 'Prompt', sans-serif !important;
 }
.width-100{
  width: 60%;
}
.row-login{
    height: 100%;
}
.over-text{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}
.over-text-des{
display: -webkit-box;
-webkit-line-clamp: 5;
-webkit-box-orient: vertical;
overflow: hidden;
text-overflow: ellipsis;
text-align: left;
}
.inner-index-page {
        width: 100%;
    height: 100%;
}
</style>
