<template>
<div class="map-wrapper">
      <div id="map1" :style="{width:mapWidth + '%'}">
      <l-map :key="keyMap1" ref="mapFirst" :zoom="zoom" :center="center" :minZoom="minZoom" :maxZoom="maxZoom" @update:bounds="setSecondMapBounds" @updateZoom="setSecondMapZoom" :maxBounds="maxBounds">

        <wms-layer :mapNum="1"></wms-layer>
        <wms-legend :mapNum="1"></wms-legend>

        <!-- // test identification -->
        <!-- <l-marker ref="markerTest" :visible="markerVisibility" :lat-lng="center" :options="markerOptions"></l-marker> -->

        <wms-extrem-events ></wms-extrem-events>

        <l-tile-layer :url="osmURL"></l-tile-layer>

        <station-layer></station-layer>

        <slider-extrem-events></slider-extrem-events>

      </l-map>
      </div>
      <div id="map2" :style="{width:mapWidth + '%'}" v-if="secondMap" >
        <l-map ref="mapSecond" :zoom="zoom" :center="center" :minZoom="minZoom" :maxZoom="maxZoom" :max-bounds="maxBounds" >

          <!-- If after wms layer it is not display -->
          <l-tile-layer :url="osmURL"></l-tile-layer>

          <wms-layer :mapNum="2"></wms-layer>
          <wms-legend :mapNum="2"></wms-legend>

        </l-map>
      </div>
</div>
</template>

<script>
import L from 'leaflet'
import { LMap, LTileLayer } from 'vue2-leaflet'

export default {
  name: 'my-map',
  data () {
    return {
      map1: null,
      map2: null,
      zoom: 4,
      minZoom: 4,
      center: [60, 55],
      bounds: L.latLngBounds([[50, 40], [60, 50]]),
      maxBounds: L.latLngBounds([
        [25, 30],
        [80, 90]
      ]),
      osmURL: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      formatWMS: 'image/png',
      keyMap1: 1,
      circleKey: 1
    }
  },
  methods: {
    setSecondMapBounds () {
      if (this.secondMap) {
        // this.map1.invalidateSize()
        this.map2.fitBounds(this.map1.getBounds())
      }
    },
    setSecondMapZoom () {
      if (this.secondMap) {
        // this.map1.invalidateSize()
        this.map2.setZoom(this.map1.getZoom())
      }
    },
    identify (e, marker) {
      const targetMap = this.map1
      const condition = this.CQLFilter1
      const mapSize = targetMap.getSize()
      const params = {
        request: 'GetFeatureInfo',
        service: 'WMS',
        srs: 'EPSG:4326',
        version: '1.1.0',
        format: 'application/json',
        bbox: targetMap.getBounds().toBBoxString(),
        height: mapSize.y,
        width: mapSize.x,
        layers: 'ucc:all_rasters_new',
        query_layers: 'ucc:all_rasters_new',
        CQL_FILTER: condition,
        info_format: 'application/json',
        styles: 'ucc:Day_with_snow'
      }

      const point = targetMap.latLngToContainerPoint(e.latlng, targetMap.getZoom())
      params[params.version === '1.3.0' ? 'i' : 'x'] = point.x
      params[params.version === '1.3.0' ? 'j' : 'y'] = point.y

      const url = 'http://localhost:8090/geoserver/wms?' +
          L.Util.getParamString(params, 'http://localhost:8090/geoserver/wms?', true)

      // console.log(url)
      fetch(url)
        .then(response => { return response.json() })
        .then(data => {
          let text = data.features[0].properties.GRAY_INDEX
          if (parseFloat(text) > 50000 || parseFloat(text) < -50000) {
            text = 0.0
          }
          marker.setTooltipContent('<div>' + parseFloat(text).toFixed(1) + '</div>')
          marker.setLatLng(e.latlng)
        })
    },
    clearMap (targetMarker) {
      this.map1.removeLayer(targetMarker)
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
    },
    maxZoom () {
      return this.$store.getters.GET_MAP_ZOOM
    }
    // TODO: make refactoring for reference on one function with
    // parameters
  },
  mounted () {
    this.$nextTick(() => {
      this.map1 = this.$refs.mapFirst.mapObject
      // this.marker = this.$refs.markerTest.mapObject
    })
  },
  components: {
    LMap,
    LTileLayer,
    // LMarker,
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
    secondMap: function () {
      if (this.secondMap) {
        this.$nextTick(() => {
          this.map2 = this.$refs.mapSecond.mapObject
        // this.map2.invalidateSize()
        })
      }
      // this.map1.invalidateSize()
    },
    infoStatus: function (newVal, oldVal) {
      // experimental function for identification
      const targetMarker = new L.Circle([0, 0], { radius: 0, opacity: 0.0 })
      this.map1.addLayer(targetMarker)
      targetMarker.bindTooltip('', {
        permanent: true,
        className: 'my-label',
        // offset: [20.5, 25],
        direction: 'left'
      })
      if (newVal) {
        this.circleKey = this.circleKey + 1
        this.map1.on('click', e => {
          this.identify(e, targetMarker)
        })
      } else {
        this.map1.off('click')
      }
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
