<template>
  <footer
    class="flex flex-col items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 sm:flex-row flex-40px"
  >
    <a
      href="#"
      v-on:click="credit"
      class="text-xl font-bold text-gray-800 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
      >Licenses</a
    >
  </footer>
</template>

<script>
import { EventBus } from '../index.js'
/* eslint-disable */
export default {
  name: 'Footer',
  components: {},
  methods: {
    credit() {
      EventBus.$emit('showCredit')
    }
  }
}
</script>

<style scoped>
.flex-40px {
  flex: 0 0 40px;
  height: 40px;
}
</style>
