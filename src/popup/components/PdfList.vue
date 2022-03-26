<template>
  <sl-card id="pdf-wrap" class="card-header flex-360px">
    <div slot="header" class="flex items-center">{{ PDF_CONVERT_LIST }}</div>

    <div id="pdf-list" class="w-full overflow-y-scroll h-250px max-h-250px">
      <div v-if="pdfList.length !== 0">
        <div
          class="pdf-item flex cursor-pointer my-1 rounded items-center"
          v-for="pdf in pdfList"
          v-bind:key="pdf.url"
        >
          <div class="w-auto h-full text-center py-3 pl-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-red-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="w-11/12 py-3 px-1">
            <p class="pdf-item__text" v-on:click="convert(pdf, $event)">{{ pdf.title }}</p>
          </div>
          <div class="w-1/12 py-3 px-1">
            <sl-rating
              class="ml-auto"
              max="1"
              v-bind:value="isFavorite(pdf)"
              v-on:click="setFavorite(pdf, $event)"
            ></sl-rating>
          </div>
        </div>
      </div>
      <div v-else>{{ NOT_FOUND_PDF }}</div>
    </div>
    <div slot="footer">
      <acc-button size="medium" class="w-full" v-on:click="openPdfLocal">{{
        TRANSLATE_PDF_LOCAL
      }}</acc-button>
    </div>
  </sl-card>
</template>

<script>
import '@accordion/acc-components/dist/components/button/button'
import '@accordion/acc-components/dist/components/card/card'
import '@accordion/acc-components/dist/components/rating/rating'
import { EventBus } from '../index.js'
/* eslint-disable */
export default {
  name: 'PdfList',
  data() {
    return {
      PDF_CONVERT_LIST: whale.i18n.getMessage('PDF_CONVERT_LIST'),
      NOT_FOUND_PDF: whale.i18n.getMessage('NOT_FOUND_PDF'),
      TRANSLATE_PDF_LOCAL: whale.i18n.getMessage('TRANSLATE_PDF_LOCAL'),
      pdfList: []
    }
  },
  created() {
    EventBus.$on('updatedFavorite', () => {
      this.$forceUpdate()
    })
  },
  mounted() {
    this.refresh()
    whale.tabs.onCreated.addListener(this.refresh)
    whale.tabs.onRemoved.addListener(this.refresh)
    whale.tabs.onUpdated.addListener(this.refresh)
  },
  methods: {
    refresh() {
      const queryInfo = {
        url: ['*://*/*.pdf']
      }
      whale.tabs.query(queryInfo, tabs => {
        this.pdfList = tabs.map(tab => {
          return {
            title: tab.title,
            url: tab.url
          }
        })
      })
    },
    convert(pdfInfo, event) {
      event && event.preventDefault()

      const form = document.createElement('form')
      const insert = document.createElement('input')

      form.setAttribute('method', 'post')
      form.setAttribute('target', '_blank')
      form.setAttribute('action', 'https://pdfast.site/web.php')
      document.body.appendChild(form)

      insert.setAttribute('type', 'hidden')
      insert.setAttribute('name', 'test')
      insert.setAttribute('value', 'https://cors-servers.herokuapp.com/' + pdfInfo.url)
      form.appendChild(insert)
      form.submit()

      if (localStorage) {
        let recentList = JSON.parse(localStorage.getItem('1')) || []

        const isIncludeRecentTab =
          recentList.findIndex(tab => {
            return tab.url === pdfInfo.url
          }) !== -1

        if (isIncludeRecentTab) {
          const remove = (arr, func) =>
            Array.isArray(arr)
              ? arr.filter(func).reduce((acc, val) => {
                  arr.splice(arr.indexOf(val), 1)
                  return acc.concat(val)
                }, [])
              : []
          recentList = remove(recentList, _pdfInfo => {
            return _pdfInfo.url !== pdfInfo.url
          })
        }

        recentList = [
          {
            title: pdfInfo.title,
            url: pdfInfo.url
          },
          ...recentList
        ]

        localStorage.setItem('1', JSON.stringify(recentList))
        EventBus.$emit('updatedRecentList')
      }
    },
    openPdfLocal() {
      window.open('https://pdfast.site/build/generic/web/local_viewer.html', '_blank')
    },
    setFavorite(pdfInfo, event) {
      const target = event.target
      const isFavoritePdf = target.value
      if (isFavoritePdf) {
        if (!localStorage) {
          return
        }
        let favoriteList = JSON.parse(localStorage.getItem('2')) || []

        favoriteList = [
          {
            title: pdfInfo.title,
            url: pdfInfo.url
          },
          ...favoriteList
        ]

        localStorage.setItem('2', JSON.stringify(favoriteList))
        EventBus.$emit('updatedFavoriteList')
      } else {
        if (!localStorage) {
          return
        }
        const remove = (arr, func) =>
          Array.isArray(arr)
            ? arr.filter(func).reduce((acc, val) => {
                arr.splice(arr.indexOf(val), 1)
                return acc.concat(val)
              }, [])
            : []
        let favoriteList = JSON.parse(localStorage.getItem('2')) || []

        favoriteList = [
          {
            title: pdfInfo.title,
            url: pdfInfo.url
          },
          ...favoriteList
        ]
        favoriteList = remove(favoriteList, _pdfInfo => {
          return _pdfInfo.url !== pdfInfo.url
        })

        localStorage.setItem('2', JSON.stringify(favoriteList))
        EventBus.$emit('updatedFavoriteList')
      }
    },
    isFavorite(pdf) {
      const favoriteList = JSON.parse(localStorage.getItem('2')) || []
      return favoriteList.findIndex(item => item.url === pdf.url) !== -1 ? 1 : 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flex-360px {
  flex: 0 0 360px;
  height: 360px;
}
.h-250px {
  height: 250px;
}
.max-h-250x {
  max-height: 250px;
}
.pdf-item:hover {
  background-color: rgb(220 252 231);
}
.pdf-item__text:hover {
  color: rgb(22 163 74);
}
</style>
