<template>
  <l-wms-tile-layer ref="wmsExtreme" :visible="visible" :format="formatWMS" :base-url="baseUrl" :opacity="0.5" ></l-wms-tile-layer>
</template>

<script>
import { LWMSTileLayer } from 'vue2-leaflet'
export default {
  name: 'WMSExtremeLayer',
  data () {
    return {
      formatWMS: 'image/png'
      // layers: 'Rasters_Prec_July_2019'
    }
  },
  computed: {
    baseUrl () {
      return `${this.$store.state.host}/geoserver/ucc/ows?`
    },
    selectedDate () {
      return this.$store.getters.GET_EXTREME_SELECTED_DATE
    },
    visible () {
      return this.$store.getters.GET_EXTREME_VISIBILLITY
    },
    selectedStyle () {
      return this.$store.getters.GET_EXTREME_SELECTED_EVENT.styleName
    },
    layers () {
      return this.$store.getters.GET_EXTREME_SELECTED_EVENT.layers
    },
    fields () {
      return this.$store.getters.GET_EXTREME_SELECTED_EVENT.fieldsFilter
    },
    nameSelectedEvent () {
      return this.$store.getters.GET_EXTREME_SELECTED_EVENT.name
    }
  },
  watch: {
    // this.wms1.wmsParams.CQL_Filter
    selectedDate: function () {
      const layerFilter = this.fields.map(field =>
            `${field} like '%${this.selectedDate}%'`)
        .join(';')
      this.$refs.wmsExtreme.mapObject.setParams({ CQL_Filter: layerFilter }, false)
    },
    visible: function () {
      this.$refs.wmsExtreme.mapObject.remove()
    },
    nameSelectedEvent: function () {
      this.$refs.wmsExtreme.mapObject.wmsParams.layers = this.layers
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
</style>
