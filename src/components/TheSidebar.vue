<template>
<div role="tablist">
    <b-card size="sm" class="text-center" >
      <b-card-text>АТЛАС ИЗМЕНЕНИЙ КЛИМАТА УРАЛА</b-card-text>
      </b-card>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-1 variant="info">Карты</b-button>
      </b-card-header>
      <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel" @bv::collapse::state="clickMaps">
        <b-card-body>
          <rastersController></rastersController>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-3 variant="info">Статистика опасных явлений</b-button>
      </b-card-header>
      <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel" @input="clickStat">
        <b-card-body>
          <layerControl></layerControl>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-4 variant="info">База данных ОЯ</b-button>
      </b-card-header>
      <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel" @input="clickStat">
        <b-card-body>
         <stations-picker></stations-picker>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-2 variant="info">Анимированные изображения</b-button>
      </b-card-header>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel" @input="clickExtreme">
        <b-card-body>
          <extreme-events-controller></extreme-events-controller>
        </b-card-body>
      </b-collapse>
    </b-card>

  </div>
</template>

<script>

// dom.watch()
import layerControl from './SidebarLayerControl'
import rastersController from './SidebarRasterController'
import stationsPicker from './SidebarStationPicker'
import extremeEventsController from './SidebarExtremeEventsController'
// import RasterPicker from './RasterPicker'

export default {
  props: {
    sidebarWidth: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      text: '111'
    }
  },
  name: 'my-sidebar-menu',
  methods: {
    clickMaps (visible, e) {
      console.log(visible, e)
      if (visible) {
        this.$store.commit('SET_WMS_VISIBILITY', true)
        this.$store.commit('SET_LEGEND_VISIBILLITY', true)
        this.$store.commit('SET_GEOJSON_VISIBILITY', false)
        this.$store.commit('SET_INFO_STATUS', true)
      } else {
        this.$store.commit('SET_WMS_VISIBILITY', false)
        this.$store.commit('SET_LEGEND_VISIBILLITY', false)
        this.$store.commit('SET_INFO_STATUS', false)
      }
    },
    clickStat (visible) {
      // console.log(visible)
      // this.$store.commit('SET_GEOJSON_VISIBILITY', true)
      if (visible) {
        this.$store.commit('SET_GEOJSON_VISIBILITY', true)
        // this.$store.commit('CLEAR_GEO_JSON_FILTER')
        this.$store.commit('SET_WMS_VISIBILITY', false)
        this.$store.commit('SET_LEGEND_VISIBILLITY', false)
        this.$store.commit('SET_INFO_STATUS', false)
      } else {
        this.$store.commit('SET_GEOJSON_VISIBILITY', false)
        this.$store.commit('CLEAR_GEO_JSON_FILTER')
      }
      // this.$emit('toggleSidebar', this.$refs._sidebar.sidebarWidth)
      // this.$store.commit('toggleSideBarStatus')
      // console.log(this.width)
      // console.log(this.$refs.sidebar.sidebarWidth)
    },
    clickDB (visible) {
      // console.log(visible)
      // this.$store.commit('SET_GEOJSON_VISIBILITY', true)
      if (visible) {
        this.$store.commit('CLEAR_GEO_JSON_FILTER')
        this.$store.commit('SET_GEOJSON_VISIBILITY', true)
        this.$store.commit('SET_WMS_VISIBILITY', false)
        this.$store.commit('SET_LEGEND_VISIBILLITY', false)
        this.$store.commit('SET_INFO_STATUS', false)
        this.$store.commit('CLEAR_GEO_JSON_FILTER')
      } else {
        this.$store.commit('SET_GEOJSON_VISIBILITY', false)
      }
      // this.$emit('toggleSidebar', this.$refs._sidebar.sidebarWidth)
      // this.$store.commit('toggleSideBarStatus')
      // console.log(this.width)
      // console.log(this.$refs.sidebar.sidebarWidth)
    },
    clickExtreme (visible) {
      if (visible) {
        if (this.$_.isEmpty(this.$store.state.getters.GET_EXTREME_SELECTED_EVENT)) {
          this.$store.commit('SET_EXTREME_VISIBILLITY', false)
          this.$store.commit('SET_LEGEND_VISIBILLITY', false)
        } else {
          this.$store.commit('SET_EXTREME_VISIBILLITY', true)
          this.$store.commit('SET_LEGEND_VISIBILLITY', true)
        }
        this.$store.commit('SET_GEOJSON_VISIBILITY', false)
      } else {
        this.$store.commit('SET_EXTREME_VISIBILLITY', false)
        this.$store.commit('SET_LEGEND_VISIBILLITY', false)
      }
    }
  },
  components: {
    layerControl, rastersController, stationsPicker, extremeEventsController
  }
  // LayerController
  // RasterPicker

}
</script>
<style>
</style>
