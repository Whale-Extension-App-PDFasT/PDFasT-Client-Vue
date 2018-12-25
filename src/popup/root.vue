<template>
  <div id="root">
    <div id="popup_youtube" v-on:click="youtube"><span>PDFasT 사용법 영상</span><span>▶</span></div>
    <Popup/>
    <Popup_favorite/>
    <div class="col-md-12 mainframe" id="mainFrame">
      <Tutorial/>
      <img src="/img/home.png" id="home" v-on:click="home"/>      
      <img src="/img/pdfast6.png" id="logo" /> 
      <img src="/img/question.png" id="question" v-on:click="help"/>

      <Topnavbar/>
      <Fileframe/>
      <Urlfile/>
      <Funcframe/>
    </div>
    <footer>
      <span v-on:click="credit" id="footer_str">Credit</span>
    </footer>
    <Credit/>
  </div>
</template>
<script>
/* eslint-disable */
// import 'expose-loader?$!expose-loader?jQuery!jquery'
import { EventBus } from "./index.js"
import Topnavbar from './components/Topnavbar'
import Fileframe from './components/Fileframe'
import Urlfile from './components/Urlfile'
import Funcframe from './components/Funcframe'
import Credit from './components/Credit'
import Popup from './components/Popup'
import Popup_favorite from './components/Popup_favorite'
import Tutorial from './components/Tutorial'
export default {
  components: {
    Topnavbar,
    Fileframe,
    Urlfile,
    Funcframe,
    Credit,
    Popup,
    Popup_favorite,
    Tutorial
  },
  methods: {
    home () {
      location.reload()
    },
    youtube () {
      window.open('https://youtu.be/mr2Llu8ZKeU', 'PDFasT 가이드 영상')
    },
    credit () {
      EventBus.$emit('showCredit');
    },
    help(){
      EventBus.$emit('help');
    }
  },
}
</script>
<style src="./css/app.css"></style>