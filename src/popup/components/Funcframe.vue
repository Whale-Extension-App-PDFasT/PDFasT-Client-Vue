<template>
    <div class="col-md-12 funcframe" id="funcframe">
        <img src="/img/plus.png" v-bind:style="{display: displayState}" v-on:click="showFav"/>

        <div role="tabpanel">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" class="active"><a href="#recent" aria-controls="recent" role="tab" data-toggle="tab" v-on:click="favBtnOn" i18n-content="MENU_RECENT"></a></li>
                <li role="presentation"><a href="#favorite" aria-controls="favorite" role="tab" data-toggle="tab" v-on:click="favBtnOff" i18n-content="MENU_FAVORITE"></a></li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="recent">
                    <ul id="recent_ul" v-html="recentUl"></ul>                    
                </div>
                <div role="tabpanel" class="tab-pane" id="favorite">
                    <ul id="favorite_ul" v-html="favUl"></ul>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { EventBus } from "./../index.js"

$(document).on('click','#recent_ul li span a',function(){
    var form = document.createElement("form");
    form.setAttribute("method","post");
    form.setAttribute("target","_blank");
    form.setAttribute("action","https://pdfast.run.goorm.io/web.php");
    document.body.appendChild(form);

    var insert = document.createElement("input");
    insert.setAttribute("type","hidden");
    insert.setAttribute("name","test");
    insert.setAttribute("value", "https://cors-anywhere.herokuapp.com/" + $(this).parent().parent().attr("data-url"));
    form.appendChild(insert);

    form.submit();

    EventBus.$emit('changeTitle', $(this).text());
    EventBus.$emit('changeWebStyle');    
});

$(document).on('click','#favorite_ul li span a',function(){
    var form = document.createElement("form");
    form.setAttribute("method","post");
    form.setAttribute("target","_blank");
    form.setAttribute("action","https://pdfast.run.goorm.io/web.php");
    document.body.appendChild(form);

    var insert = document.createElement("input");
    insert.setAttribute("type","hidden");
    insert.setAttribute("name","test");
    insert.setAttribute("value", "https://cors-anywhere.herokuapp.com/" + $(this).parent().parent().attr("data-url"));
    form.appendChild(insert);

    form.submit();

    EventBus.$emit('changeTitle', $(this).text());
    EventBus.$emit('changeWebStyle');    
});

$(document).on('click',"#recent img[src='/img/li_cancel.png']",function(){
    if(localStorage){
        let st = localStorage;
        let recent_tab = JSON.parse(st.getItem('1'));
        
        recent_tab.splice($(this).parent().parent().attr("data-num"), 1);
        st.setItem('1', JSON.stringify(recent_tab));
        EventBus.$emit('render_recent');
    }
});

$(document).on('click',"#favorite img[src='/img/li_cancel.png']",function(){
    if(localStorage){
        let st = localStorage;
        let favorite_tab = JSON.parse(st.getItem('2'));
        
        favorite_tab.splice($(this).parent().parent().attr("data-num"), 1);
        st.setItem('2', JSON.stringify(favorite_tab));
        EventBus.$emit('render_favorite');
    }
});

export default {
    name: 'Funcframe',
    data(){
        return{
            displayState: 'none',
            favUl: '',
            recentUl: '',
        };
    },
    methods: {
        favBtnOn(){
            this.displayState = 'none';
        },
        favBtnOff(){            
            this.displayState = 'block';
        },
        showFav(){
            EventBus.$emit('showPopupFav');

            let queryInfo = {
                url: ["*://*/*.pdf"]
            };
            chrome.tabs.query(queryInfo, function(tabs) {
                EventBus.$emit('FavulEmpty');
                if(tabs.length == 0){
                    EventBus.$emit('FavulAddTab', `<span style="position:absolute;top:100px;text-align:left">${whale.i18n.getMessage('WEB_POPUP_CONTENT')}</span>`);
                }
                for(let i in tabs){
                    EventBus.$emit('FavulAddTab', `<li class="pop_body_li" data-url="${tabs[i]['url']}">${tabs[i]['title']}</li>`);
                }
            });
        }
    },
    created(){
        EventBus.$on('render_favorite', () => {
            this.favUl = '';
            if(localStorage){
                let st = localStorage;
                let favorite_tab = JSON.parse(st.getItem('2'));
                for(let i in favorite_tab){
                    this.favUl = `<li data-url="${favorite_tab[i]['url']}" data-num="${i}">
                    <span>
                        <img class="li_bulb" src="/img/li_bulb_on.png">
                        <a>${favorite_tab[i]['title']}</a>
                        <img src="/img/li_cancel.png">
                    </span></li>` + this.favUl;
                }
            }
        });
        EventBus.$on('render_recent', () => {
            this.recentUl = '';
            if(localStorage){
                let st = localStorage;
                let recent_tab = JSON.parse(st.getItem('1'));
                for(let i in recent_tab){
                    this.recentUl = `<li data-url="${recent_tab[i]['url']}" data-num="${i}">
                    <span>
                        <img class="li_bulb" src="/img/li_bulb_on.png">
                        <a>${recent_tab[i]['title']}</a>
                        <img src="/img/li_cancel.png">
                    </span></li>` + this.recentUl;
                }
            }
            
        });
    },
    mounted(){
        EventBus.$emit('render_favorite');
        EventBus.$emit('render_recent');
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#funcframe div ul.nav{
    font-weight: 700;
    font-family: Moebius_Bold_kor;
}
#funcframe div ul.nav li:not(.active){
    background-color: #ECECEC;
}
.nav-tabs>li:not(.active)>a{
    color:gray;
}
</style>
