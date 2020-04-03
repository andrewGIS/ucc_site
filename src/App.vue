<template>
  <div>
  <b-container fluid >
    <b-row>
      <b-col v-show="sideBarVisible" xs="12" sm="6" md="6" lg="5" xl="4" >
        <my-sidebar-menu ></my-sidebar-menu>
      </b-col>
        <b-col>
            <div style="display:flex;cursor:pointer;padding-top:15px;padding-bottom:5px;position:absolute;align-content:center;z-index:10000;left:20%;right:20%;background:white;justify-content:center;border-radius:0.25rem;" varinant="info" v-if="!sideBarVisible" @click="toggleVisible" v-b-tooltip.hover title="Нажмите, чтобы показать меню">
              <b-icon class="h3" icon="list" variant="info"></b-icon><span style="font-size:1.0rem;"> АТЛАС ИЗМЕНЕНИЙ КЛИМАТА УРАЛА</span>
            </div>
            <my-map :key="keyTest"></my-map>
        </b-col>
    </b-row>
  </b-container>
  <b-toast id="askHelp" title="Информация" toaster="b-toaster-top-center" no-auto-hide >
      Похоже вы у нас первый раз. Нужна помощь ?
      <b-container>
        <b-row align-h="around">
          <b-button size="sm" @click="setHelp(true)">Да</b-button>
          <b-button size="sm" @click="setHelp(false)">Нет</b-button>
        </b-row>
      </b-container>
  </b-toast>

  <b-toast id="sideBarInfo" title="Подсказка" no-auto-hide append-toast>
      Это разделы атласа. Вы можете переключаться на каждый из них. Для удобства можно скрыть меню, нажав на заголовок АТЛАС ИЗМЕНЕНИЙ КЛИМАТА УРАЛА
      <b-container>
        <b-media right-align vertical-align="center">
          <b-img :src="require('././assets/infoPics/sideBar.jpg')" style="width:100%"></b-img>
        </b-media>
      </b-container>
  </b-toast>
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
      // isFirstTime: ''
      keyTest: 1
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
    },
    helpStatus () {
      return this.$store.getters.GET_HELP_STATUS
    },
    secondMap () {
      return this.$store.getters.GET_SECOND_MAP_VISIBILLITY
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
    },
    askHelp () {
      this.$bvToast.show('askHelp')
    },
    closeHelpAsk () {
      this.$bvToast.hide('askHelp')
    },
    setHelp (payload) {
      this.$store.commit('SET_HELP_STATUS', payload)
      this.closeHelpAsk()
      if (payload) {
        this.$bvToast.show('sideBarInfo')
      }
    },
    updateKey () {
      this.keyTest += 1
    }
  },
  watch: {
    secondMap: function (newVal, oldVal) {
      if (!newVal) {
        this.updateKey()
      }
    }
  },
  mounted () {
    // alert(localStorage.isFirstTime)
    if (!localStorage.isFirstTime) {
      localStorage.isFirstTime = false
      this.askHelp()
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
