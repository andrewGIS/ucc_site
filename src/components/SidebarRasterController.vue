<template >
  <div>
    <b-container>
      <b-row>
        <raster-picker ref="rasterPicker1" :map-num="1"></raster-picker>
        <b-form-group>
          <b-form-checkbox-group switches :disabled="busy">
              <b-form-checkbox
              v-model="selected"
              value="identify"
                >Включить идентификацию на карте (по щелчку)</b-form-checkbox>
              <b-form-checkbox
                v-model="selected"
                value="secondMap"
              >Показать вторую карту
              </b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </b-row>
      <b-row align-content="start" v-show="!showSecondMap">
        <b-button @click="startAnimPeriods" :disabled="busy">
          <b-icon-play></b-icon-play>
        </b-button>
        <b-button @click="brakeAnimation" :disabled="!busy">
          <b-icon-square></b-icon-square>
        </b-button>
        <!-- experimantal function of idaentification  -->
        <!-- <b-button @click="toggleInfo" :disabled="showSecondMap">
          <b-icon-info></b-icon-info>
        </b-button> -->
      </b-row>
      <!-- Second map controller -->
      <b-row v-if="showSecondMap">
          <raster-picker ref="rasterPicker2" :map-num="2"></raster-picker>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// TODO : Make
// separate json in production for manual change group and indicators
// import json from '../assets/indicators.json'

// import * as _ from 'lodash'
// import { allMetadata } from '../assets/indicators_meta_v2'
import rasterPicker from './SidebarRasterPicker'

export default {
  name: 'rasters-controller',
  data () {
    return {
      // show second map
      selected: [false, false],
      // infoStatus: false,
      showSecondMap: false
    }
  },
  computed: {
    busy () {
      return this.$store.getters.GET_BUSY_STATE
    }
  },
  watch: {
    selected: function (newVal, oldVal) {
      if (this.$_.includes(newVal, 'identify') && !this.$_.includes(oldVal, 'identify')) {
        this.$store.commit('SET_INFO_STATUS', true)
      }
      if (!this.$_.includes(newVal, 'identify') && this.$_.includes(oldVal, 'identify')) {
        this.$store.commit('SET_INFO_STATUS', false)
      }
      if (this.$_.includes(newVal, 'secondMap') && !this.$_.includes(oldVal, 'secondMap')) {
        this.$store.commit('SET_SECOND_MAP_VISIBILITY', true)
        this.showSecondMap = true
      }
      if (!this.$_.includes(newVal, 'secondMap') && this.$_.includes(oldVal, 'secondMap')) {
        this.$store.commit('SET_SECOND_MAP_VISIBILITY', false)
        this.showSecondMap = false
      }
    }
  },
  methods: {
    startAnimPeriods () {
      this.$store.commit('SET_SECOND_MAP_VISIBILITY', false)
      this.$refs.rasterPicker1.startAnimation()
    },
    brakeAnimation () {
      this.$refs.rasterPicker1.brakeAnimation()
    },
    toggleSecondMap (payload) {
      // this.$store.commit('SET_INFO_STATUS', !this.infoStatus)
      this.$store.commit('SET_SECOND_MAP_VISIBILITY', payload)
    },
    toggleInfo (payload) {
      // this.$store.commit('SET_INFO_STATUS', !this.infoStatus)
      this.$store.commit('SET_INFO_STATUS', payload)
    }
  },
  components: {
    rasterPicker
  }
}

// add functions
// function sleep (ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }
</script>

<style>

</style>
