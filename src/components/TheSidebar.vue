<template>
<div>
        <b-list-group-item button style="cursor:pointer;padding-top:20px;padding-bottom:20px;" @click="toggleVisible" v-b-tooltip.hover title="Нажмите, чтобы скрыть меню">
              <b-icon icon="list" font-scale="1.4" style="vertical-align:bottom;"></b-icon><span>  АТЛАС ИЗМЕНЕНИЙ КЛИМАТА УРАЛА</span>
        </b-list-group-item>

      <b-list-group >

        <b-list-group-item button v-if="activeGroup===''||activeGroup==='maps'" @click="clickMaps">
          <b-icon-arrow-left v-if="activeGroup==='maps'" size="sm"></b-icon-arrow-left>
              <span v-if="activeGroup===''||activeGroup==='maps'">Карты</span>
        </b-list-group-item>

      <b-list-group-item button v-if="activeGroup===''||activeGroup==='stat'" @click="clickStat">
        <b-icon-arrow-left  class="chapter" v-if="activeGroup==='stat'" size="sm" ></b-icon-arrow-left>
        <span class="chapter" v-if="activeGroup===''||activeGroup==='stat'" >Статистика</span>
      </b-list-group-item>

      <b-list-group-item button v-if="activeGroup===''||activeGroup==='DB'" @click="clickDB">
        <b-icon-arrow-left class="chapter" v-if="activeGroup==='DB'" size="sm"></b-icon-arrow-left>
        <span  class="chapter" v-if="activeGroup===''||activeGroup==='DB'" >БД</span>
      </b-list-group-item>

      <b-list-group-item button v-if="activeGroup===''||activeGroup==='extreme'" @click="clickExtreme">
        <b-icon-arrow-left class="chapter" v-if="activeGroup==='extreme'" size="sm" ></b-icon-arrow-left>
        <span class="chapter" v-if="activeGroup===''||activeGroup==='extreme'" >Отдельные случаи</span>
      </b-list-group-item>
      </b-list-group>

      <b-container>
        <rastersController v-if="activeGroup==='maps'"></rastersController>
        <layerControl v-if="activeGroup==='stat'"></layerControl>
        <stations-picker v-if="activeGroup==='DB'"></stations-picker>
        <extreme-events-controller v-if="activeGroup==='extreme'"></extreme-events-controller>
      </b-container>

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
  data () {
    return {
      activeGroup: ''
    }
  },
  name: 'my-sidebar-menu',
  methods: {
    setActiveGroup (groupName) {
      this.activeGroup = groupName
    },
    clear () {
      this.activeGroup = ''
    },
    clickMaps () {
      if (this.activeGroup) {
        this.activeGroup = ''
        this.$store.commit('SET_WMS_VISIBILITY', false)
        this.$store.commit('SET_LEGEND_VISIBILLITY', false)
        this.$store.commit('SET_SECOND_MAP_VISIBILITY', false)
        this.$store.commit('SET_INFO_STATUS', false)
        this.$store.commit('SET_MAP_ZOOM', 14)
      } else {
        this.activeGroup = 'maps'
        this.$store.commit('SET_WMS_VISIBILITY', true)
        this.$store.commit('SET_LEGEND_VISIBILLITY', true)
        // this.$store.commit('SET_INFO_STATUS', true)
        this.$store.commit('SET_MAP_ZOOM', 6)
      }
    },
    clickStat () {
      if (this.activeGroup) {
        this.activeGroup = ''
        this.$store.commit('SET_GEOJSON_VISIBILITY', false)
        this.$store.commit('CLEAR_GEO_JSON_FILTER')
      } else {
        this.activeGroup = 'stat'
        this.$store.commit('SET_GEOJSON_VISIBILITY', true)
        this.$store.commit('SET_MAP_ZOOM', 14)
      }
    },
    clickDB () {
      if (this.activeGroup) {
        this.activeGroup = ''
        this.$store.commit('SET_GEOJSON_VISIBILITY', false)
      } else {
        this.activeGroup = 'DB'
        this.$store.commit('SET_GEOJSON_VISIBILITY', true)
        this.$store.commit('SET_MAP_ZOOM', 14)
      }
    },
    clickExtreme () {
      if (this.activeGroup) {
        this.activeGroup = ''
        this.$store.commit('SET_EXTREME_VISIBILLITY', false)
        this.$store.commit('SET_LEGEND_VISIBILLITY', false)
        this.$store.commit('SET_EXTREME_SELECTED_EVENT', {})
        this.$store.commit('SET_MAP_ZOOM', 14)
      } else {
        this.activeGroup = 'extreme'
        this.$store.commit('SET_EXTREME_VISIBILLITY', true)
        this.$store.commit('SET_MAP_ZOOM', 4)
      }
    },
    toggleVisible () {
      this.$store.commit('SET_SIDEBAR_VISIBLE', false)
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
.chapter {
  cursor: pointer;
}
</style>
