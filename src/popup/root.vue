<template>
  <div id="root">
    <v-tour
      name="tutorial"
      :steps="steps"
      :callbacks="tuotorialCallbacks"
      :options="tutorialOptions"
    ></v-tour>
    <div class="flex flex-col col-md-12 mainframe" id="mainFrame">
      <TopNav />
      <PdfList />
      <RecentList />
      <Footer />
    </div>
    <Credit />
  </div>
</template>
<script>
/* eslint-disable */
import { EventBus } from './index.js'
import TopNav from './components/TopNav'
import PdfList from './components/PdfList'
import RecentList from './components/RecentList'
import Credit from './components/Credit'
import Footer from './components/Footer'
export default {
  components: {
    TopNav,
    PdfList,
    RecentList,
    Credit,
    Footer
  },
  data() {
    return {
      HELP: whale.i18n.getMessage('HELP'),
      tutorialOptions: {
        labels: {
          buttonSkip: whale.i18n.getMessage('TUTORIAL_SKIP'),
          buttonPrevious: whale.i18n.getMessage('PREVIOUS'),
          buttonNext: whale.i18n.getMessage('NEXT'),
          buttonStop: whale.i18n.getMessage('FINISH')
        },
        highlight: true
      },
      tuotorialCallbacks: {
        onSkip: this.finishTutorial,
        onFinish: this.finishTutorial
      },
      steps: [
        {
          header: {
            title: whale.i18n.getMessage('TUTORIAL_FIRST_TITLE')
          },
          content: whale.i18n.getMessage('TUTORIAL_FIRST_TEXT')
        },
        {
          header: {
            title: whale.i18n.getMessage('TUTORIAL_SECOND_TITLE')
          },
          content: whale.i18n.getMessage('TUTORIAL_SECOND_TEXT')
        },
        {
          content: whale.i18n.getMessage('THANKYOU')
        }
      ]
    }
  },
  mounted() {
    require('./js/i18n-contents.js')
    if (localStorage) {
      const tutorial = JSON.parse(localStorage.getItem('tutorial'))

      if (tutorial === null) {
        this.$tours['tutorial'].start()
      }
    }
  },
  methods: {
    finishTutorial() {
      localStorage.setItem('tutorial', JSON.stringify([{ bool: true }]))
    },
    home() {
      location.reload()
    },
    youtube() {
      window.open('https://youtu.be/mr2Llu8ZKeU', 'PDFasT 가이드 영상')
    },
    credit() {
      EventBus.$emit('showCredit')
    },
    help() {
      EventBus.$emit('help')
    }
  }
}
</script>
<style src="./css/app.css"></style>
