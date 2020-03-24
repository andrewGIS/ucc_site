<template>
  <l-wms-tile-layer @anim-extreme="playAnim" ref="wmsExtreme" :visible="visible" :layers="layers" :format="formatWMS" :options="wmsOptions" :base-url="baseUrl" :opacity="0.5" ></l-wms-tile-layer>
</template>

<script>
import { LWMSTileLayer } from 'vue2-leaflet'
export default {
  name: 'WMSExtremeLayer',
  data () {
    return {
      formatWMS: 'image/png',
      layers: 'Rasters_Prec_July_2019'
    }
  },
  methods: {
    playAnim () {
      console.log('play anim')
    }
  },
  computed: {
    baseUrl () {
      return `${this.$store.state.host}/geoserver/ucc/ows?`
    },
    wmsOptions () {
      return {
        // eslint-disable-next-line quotes
        CQL_Filter: `location='icon_2019071312_027_tot_prec.tif'`
      }
    },
    selectedDate () {
      return this.$store.getters.GET_EXTREME_SELECTED_DATE
    },
    visible () {
      return this.$store.getters.GET_EXTREME_VISIBILLITY
    },
    selectedStyle () {
      return this.$store.getters.GET_EXTREME_SELECTED_EVENT.styleName
    }
  },
  watch: {
    // this.wms1.wmsParams.CQL_Filter
    selectedDate: function () {
      this.$refs.wmsExtreme.mapObject.setParams({ CQL_Filter: `location='icon_${this.selectedDate}_tot_prec.tif'` }, false)
      // this.$refs.wmsExtreme.mapObject.wmsParams.CQL_Filter = `location='icon_${this.selectedDate}_tot_prec.tif'`
      // this.$refs.wmsExtreme.mapObject.redraw()
    },
    visible: function () {
      this.$refs.wmsExtreme.mapObject.remove()
    },
    selectedStyle: function () {
      this.$refs.wmsExtreme.mapObject.wmsParams.styles = this.selectedStyle
      this.$refs.wmsExtreme.mapObject.redraw()
    }
  },
  components: {
    'l-wms-tile-layer': LWMSTileLayer
  },
  mounted () {
    this.$nextTick(() => {
      this.$store.commit('SET_EXTREME_WMS', this.$refs.wmsExtreme.mapObject)
    })
  }
}
</script>

<style>
.leaflet-container path{
  transition: fill .75s;
}
</style>
