<template >
  <div>
    <div>

      <raster-picker :map-num="1"></raster-picker>

        <b-form-checkbox v-model="showSecondMap" name="check-button" switch @change="toggleSecondMap">
          Показать вторую карту
        </b-form-checkbox>
      </div >

      <b-button @click="startAnimPeriods">Запуск анимации</b-button>
      <b-button @click="brakeAnimation">Остановка анимации</b-button>
        <!-- Second map controller -->
        <div v-if="showSecondMap">
          <raster-picker :map-num="2"></raster-picker>
        </div>

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
      /**
       * Animate period for selected indicator
       * Time control in duration variable
       */
      // var index = _.indexOf(this.aviable_periods, this.selected_period) + 1

      // var duration = 2000

      // this.isAnimation = true
      // // this.updateAnimationStatus(true)
      // // this.layerWms.redraw()
      // // this.layerWms.on('load', () => {
      //   if (index < this.aviable_periods.length && this.is_animation) {
      //     this.timer = setTimeout(() => {
      //       this.selected_period = this.aviable_periods[index]
      //       this.update_layer()
      //       index += 1
      //       this.layer_wms.redraw()
      //     }, duration)
      //   } else {
      //     this.brake_animation()
      //   }
      // })
    },
    brakeAnimation () {
      /**
       * Brake animation
       */
      this.isAnimation = false
      this.updateAnimationStatus(false)
      // this.layer_wms.off()
      // clearTimeout(this.timer)
    },
    toggleSecondMap (payload) {
      this.$store.commit('SET_SECOND_MAP_VISIBILITY', payload)
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

<style></style>
