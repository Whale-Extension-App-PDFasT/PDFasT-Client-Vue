<template>
    <div class="col-md-12 urlfileframe">
        <div class="urlfileframe">
            <button type="button" id="webButton" class="btn btn-default" v-on:click="webButton"></button>
            <button type="button" id="localButton" class="btn btn-default" v-on:click="localButton"></button>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { EventBus } from "./../index.js"
export default {
    name: 'Urlfile',
    methods: {
        webButton(){
            EventBus.$emit('changeWebStyle');
            EventBus.$emit('showPopup');

            let queryInfo = {
                url: ["*://*/*.pdf"]
            };
            chrome.tabs.query(queryInfo, function(tabs) {
                EventBus.$emit('ulEmpty');
                if(tabs.length == 0){
                    EventBus.$emit('ulAddTab', '<span style="position:absolute;top:100px;text-align:center">현재 브라우저에 PDF가 없습니다.</span>');
                }
                for(let i in tabs){
                    EventBus.$emit('ulAddTab', `<li class="pop_body_li" data-url="${tabs[i]['url']}">${tabs[i]['title']}</li>`);
                }
            });
        },
        localButton(){
            EventBus.$emit('changeFolderStyle');

            window.open("https://pdfast.run.goorm.io/build/generic/web/local_viewer.html", '_blank');
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
