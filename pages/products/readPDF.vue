<template>
  <div>
    <div class="d-flex justify-space-around ma-4">
      <div class="my-auto">
        <v-btn
          elevation="4"
          outlined
          color="#FF8C00"
          x-large
          @click="onPrevPage"
        >
          Previous
        </v-btn>
        <v-btn
          elevation="4"
          outlined
          color="#FF8C00"
          x-large
          @click="onNextPage"
        >
          Next
        </v-btn>
      </div>
      <div class="select-wid">
        <v-select
          :items="choice"
          label="Standard"
          hide-details
          value="แนวนอน"
          outlined
          @change="changeStyle($event)"
        />
      </div>
      <span class="my-auto">Page: <span id="page_num" /> / <span id="page_count" /></span>
    </div>
    <div id="horizontal" class="pdf-read d-flex justify-center">
      <canvas id="the-canvas" />
    </div>
    <div id="vertical" class="pdf-read" />
  </div>
</template>

<script>
const pdfjsLib = window['pdfjs-dist/build/pdf']
let pdfDoc = null
let pageNum = 1
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
      ]
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
        document.getElementById('page_count').textContent = pdfDoc.numPages
        pageRendering = true
        pdfDoc.getPage(pageNum).then(function (page) {
          const viewport = page.getViewport({ scale })
          canvas.width = Math.floor(viewport.width * outputScale)
          canvas.height = Math.floor(viewport.height * outputScale)
          canvas.style.width = Math.floor(viewport.width) + 'px'
          canvas.style.height = Math.floor(viewport.height) + 'px'
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
        document.getElementById('page_num').textContent = pageNum
      })
    } catch (error) {
      this.$nuxt.$router.push('/')
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
        canvas.style.width = Math.floor(viewport.width) + 'px'
        canvas.style.height = Math.floor(viewport.height) + 'px'
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

      document.getElementById('page_num').textContent = num
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
        canvasAll.style.width = Math.floor(viewport.width) + 'px'
        canvasAll.style.height = Math.floor(viewport.height) + 'px'
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
        const divCanvas = document.getElementById('horizontal')
        divCanvas.innerHTML = ''
        for (let i = 1; i <= pdfDoc.numPages; i++) {
          this.renderAllPage(i)
        }
      }
      if (event === 'แนวนอน') {
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
</style>
