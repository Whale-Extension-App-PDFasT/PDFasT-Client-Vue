<template>
  <div class="popup_back modal" v-bind:style="{ display: popupDisplay }">
    <div class="popup" id="popuphide">
      <div class="pop_header">
        {{ WEB_POPUP_TITLE }} <img src="/img/refresh.png" id="refresh" v-on:click="refresh" />
      </div>

      <div class="pop_body"><ul v-html="ulContents"></ul></div>

      <div class="pop_footer">
        <button
          type="button"
          id="popConvert"
          class="btn btn-default"
          v-on:click="convert"
          i18n-content="WEB_POPUP_CONVERT"
        ></button>
        <button
          type="button"
          id="popCancel"
          class="btn btn-default"
          v-on:click="cancel"
          i18n-content="WEB_POPUP_CANCEL"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { EventBus } from './../index.js'

$(document).on('click', '.pop_body ul li', function() {
  let ulList = $('.pop_body ul li')
  if (ulList.hasClass('pop_body_li_click') == false) {
    ulList.toggleClass('pop_body_li_click', false)
    ulList.toggleClass('pop_body_li', true)
    $(this).toggleClass('pop_body_li', false)
    $(this).toggleClass('pop_body_li_click', true)
  } else {
    if ($(this).hasClass('pop_body_li') == false) {
      ulList.toggleClass('pop_body_li_click', false)
      ulList.toggleClass('pop_body_li', true)
    } else {
      ulList.toggleClass('pop_body_li_click', false)
      ulList.toggleClass('pop_body_li', true)
      $(this).toggleClass('pop_body_li', false)
      $(this).toggleClass('pop_body_li_click', true)
    }
  }
})

export default {
  name: 'Popup',
  data() {
    return {
      popupDisplay: 'none',
      ulContents: '',
      WEB_POPUP_TITLE: whale.i18n.getMessage('WEB_POPUP_TITLE')
    }
  },
  created() {
    EventBus.$on('showPopup', () => {
      this.popupDisplay = 'block'
    })
    EventBus.$on('hidePopup', () => {
      this.popupDisplay = 'none'
    })
    EventBus.$on('ulEmpty', () => {
      this.ulContents = ''
    })
    EventBus.$on('ulAddTab', val => {
      this.ulContents += val
    })
  },
  methods: {
    convert() {
      let clickedLi = $('.pop_body ul li')
      if (clickedLi.hasClass('pop_body_li_click') == true) {
        var form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('target', '_blank')
        form.setAttribute('action', 'https://pdfast.run.goorm.io/web.php')
        document.body.appendChild(form)

        var insert = document.createElement('input')
        insert.setAttribute('type', 'hidden')
        insert.setAttribute('name', 'test')
        insert.setAttribute(
          'value',
          'https://cors-anywhere.herokuapp.com/' + $('.pop_body_li_click').attr('data-url')
        )
        form.appendChild(insert)
        form.submit()

        if (localStorage) {
          let st = localStorage
          let recent_tab = JSON.parse(st.getItem('1'))

          if (recent_tab == null) {
            recent_tab = []
          }

          recent_tab.push({
            title: `${$('.pop_body_li_click').text()}`,
            url: `${$('.pop_body_li_click').attr('data-url')}`
          })
          st.setItem('1', JSON.stringify(recent_tab))
        }
        EventBus.$emit('render_recent')
        EventBus.$emit('changeTitle', $('.pop_body_li_click').text())
        this.popupDisplay = 'none'
      }
    },
    cancel() {
      this.popupDisplay = 'none'
    },
    refresh() {
      let queryInfo = {
        url: ['*://*/*.pdf']
      }
      chrome.tabs.query(queryInfo, function(tabs) {
        EventBus.$emit('ulEmpty')
        if (tabs.length == 0) {
          EventBus.$emit(
            'ulAddTab',
            `<span style="position:absolute;top:100px;text-align:left">${whale.i18n.getMessage(
              'FAVORITE_POPUP_CONTENT'
            )}</span>`
          )
        }
        for (let i in tabs) {
          EventBus.$emit(
            'ulAddTab',
            `<li class="pop_body_li" data-url="${tabs[i]['url']}">${tabs[i]['title']}</li>`
          )
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
