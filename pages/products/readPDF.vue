<template>
  <div>
    <v-row justify="space-between" class="my-4 mx-10">
      <v-col cols="12" sm="12" md="2" lg="2" xl="2">
        <div class="select-wid mx-auto">
          <v-select
            :items="choice"
            label="Standard"
            hide-details
            value="แนวนอน"
            solo
            class="elevation-2"
            @change="changeStyle($event)"
          />
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="4" lg="4" xl="4">
        <div v-if="!vertical" class="my-auto">
        <span class="my-auto mx-2">หน้า {{ pageNumShow }} / {{ pageCountShow }}</span>
          <v-btn
            elevation="2"
            dark
            color="#FF8C00"
            x-large
            @click="onPrevPage"
          >
            <v-icon color="white">
              mdi-arrow-left-thin
            </v-icon>
            ก่อนหน้า
          </v-btn>
          <v-btn
            elevation="2"
            dark
            color="#FF8C00"
            x-large
            @click="onNextPage"
          >
            ถัดไป
            <v-icon color="white">
              mdi-arrow-right-thin
            </v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <div id="horizontal" class="pdf-read d-flex justify-center">
      <canvas id="the-canvas" />
    </div>
    <v-row v-if="!vertical" justify="end" class="my-4  mx-10">
      <v-col cols="12" sm="12" md="4" lg="4" xl="4">
        <div class="my-auto">
        <span class="my-auto mx-2">หน้า {{ pageNumShow }} / {{ pageCountShow }}</span>
          <v-btn
            elevation="2"
            dark
            color="#FF8C00"
            x-large
            @click="onPrevPage"
          >
            <v-icon color="white">
              mdi-arrow-left-thin
            </v-icon>
            ก่อนหน้า
          </v-btn>
          <v-btn
            elevation="2"
            dark
            color="#FF8C00"
            x-large
            @click="onNextPage"
          >
            ถัดไป
            <v-icon color="white">
              mdi-arrow-right-thin
            </v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <div id="vertical" class="pdf-read" />
    <compofooter />
    <v-fab-transition>
      <v-btn
        v-scroll="onScroll"
        fab
        dark
        fixed
        bottom
        left
        color="primary"
        @click="toTop"
      >
        <v-icon>mdi-arrow-up-bold</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
const pdfjsLib = window['pdfjs-dist/build/pdf']
let pdfDoc = null
let pageNum = 1
let pageCount = 0
let pageRendering = false
let pageNumPending = null
const scale = 1.5
let canvas = ''
let ctx = ''
const outputScale = window.devicePixelRatio || 1
let url = ''
export default {
  data () {
    return {
      ctx: [],
      choice: [
        'แนวนอน',
        'แนวตั้ง'
      ],
      vertical: false,
      upButton: false,
      pageNumShow: 0,
      pageCountShow: 0
    }
  },
  async mounted () {
    try {
      const paramBook = String(this.$route.query.book)
      const paramTrade = String(this.$route.query.trade)
      if (paramTrade === 'false') {
        const res = await this.$axios.$get(
          '/users/bookshelf/' + paramBook
        )
        url = res.BookDetails.contentBook
      } else {
        const res = await this.$axios.$get(
          '/users/booktrade/' + paramBook
        )
        url = res.BookDetails.contentBook
      }
      pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js'
      canvas = document.getElementById('the-canvas')
      ctx = canvas.getContext('2d')
      pdfjsLib.getDocument(url).promise.then(function (pdfDoc_) {
        pdfDoc = pdfDoc_
        pageCount = pdfDoc.numPages
        pageRendering = true
        pdfDoc.getPage(pageNum).then(function (page) {
          const viewport = page.getViewport({ scale })
          // canvas.width = viewport.width
          // canvas.height = viewport.height
          canvas.width = Math.floor(viewport.width * outputScale)
          canvas.height = Math.floor(viewport.height * outputScale)
          // canvas.style.width = Math.floor(viewport.width) + 'px'
          // canvas.style.height = Math.floor(viewport.height) + 'px'
          // canvas.width = Math.floor(viewport.width * outputScale)
          // canvas.height = Math.floor(viewport.height * outputScale)
          // canvas.style.width = Math.floor(viewport.width) + 'px'
          // canvas.style.height = Math.floor(viewport.height) + 'px'
          const transform = outputScale !== 1
            ? [outputScale, 0, 0, outputScale, 0, 0]
            : null

          const renderContext = {
            canvasContext: ctx,
            transform,
            viewport
          }

          const renderTask = page.render(renderContext)
          renderTask.promise.then(function () {
            pageRendering = false
            if (pageNumPending !== null) {
              pageNumPending = null
            }
          })
        })
        this.pageNumShow = pageNum
        this.pageCountShow = pageCount
      })
    } catch (error) {
      // this.$nuxt.$router.push('/')
    }
  },
  methods: {
    renderPage (num) {
      pageRendering = true
      pdfDoc.getPage(num).then(function (page) {
        const viewport = page.getViewport({ scale })
        const canvas = document.getElementById('the-canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = Math.floor(viewport.width * outputScale)
        canvas.height = Math.floor(viewport.height * outputScale)

        // canvas.width = Math.floor(viewport.width * outputScale)
        // canvas.height = Math.floor(viewport.height * outputScale)
        // canvas.style.width = Math.floor(viewport.width) + 'px'
        // canvas.style.height = Math.floor(viewport.height) + 'px'
        const transform = outputScale !== 1
          ? [outputScale, 0, 0, outputScale, 0, 0]
          : null

        const renderContext = {
          canvasContext: ctx,
          transform,
          viewport
        }
        const renderTask = page.render(renderContext)

        renderTask.promise.then(function () {
          pageRendering = false
          if (pageNumPending !== null) {
            this.renderPage(pageNumPending)
            pageNumPending = null
          }
        })
      })

      this.pageNumShow = num
    },
    renderAllPage (num) {
      pageRendering = true
      pdfDoc.getPage(num).then(function (page) {
        const canvasId = 'pdf-viewer-' + num
        const divCanvas = document.getElementById('vertical')
        const divHead = document.createElement('div')
        divHead.setAttribute('id', 'div-canvas' + canvasId)
        divHead.setAttribute('class', 'd-flex justify-center')
        divCanvas.append(divHead)
        const setId = document.createElement('canvas')
        setId.setAttribute('id', canvasId)
        setId.setAttribute('class', 'vertical-canvas')
        divHead.append(setId)
        const canvasAll = document.getElementById(canvasId)
        const viewport = page.getViewport({ scale })
        canvasAll.width = Math.floor(viewport.width * outputScale)
        canvasAll.height = Math.floor(viewport.height * outputScale)
        const ctxAll = canvasAll.getContext('2d')
        const transform = outputScale !== 1
          ? [outputScale, 0, 0, outputScale, 0, 0]
          : null

        const renderContext = {
          canvasContext: ctxAll,
          transform,
          viewport
        }
        const renderTask = page.render(renderContext)

        renderTask.promise.then(function () {
          pageRendering = false
        })
      })
    },
    changeStyle (event) {
      if (event === 'แนวตั้ง') {
        this.vertical = true
        pageNum = 1
        const divCanvas = document.getElementById('horizontal')
        divCanvas.innerHTML = ''
        for (let i = 1; i <= pdfDoc.numPages; i++) {
          this.renderAllPage(i)
        }
      }
      if (event === 'แนวนอน') {
        this.vertical = false
        pageNum = 1
        const divHorizontal = document.getElementById('horizontal')
        const setId = document.createElement('canvas')
        setId.setAttribute('id', 'the-canvas')
        divHorizontal.append(setId)
        const divCanvas = document.getElementById('vertical')
        divCanvas.innerHTML = ''
        this.queueRenderPage(1)
      }
    },
    queueRenderPage (num) {
      if (pageRendering) {
        pageNumPending = num
      } else {
        this.renderPage(num)
      }
    },
    onPrevPage () {
      if (pageNum <= 1) {
        return
      }
      pageNum--
      this.queueRenderPage(pageNum)
    },
    onNextPage () {
      if (pageNum >= pdfDoc.numPages) {
        return
      }
      pageNum++
      this.queueRenderPage(pageNum)
    },
    onScroll (e) {
      if (typeof window === 'undefined') { return }
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.fab = top > 20
    },
    toTop () {
      this.$vuetify.goTo(0)
    }
  }
}
</script>

<style>
#the-canvas {
  border: 1px solid black;
  direction: ltr;
}
.select-wid {
  max-width: 240px;
}
.vertical-canvas{
    border: 1px solid black;
  direction: ltr;
  display: flex;
  justify-items: center;
}

canvas {
  border: 1px solid black;
  margin: 5px;
  width: 90%;
}

@media only screen and (max-width: 1980px) {
  canvas {
  border: 1px solid black;
  width: 60%;
  height: 60%;
}
}
@media only screen and (max-width: 1024px) {
  canvas {
  border: 1px solid black;
  width: 90%;
  height: 100%;
}
}
</style>
