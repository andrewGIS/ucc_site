<template >
  <div>
    <b-container>
      <b-row>
        <raster-picker ref="rasterPicker1" :map-num="1"></raster-picker>
        <b-form-checkbox
          v-model="showSecondMap"
          name="check-button"
          switch
          @change="toggleSecondMap"
        >Показать вторую карту</b-form-checkbox>
        </b-row>
      <b-row align-content="start">
        <b-button @click="startAnimPeriods">
          <b-icon-play></b-icon-play>
        </b-button>
        <b-button @click="brakeAnimation">
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
      showSecondMap: false
    }
  },
  methods: {
    startAnimPeriods () {
      this.showSecondMap = false
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
    toggleInfo () {
      this.$store.commit('SET_INFO_STATUS', !this.infoStatus)
    }
  },
  computed: {
    infoStatus () {
      return this.$store.getters.GET_INFO_STATUS
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
