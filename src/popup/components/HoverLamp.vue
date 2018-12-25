<template>
    <div class="hoverLamp2_back" id="hoverLamp_back">
        <div class="hoverLamp2" id="hoverLamp" v-on:click="closeAlltabs"></div>
        <span>변환된 모든탭<br/>종료</span>
    </div>
</template>

<script>
/* eslint-disable */
import { EventBus } from "./../index.js"
export default {
  name: 'HoverLamp',
  methods: {
    closeAlltabs(){
        if($('.lamp')[0].getAttribute('src') != '/img/lamp_off2.png'){
            chrome.tabs.getAllInWindow(null, function(tabs){
                const str = "pdfast.run.goorm.io"; 
                
                for (var i = 0; i < tabs.length; i++) {
                    const url = tabs[i].url;
                    const id = tabs[i].id;
                    const num = url.search(str);
                    if(num != -1){
                        chrome.tabs.remove(id);
                    }                    
                }
            });

            let fileframe = document.getElementById('fileframe');
            let innerfileframe = document.getElementById('innerfileframe');

            EventBus.$emit('changeDefaultStyle');
            
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
