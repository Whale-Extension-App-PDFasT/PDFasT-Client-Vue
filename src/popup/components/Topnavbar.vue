<template>
    <div class="col-md-12 topnav">
        <div class="topNavDiv" id="topNavDiv">
            <Loading/>
            <Bubble_success/>
            <Bubble_fail />
            <HoverLamp />

            <a id="title">PDFasT</a>
            <span id="lamp_light" class="lamp_light"></span>
            <span id="lamp_back" class="lamp_back_off"></span>
            <img class="lamp" src="/img/lamp_off.png" />
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import Loading from '../Components/Loading'
import Bubble_success from '../Components/Bubble_success'
import Bubble_fail from './Bubble_fail'
import HoverLamp from './HoverLamp'

export default {
  name: 'Topnavbar',
  components: {
    Loading,
    Bubble_success,
    Bubble_fail,
    HoverLamp
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.topNavDiv{
    width:100%;
}
</style>
