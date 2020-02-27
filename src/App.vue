<template>
  <div id="main_container">
    <div id="side_bar_container">
       <my-sidebar-menu></my-sidebar-menu>
    </div>
      <div v-bind:style="{'margin-left':width}" id="map_container">
      <my-map></my-map>
    </div>
    <!-- <div id="vuex_test">{{this.totalTvCount}}</div>
    <div id="sidebar_status">{{this.isSideBarOpen}}</div> -->
  </div>
</template>

<script>
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fas } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import MySidebarMenu from './components/TheSidebar'
import MyMap from './components/TheMap'

// import { mapState } from 'vuex'
// import { mapGetters } from 'vuex'

// library.add(fas)

// Vue.component('font-awesome-icon', FontAwesomeIcon)

export default {
  initData: {
    sideBarWidth: '350px'
  },
  name: 'App',
  data () {
    return {
      state: 'test',
      width: this.$options.initData.sideBarWidth
    }
    // initalWidth:this.$store.state.initSideBarWidth
    // value: mapState(['totalTvCount']),
  },
  // computed: {
  // width () {
  //   return this.$store.state.sideBarWidth
  // }
  // },
  components: {
    MySidebarMenu, MyMap
    // MySidebarMenu,
    // MyMap
  },
  methods: {
    updateMap (sideBarWidth) {
      // console.log('UpdateMap')
      // console.log(sideBarWidth)
      this.width = sideBarWidth
      // const els = this.$el.getElementsByClassName('vsm--item')[0]
      // console.log(els.__vue__.$listeners)
      // console.log(els.__vue__.$listeners = [])
      // els.$off()
      // els.removeEventListener('click', null, false)
      // console.log(document.getElementsByClassName('vsm--link'))
      // this.$refs.lmap.this.mapObject.invalidateSize()
      // console.log(this.$refs.lmap)
    }
  }
}
</script>

<style>
body {
  margin:0;
}
#main_container {
  font-family: apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* position: absolute; */
  width: 100%;
  height: 100vh;
  /* padding:50px; */
  /* margin-top: 60px; */
  /* display: flex; */
  /* flex-wrap: wrap; */
  /* display: flex; */
  /* justify-content: center; */
  /* overflow: hidden; */
  overflow: scroll;
}
#map_container {
  /* margin-left: 100px; */
  /* left:350px; */
  transition: cubic-bezier(0.075, 0.82, 0.165, 1);
  /* position: relative; */
  /* width: 100%; */
  height: 100vh;
  /* overflow: hidden; */
}
#test_vuex {
  background: red;
  /* left:100px; */
  z-index:10;
  width:100em;
  height: 100em;
  margin:auto;
}
#side_bar_container{
  width: 350px;
  float: left;
  overflow-y: scroll;
}
/* .collapsed {
  margin-left:350px;
} */
</style>
