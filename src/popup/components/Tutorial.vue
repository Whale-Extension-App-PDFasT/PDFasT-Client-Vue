<template>
    <div id="tutorial_back" v-bind:style="{display: tutorialDisplay}">
        <div id="tutorial">
            <iframe width="256px" height="144px" src="https://www.youtube.com/embed/mr2Llu8ZKeU" frameborder="2" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <span v-on:click="close">ⓧ</span>
            <img src="/img/home_btn.png"/>
            <div id="info_home_txt">가이드 영상 닫고 바로시작하기!</div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { EventBus } from "./../index.js"
export default {
  name: 'Tutorial',
  data(){
      return{
          tutorialDisplay: 'none',
      }
  },
  created(){
    EventBus.$on('help', () => {
        this.tutorialDisplay = 'block';
    });
  },
  methods: {
      close(){
          this.tutorialDisplay = 'none';
      }
  },
  mounted(){
    if(localStorage){
        let st = localStorage;
        let tutorial = JSON.parse(st.getItem('tutorial'));

        if(tutorial != null){
            this.tutorialDisplay = 'none';            
        }else{
            this.tutorialDisplay = 'block';
            st.setItem('tutorial', JSON.stringify([{bool: true}]));
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#tutorial{
    display:table;
    text-align: center;
}
#tutorial iframe{
    display: table-cell;
    vertical-align: middle;
    position: fixed;
    top: 45%;
    left: calc(50% - 128px);
}
#tutorial span{
    position: fixed;
    color: white;
    font-size: 30px;
    right: 12px;
    z-index: 10;
}
</style>
