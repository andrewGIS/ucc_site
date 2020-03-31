<template>
  <l-wms-tile-layer ref="wms" :visible="WMSVisible" :base-url="baseUrl" :format="formatWMS" :layers="layers" :opacity="0.5" :options="WMSOptions"></l-wms-tile-layer>
</template>

<script>
import { LWMSTileLayer } from 'vue2-leaflet'
export default {
  name: 'WMSLayer',
  props: {
    mapNum: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      formatWMS: 'image/png'
    }
  },
  computed: {
    WMSVisible () {
      return this.$store.getters.GET_WMS_VISIBILITY
    },
    baseUrl () {
      return `${this.$store.state.host}/geoserver/ucc/ows?`
    },
    layers () {
      return `${this.$store.state.gsWorkspaceName}:${this.$store.state.gsMosaicLayerName}`
    },
    CQLFilter () {
      return this.$store.getters.GET_MAP_FILTER(this.mapNum)
    },
    style () {
      return this.$store.getters.GET_MAP_STYLE(this.mapNum)
    },
    WMSOptions () {
      return {
        styles: this.$store.getters.GET_MAP_STYLE(this.mapNum),
        cql_filter: this.$store.getters.GET_MAP_FILTER(this.mapNum)
      }
    }
  },
  watch: {
    // this.wms1.wmsParams.CQL_Filter
    CQLFilter: function () {
      this.$refs.wms.mapObject.wmsParams.CQL_Filter = this.$store.getters.GET_MAP_FILTER(this.mapNum)
      this.$refs.wms.mapObject.redraw()
    },
    style: function () {
      this.$refs.wms.mapObject.wmsParams.styles = this.$store.getters.GET_MAP_STYLE(this.mapNum)
      this.$refs.wms.mapObject.redraw()
    },
    WMSVisible: function () {
      this.$refs.wms.mapObject.remove()
    }
  },
  components: {
    'l-wms-tile-layer': LWMSTileLayer
  },
  mounted () {
    this.$nextTick(() => {
      if (this.mapNum === 1) {
        this.$store.commit('SET_WMS_ANIM', this.$refs.wms.mapObject)
      }
    })
  }
}
</script>

<style>

</style>
