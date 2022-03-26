<template>
  <sl-tab-group class="flex flex-auto w-full h-0 mt-4">
    <sl-tab slot="nav" panel="recent" i18n-content="MENU_RECENT">MENU_RECENT</sl-tab>
    <sl-tab slot="nav" panel="favorite" i18n-content="MENU_FAVORITE">MENU_FAVORITE</sl-tab>

    <sl-tab-panel name="recent">
      <acc-input
        placeholder="Search"
        class="m-2 mb-0"
        :value="searchText"
        @input="searchText = $event.target.value"
      ></acc-input>
      <div v-if="!!filteredRecentList.length" class="overflow-y-scroll overflow-x-hidden">
        <div
          class="item flex cursor-pointer my-1 rounded items-center"
          v-for="item in filteredRecentList"
          v-bind:key="item.url"
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
          <div class="w-10/12 py-3 px-1">
            <p class="pdf-item__text" v-on:click="convert(item, $event)">{{ item.title }}</p>
          </div>
          <div class="w-2/12 py-3 px-1 flex flex-row items-center">
            <sl-rating
              class="ml-auto mr-4"
              max="1"
              v-bind:value="isFavorite(item)"
              v-on:click="setFavorite(item, $event)"
            ></sl-rating>
            <acc-button
              class="close-btn"
              type="text"
              circle
              v-on:click="removeRecentList(item, $event)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-gray-400 close-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </acc-button>
          </div>
        </div>
      </div>
      <div v-else class="px-4 py-4">{{ NOT_FOUND_RECENT_LIST }}</div>
    </sl-tab-panel>
    <sl-tab-panel name="favorite">
      <acc-input
        placeholder="Search"
        class="m-2 mb-0"
        :value="searchText"
        @input="searchText = $event.target.value"
      ></acc-input>
      <div v-if="!!filteredFavoriteList.length" class="overflow-y-scroll overflow-x-hidden">
        <div
          class="item flex cursor-pointer my-1 rounded items-center"
          v-for="item in filteredFavoriteList"
          v-bind:key="item.url"
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
            <p class="pdf-item__text" v-on:click="convert(item, $event)">{{ item.title }}</p>
          </div>
          <div class="w-1/12 py-3 px-1">
            <acc-button
              class="close-btn"
              type="text"
              circle
              v-on:click="removeFavoriteList(item, $event)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-gray-400 close-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </acc-button>
          </div>
        </div>
      </div>
      <div v-else class="px-4 py-4">{{ NOT_FOUND_FAVORITE_LIST }}</div>
    </sl-tab-panel>
  </sl-tab-group>
</template>

<script>
import '@accordion/acc-components/dist/components/button/button'
import '@accordion/acc-components/dist/components/tab-group/tab-group'
import '@accordion/acc-components/dist/components/tab/tab'
import '@accordion/acc-components/dist/components/tab-panel/tab-panel'
import '@accordion/acc-components/dist/components/input/input'
import { EventBus } from '../index.js'
/* eslint-disable */
export default {
  name: 'RecentList',
  data() {
    return {
      MENU_RECENT: whale.i18n.getMessage('MENU_RECENT'),
      MENU_FAVORITE: whale.i18n.getMessage('MENU_FAVORITE'),
      NOT_FOUND_RECENT_LIST: whale.i18n.getMessage('NOT_FOUND_RECENT_LIST'),
      NOT_FOUND_FAVORITE_LIST: whale.i18n.getMessage('NOT_FOUND_FAVORITE_LIST'),
      recentList: [],
      favoriteList: [],
      searchText: ''
    }
  },
  computed: {
    filteredRecentList: function() {
      return this.recentList.filter(item => {
        const title = item.title.toLowerCase()
        return title.includes(this.searchText.toLowerCase())
      })
    },
    filteredFavoriteList: function() {
      return this.favoriteList.filter(item => {
        const title = item.title.toLowerCase()
        return title.includes(this.searchText.toLowerCase())
      })
    }
  },
  mounted() {
    this.getRecentList()
    this.getFavoriteList()
  },
  created() {
    EventBus.$on('updatedRecentList', () => {
      this.getRecentList()
    })
    EventBus.$on('updatedFavoriteList', () => {
      this.getFavoriteList()
    })
  },
  methods: {
    getRecentList() {
      if (!localStorage) {
        return
      }
      const recentList = JSON.parse(localStorage.getItem('1')) || []

      this.recentList = recentList
    },
    getFavoriteList() {
      if (!localStorage) {
        return
      }
      const favoriteList = JSON.parse(localStorage.getItem('2')) || []

      this.favoriteList = favoriteList
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
    },
    removeRecentList(pdfInfo, event) {
      const remove = (arr, func) =>
        Array.isArray(arr)
          ? arr.filter(func).reduce((acc, val) => {
              arr.splice(arr.indexOf(val), 1)
              return acc.concat(val)
            }, [])
          : []
      if (!localStorage) {
        return
      }
      this.recentList = remove(this.recentList, _pdfInfo => {
        return _pdfInfo.url !== pdfInfo.url
      })
      localStorage.setItem('1', JSON.stringify(this.recentList))
    },
    removeFavoriteList(pdfInfo, event) {
      const remove = (arr, func) =>
        Array.isArray(arr)
          ? arr.filter(func).reduce((acc, val) => {
              arr.splice(arr.indexOf(val), 1)
              return acc.concat(val)
            }, [])
          : []
      if (!localStorage) {
        return
      }
      this.favoriteList = remove(this.favoriteList, _pdfInfo => {
        return _pdfInfo.url !== pdfInfo.url
      })
      localStorage.setItem('2', JSON.stringify(this.favoriteList))
      EventBus.$emit('updatedFavorite')
    },
    isFavorite(pdf) {
      const favoriteList = JSON.parse(localStorage.getItem('2')) || []
      return favoriteList.findIndex(item => item.url === pdf.url) !== -1 ? 1 : 0
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
sl-tab-group::part(base) {
  width: 100%;
}
sl-tab-group::part(body) {
  overflow-y: scroll;
}
sl-tab-panel::part(base) {
  padding: 0;
}
.pdf-item__text:hover {
  color: rgb(22 163 74);
}
.close-btn {
  margin-right: 1.25rem;
  color: #666;
}
.close-btn::part(base) {
  display: flex;
  align-items: center;
}
.close-icon:hover {
  color: rgb(22 163 74);
}
</style>
