<template>
  <div style="height:100vh;">
  <b-container fluid >
    <b-row >
      <b-col v-show="sideBarVisible" xs="12" sm="6" md="6" lg="5" xl="4" >
        <my-sidebar-menu ></my-sidebar-menu>
      </b-col>
      <b-col>
          <div style="display:flex;cursor:pointer;padding-top:15px;padding-bottom:5px;position:absolute;align-content:center;z-index:10000;left:20%;right:20%;background:white;justify-content:center;border-radius:0.25rem;" varinant="info" v-if="!sideBarVisible" @click="toggleVisible" v-b-tooltip.hover title="Нажмите, чтобы показать меню">
            <b-icon class="h3" icon="list" variant="info"></b-icon><span style="font-size:1.0rem;"> АТЛАС ИЗМЕНЕНИЙ КЛИМАТА УРАЛА</span>
            </div>
          <my-map></my-map>
      </b-col>
    </b-row>
  </b-container>
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
  data () {
    return {
      // sideBarVisible: true
    }
  },
  name: 'App',
  // computed: {
  // width () {
  //   return this.$store.state.sideBarWidth
  // }
  // },
  computed: {
    sideBarVisible () {
      return this.$store.getters.GET_SIDEBAR_VISIBLE
    }
  },
  components: {
    MySidebarMenu, MyMap
    // MySidebarMenu,
    // MyMap
  },
  methods: {
    toggleVisible () {
      this.$store.commit('SET_SIDEBAR_VISIBLE', !this.sideBarVisible)
    }
  }
}
</script>

<style>
/* .leaflet-container path{
  transition: fill .75s;
} */
/* .leaflet-tile{
  filter:blur(10px);
  opacity: 0;
  transform: rotate( 0deg ) scale(0);
}
.leaflet-tile.leaflet-tile-loaded{
  filter:blur(0);
  opacity: 1;
  transform: rotate( 360deg ) scale(1);
  transition: .2s all ease-in;
} */
</style>
