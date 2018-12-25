<template>
    <div class="popup_favorite_back modal" v-bind:style="{display: popupDisplay}">
        <div class="popup_favorite">
            <div class="pop_favorite_header">
                <span>즐겨찾기</span> 추가할 탭 목록
                <img src="/img/refresh.png" id="favorite_refresh" v-on:click="refresh"/>
            </div>

            <div class="pop_favorite_body">
                <ul v-html="ulContents">
                </ul>
            </div>

            <div class="pop_favorite_footer">
                <button type="button" id="pop_favoriteConvert" class="btn btn-default" v-on:click="addFav">추가</button>
                <button type="button" id="pop_favoriteCancel" class="btn btn-default" v-on:click="cancel">취소</button>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { EventBus } from "./../index.js"

$(document).on('click','.pop_favorite_body ul li',function(){
    let favulList = $('.pop_favorite_body ul li');
    if(favulList.hasClass('pop_favorite_body_li_click') == false){        
        favulList.toggleClass('pop_favorite_body_li_click', false);
        favulList.toggleClass('pop_favorite_body_li', true);
        $(this).toggleClass('pop_favorite_body_li', false);
        $(this).toggleClass('pop_favorite_body_li_click', true);        
    }else{
        if($(this).hasClass('pop_favorite_body_li') == false){
            favulList.toggleClass('pop_favorite_body_li_click', false);
            favulList.toggleClass('pop_favorite_body_li', true);
        }else{
            favulList.toggleClass('pop_favorite_body_li_click', false);
            favulList.toggleClass('pop_favorite_body_li', true);
            $(this).toggleClass('pop_favorite_body_li', false);
            $(this).toggleClass('pop_favorite_body_li_click', true);
        }
    }
});

export default {
  name: 'Popup_favorite',
  data() {
      return{
          popupDisplay: 'none',
          ulContents: '',
      }
  },
  created(){
    EventBus.$on('showPopupFav', () => {
        this.popupDisplay = 'block';
    });
    EventBus.$on('hidePopupFav', () => {
        this.popupDisplay = 'none';
    });
    EventBus.$on('FavulEmpty', () => {
        this.ulContents = '';
    });
    EventBus.$on('FavulAddTab', (val) => {
        this.ulContents += val;
});
  },
  methods: {
      addFav(){
        if($('.pop_favorite_body ul li').hasClass('pop_favorite_body_li_click')){
            if(localStorage){
                let st = localStorage;
                let favorite_tab = JSON.parse(st.getItem('2'));
                
                if(favorite_tab == null){
                    favorite_tab = [];
                }

                favorite_tab.push({title:`${$(".pop_favorite_body_li_click").text()}`, url:`${$(".pop_favorite_body_li_click").attr("data-url")}`});
                st.setItem('2', JSON.stringify(favorite_tab));

                EventBus.$emit('render_favorite');
                this.popupDisplay = 'none';
            }
        }
      },
      cancel(){
        this.popupDisplay = 'none';
      },
      refresh(){
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
