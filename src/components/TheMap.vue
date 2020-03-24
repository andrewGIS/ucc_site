<template>
<div class="map-wrapper">
      <div id="map1" :style="{width:mapWidth + '%'}">
      <l-map ref="mapFirst" :zoom="zoom" :center="center">
        <wms-layer :mapNum="1"></wms-layer>
        <wms-legend :mapNum="1"></wms-legend>

        <!-- // test identification -->
        <l-marker ref="markerTest" :visible="markerVisibility" :lat-lng="center" :options="markerOptions"></l-marker>

        <wms-extrem-events ></wms-extrem-events>

        <l-tile-layer :url="osmURL"></l-tile-layer>

        <station-layer></station-layer>

        <slider-extrem-events></slider-extrem-events>

      </l-map>
      </div>
      <div id="map2" :style="{width:mapWidth + '%'}" v-if="secondMap">
        <l-map :zoom="zoom" :center="center" >

          <!-- If after wms layer it is not display -->
          <l-tile-layer :url="osmURL"></l-tile-layer>

          <wms-layer :mapNum="2"></wms-layer>
          <wms-legend :mapNum="2"></wms-legend>

        </l-map>
      </div>
</div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'

export default {
  name: 'my-map',
  data () {
    return {
      map1: null,
      zoom: 5,
      minZoom: 4,
      maxZoom: 6,
      center: [59, 59],
      osmURL: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      formatWMS: 'image/png',
      markerVisibility: false
    }
  },
  methods: {
    enableMapInfo () {
      console.log('listen')
      // const size = this.map1.getSize()
    }
  },
  created () {
    this.$store.dispatch('LOAD_STATIONS')
  },
  computed: {
    infoStatus () {
      return this.$store.getters.GET_INFO_STATUS
    },
    CQLFilter1 () {
      return this.$store.getters.GET_MAP_FILTER(1)
    },
    secondMap () {
      return this.$store.getters.GET_SECOND_MAP_VISIBILLITY
    },
    mapWidth () {
      return this.secondMap === true ? 50 : 100
    },
    markerOptions () {
      return { opacity: 0.0 }
    }
    // TODO: make refactoring for reference on one function with
    // parameters
  },
  mounted () {
    this.$nextTick(() => {
      this.map1 = this.$refs.mapFirst.mapObject
      this.marker = this.$refs.markerTest.mapObject
      this.marker.bindTooltip('', {
        permanent: true,
        className: 'my-label',
        offset: [20.5, 25],
        direction: 'left'
      })
    })
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    // LGeoJson,
    // only this way working
    // more
    // https://forum.vuejs.org/t/did-you-register-the-component-correctly-for-recursive-components-make-sure-to-provide-the-name-option/34529/2
    'wms-legend': () => import('./MapRasterLegend.vue'),
    'station-layer': () => import('./MapStationLayer.vue'),
    'wms-layer': () => import('./MapWMSLayer.vue'),
    'slider-extrem-events': () => import('./MapExtremeEventSlider.vue'),
    'wms-extrem-events': () => import('./MapWMSExtremeLayer.vue')
  },
  watch: {
    infoStatus: function () {
      // experimental function for identification
      // const targetMarker = this.marker
      // if (this.infoStatus === true) {
      //   const targetMap = this.map1
      //   const condition = this.CQLFilter1
      //   const mapSize = targetMap.getSize()
      //   this.markerVisibility = true
      //   this.map1.on('mousemove', function (e) {
      //   // console.log(e)
      //     const point = targetMap.latLngToContainerPoint(e.latlng, targetMap.getZoom())
      //     // const url = `http://localhost:8090/geoserver/wms?&REQUEST=GetFeatureInfo&SERVICE=WMS&VERSION=1.3.0&srs=EPSG:4326&WIDTH=${size.x}&HEIGHT=${size.y}&x=${e.layerX}&y=${e.layerX}&BBOX=${this.map1.getBounds().toBBoxString()}&LAYERS=ucc:all_rasters_new&info_format=application/json&CQL_FILTER=${this.CQLFilter1}`
      //     const url = `http://localhost:8090/geoserver/wms?&REQUEST=GetFeatureInfo&SERVICE=WMS&VERSION=1.3.0&srs=EPSG:4326&WIDTH=${mapSize.x}&HEIGHT=${mapSize.y}&x=${point.x}&y=${point.y}&BBOX=${targetMap.getBounds().toBBoxString()}&LAYERS=ucc:all_rasters_new&QUERY_LAYERS=ucc:all_rasters_new&CQL_FILTER=${condition}&info_format=application/json`
      //     fetch(url)
      //       .then(response => { return response.json() })
      //       .then(data => {
      //         const text = data.features[0].properties.GRAY_INDEX
      //         targetMarker.setTooltipContent('<div>' + parseFloat(text).toFixed(1) + '</div>')
      //         targetMarker.setLatLng(e.latlng)
      //       })
      //   })
      // } else {
      //   this.markerVisibility = false
      //   targetMarker.unbindTooltip()
      //   this.marker = null
      //   this.map1.off('mouseover')
      // }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.map-wrapper {
  height: 100vh;
}
#map1, #map2 {
  height: 100%;
}
.map-wrapper {
  display: flex;
}
.overlay {
    position: relative;
    width: 100px;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index:10000;
    float: right;
}
</style>
