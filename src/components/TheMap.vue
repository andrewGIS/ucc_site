<template>
<div class="map-wrapper">
          <div id="map1" :style="{width:mapWidth + '%'}">
            <l-map ref="mapFirst" :zoom="zoom" :center="center" :minZoom="minZoom" :maxZoom="maxZoom" @update:bounds="setSecondMapBounds" @updateZoom="setSecondMapZoom" :maxBounds="maxBounds">

              <l-layer-group ref="popup1">
                  <l-popup  :options="popupOptions" >{{infoValue1}}</l-popup>
              </l-layer-group>

              <l-tile-layer :url="osmURL"></l-tile-layer>

              <wms-layer :mapNum="1"></wms-layer>
              <wms-legend  :mapNum="1"></wms-legend>

              <wms-extrem-events ></wms-extrem-events>

              <station-layer></station-layer>

              <slider-extrem-events></slider-extrem-events>

            </l-map>
        </div>
          <div id="map2" :style="{width:mapWidth + '%'}" v-if="secondMap">
          <l-map ref="mapSecond" :zoom="zoom" :center="center" :minZoom="minZoom" :maxZoom="maxZoom" :max-bounds="maxBounds" :options="option2">

            <!-- If after wms layer it is not display -->
            <l-tile-layer :url="osmURL"></l-tile-layer>

            <l-layer-group ref="popup2">
              <l-popup :options="popupOptions" >{{infoValue2}}</l-popup>
            </l-layer-group>

            <wms-layer :mapNum="2"></wms-layer>
            <wms-legend :mapNum="2"></wms-legend>

          </l-map>
        </div>
</div>
</template>

<script>
import L from 'leaflet'
import { LMap, LTileLayer, LLayerGroup, LPopup } from 'vue2-leaflet'

export default {
  name: 'my-map',
  data () {
    return {
      map1: null,
      map2: null,
      option1: { name: '1' },
      option2: { name: '2' },
      zoom: 4,
      minZoom: 4,
      center: [60, 55],
      bounds: L.latLngBounds([[50, 40], [60, 50]]),
      maxBounds: L.latLngBounds([
        [50, 30],
        [70, 90]
      ]),
      osmURL: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      formatWMS: 'image/png',
      infoValue1: null,
      infoValue2: null,
      popupOptions: {
        className: 'custom-popup',
        closeButton: false
      },
      mapComponentKey: 10000
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
    makeIdentify (e, mapNum) {
      let targetMap
      let condition
      if (mapNum === 1) {
        targetMap = this.map1
        condition = this.condition1
      }
      if (mapNum === 2) {
        targetMap = this.map2
        condition = this.condition2
      }
      // console.log(targetMap.getBounds())
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
        layers: this.mainLayerName,
        query_layers: this.mainLayerName,
        CQL_FILTER: condition,
        info_format: 'application/json',
        styles: ''
      }

      const point = targetMap.latLngToContainerPoint(e.latlng, targetMap.getZoom())
      params[params.version === '1.3.0' ? 'i' : 'x'] = point.x
      params[params.version === '1.3.0' ? 'j' : 'y'] = point.y
      // console.log(e.containerPoint)
      // console.log(e.layerPoint)
      // params[params.version === '1.3.0' ? 'i' : 'x'] = e.containerPoint.x
      // params[params.version === '1.3.0' ? 'j' : 'y'] = e.containerPoint.y

      const url = `${this.host}/geoserver/wms?` +
          L.Util.getParamString(params, `${this.host}geoserver/wms?`, true)

      // const ctx = this.mapObject
      // console.log(url)
      fetch(url)
        .then(response => { return response.json() })
        .then(data => {
          let text = data.features[0].properties.GRAY_INDEX
          if (parseFloat(text) > 50000 || parseFloat(text) < -50000) {
            text = 0.0
          }
          // marker.setTooltipContent('<div>' + parseFloat(text).toFixed(1) + '</div>')
          // marker.setLatLng(e.latlng)
          if (mapNum === 1) {
            this.infoValue1 = parseFloat(text).toFixed(1)
            this.$refs.popup1.mapObject.openPopup([e.latlng.lat, e.latlng.lng])
          }
          if (mapNum === 2) {
            this.infoValue2 = parseFloat(text).toFixed(1)
            this.$refs.popup2.mapObject.openPopup([e.latlng.lat, e.latlng.lng])
          }
          // this.$refs.popup.openOn(this.mapObject)
        })
    }
  },
  created () {
    this.$store.dispatch('LOAD_STATIONS')
  },
  computed: {
    host () {
      return this.$store.state.host
    },
    infoStatus () {
      return this.$store.getters.GET_INFO_STATUS
    },
    secondMap () {
      return this.$store.getters.GET_SECOND_MAP_VISIBILLITY
    },
    mapWidth () {
      return this.secondMap ? 50 : 100
    },
    maxZoom () {
      return this.$store.getters.GET_MAP_ZOOM
    },
    condition1 () {
      return this.$store.getters.GET_MAP_FILTER(1)
    },
    condition2 () {
      return this.$store.getters.GET_MAP_FILTER(2)
    },
    mainLayerName () {
      return `${this.$store.state.gsWorkspaceName}:${this.$store.state.gsMosaicLayerName}`
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.map1 = this.$refs.mapFirst.mapObject
      // this.map2 = this.$refs.mapSecond.mapObject
      // this.marker = this.$refs.markerTest.mapObject
    })
  },
  components: {
    LMap,
    LTileLayer,
    LLayerGroup,
    LPopup,
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
    secondMap: function (newVal, oldVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.map2 = this.$refs.mapSecond.mapObject
          this.map2.dragging.disable()
          this.map2.touchZoom.disable()
          this.map2.doubleClickZoom.disable()
          this.map2.scrollWheelZoom.disable()
          this.map2.boxZoom.disable()
          this.map2.keyboard.disable()
          if (this.map2.tap) {
            this.map2.tap.disable()
          }
          document.getElementById('map2').style.cursor = 'default'

          this.map2.invalidateSize()
          this.map1.invalidateSize()
          if (this.infoStatus) {
            this.map2.on('click', e => {
              this.makeIdentify(e, 2)
            })
          }
        })
      }
      // this.map2.remove()
      this.map1.invalidateSize()
      // this.$forceUpdate()
      this.mapComponentKey += 1
      // this.$refs.mapFirst.mapObject.invalidateSize()
      // if (this.secondMap) {
      //   this.map2.invalidateSize()
      // }
    },
    infoStatus: function (newVal, oldVal) {
      // experimental function for identification
      if (newVal) {
        this.map1.on('click', e => {
          this.makeIdentify(e, 1)
        })
        if (this.secondMap) {
          this.map2.on('click', e => {
            this.makeIdentify(e, 2)
          })
        }
      } else {
        this.map1.off('click')
        if (this.secondMap) {
          this.map2.off('click')
          this.$refs.popup2.mapObject.closePopup()
        }
        this.$refs.popup1.mapObject.closePopup()
      }
    }
    // this.map1.invalidateSize()
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

/* leaflet popup*/
  .custom-popup .leaflet-popup-content-wrapper {
    background:#2c3e50;
    border-radius: 0.25rem;
    color:#fff;
    font-size:12px;
    line-height:24px;
    }
  .custom-popup .leaflet-popup-content-wrapper a {
    margin: 0;
    display: flex;
    justify-content: center;
    align-content: center;
    color:rgba(255,255,255,0.5);
    }
  .leaflet-popup-tip {
    background:#2c3e50;
    /* width: 8px;
    height: 8px;
    margin-top: 4px; */
    }
  .leaflet-popup-content {
    margin: 1px;
    display: flex;
    justify-content: center;
  }
</style>
