<template>
  <nav
    class="relative flex flex-wrap items-center justify-between px-4 py-2 rounded bg-white shadow flex-40px"
  >
    <div class="flex items-center" v-on:click="home">
      <img src="/img/pdfast6.png" id="logo" class="cursor-pointer" />
      <a href="#" class="flex mr-4  self-end text-gray-600 text-opacity-75 font-bold text-3xl"
        >PDFasT</a
      >
    </div>

    <acc-button class="guide-button" type="text" v-on:click="help">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
          clip-rule="evenodd"
        />
      </svg>
    </acc-button>
  </nav>
</template>

<script>
import '@accordion/acc-components/dist/components/button/button'
/* eslint-disable */
export default {
  name: 'TopNav',
  components: {},
  data() {
    return {
      GUIDE_VIDEO: whale.i18n.getMessage('GUIDE_VIDEO')
    }
  },
  methods: {
    home() {
      location.reload()
    },
    youtube() {
      window.open('https://youtu.be/mr2Llu8ZKeU', 'PDFasT 가이드 영상')
    },
    help() {
      localStorage && localStorage.removeItem('tutorial')
      location.reload()
    }
  }
}
</script>

<style scoped>
.guide-button::part(label) {
  display: flex;
  align-items: center;
}
.flex-40px {
  flex: 0 0 40px;
  height: 40px;
}
</style>
