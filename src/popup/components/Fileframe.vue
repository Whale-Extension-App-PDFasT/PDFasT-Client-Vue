<template>
  <div class="col-md-12 fileframe px-4 mx-8" id="fileFrame" v-bind:style="styleOut">
    <div size="lg" class="innerfileframe" id="innerfileframe" v-bind:style="styleIn">
      <p id="file_title">{{ title }}</p>
      <div></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { EventBus } from './../index.js'
export default {
  name: 'Fileframe',
  data() {
    return {
      title: '',
      styleDefault: {
        color: 'black',
        margin: '10px auto',
        padding: '26px 5px 0',
        textAlign: 'center',
        verticalAlign: 'middle',
        width: '100%',
        height: '20px',
        display: 'table',
        zIndex: '10',
        overFlow: 'hidden',
        fontFamily: 'DoHyeon-Regular',
        fontSize: '20px'
      },
      styleDefaultOut: {
        margin: '10px auto',
        height: '50px',
        padding: '0'
      },
      styleFolder: {
        color: 'black',
        margin: '10px auto',
        padding: '20px 5px 0 50px',
        textAlign: 'center',
        verticalAlign: 'middle',
        width: 'calc(100% - 50px )',
        height: '20px',
        borderBottom: '0px',
        borderTop: '1px solid #C4C2C0',
        fontFamily: 'DoHyeon-Regular',
        fontSize: '20px',
        display: 'table',

        borderTop: '0',
        backgroundImage: 'url("/img/folder_title.png")',
        backgroundPosition: 'left',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '64px 64px'
      },
      styleFolderOut: {
        margin: '10px auto',
        height: '50px',
        padding: '0',

        background: 'linear-gradient(transparent 17px, #efce4a 0)',
        borderRadius: '5px',
        animation: 'left_right2 0.5s ease-in-out'
      },
      styleWeb: {
        color: 'black',
        margin: '10px auto',
        padding: '20px 5px 0 50px',
        textAlign: 'center',
        verticalAlign: 'middle',
        width: 'calc(100% - 50px )',
        height: '20px',
        borderBottom: '0px',
        borderTop: '1px solid #C4C2C0',
        fontFamily: 'DoHyeon-Regular',
        fontSize: '20px',
        display: 'table',

        borderTop: '0',
        backgroundImage: 'url("/img/browser.png")',
        backgroundPosition: 'left',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain'
      },
      styleWebOut: {
        margin: '10px auto',
        height: '50px',
        padding: '0',

        background: 'linear-gradient(transparent 11px, #FFD160 0)',
        borderRadius: '5px',
        animation: 'left_right 0.5s ease-in-out'
      },
      styleIn: '',
      styleOut: ''
    }
  },
  created() {
    this.styleOut = this.styleDefaultOut
    this.styleIn = this.styleDefault
    EventBus.$on('changeFolderStyle', () => {
      this.styleOut = this.styleFolderOut
      this.styleIn = this.styleFolder
      this.title = whale.i18n.getMessage('GUIDE_LOCAL')
    })
    EventBus.$on('changeWebStyle', () => {
      this.styleOut = this.styleWebOut
      this.styleIn = this.styleWeb
      this.title = whale.i18n.getMessage('GUIDE_WEB')
    })
    EventBus.$on('changeDefaultStyle', () => {
      this.styleOut = this.styleDefaultOut
      this.styleIn = this.styleDefault
      this.title = ''
    })
    EventBus.$on('changeTitle', val => {
      this.title = val
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
