<template>
<div class="map-wrapper">
      <div id="map1" :style="{width:mapWidth + '%'}">
      <l-map ref="map" :zoom="zoom" :center="center">

        <l-tile-layer :url="osmURL"></l-tile-layer>
        <l-wms-tile-layer ref="wms1"

              :base-url="baseUrl"
              :visible="true"
              format="image/png"
              layers="ucc:dev_mosaic"
              :transparent="true"
              :opacity=0.5
              :options="WMSOptionsMap1"
          />
        <!-- <my-layer></my-layer> -->
        <l-geo-json :geojson="geoJSONData" :visible="geoJSONVisibility" :options="options">
          <l-icon></l-icon>
        </l-geo-json>
      </l-map>
      </div>
      <div id="map2" :style="{width:mapWidth + '%'}" v-if="secondMap">
        <l-map :zoom="zoom" :center="center">
           <l-wms-tile-layer
              :base-url="baseUrl"
          />
          <l-tile-layer :url="osmURL"></l-tile-layer>
          <l-wms-tile-layer

              :base-url="baseUrl"
              :visible="true"
              format="image/png"
              layers="ucc:dev_mosaic"
              :transparent="true"
              :opacity=0.5
              :options="WMSOptionsMap2"
          />
          <!-- <my-layer></my-layer> -->
        </l-map>
      </div>
      <!-- <div>
        <div id="map"></div>
      </div> -->
</div>
</template>

<script>
// import '@leaflet/dist/leaflet.css'

// import Vue from 'vue'
// import L from 'leaflet'
import L from 'leaflet'
import { LMap, LTileLayer, LGeoJson, LIcon, LWMSTileLayer } from 'vue2-leaflet'
// import MyLayer from './StationGeoJSON.vue'

// Vue.component('l-map', LMap)
// Vue.component('l-tile-layer', LTileLayer)

export default {
  name: 'my-map',
  data () {
    return {
      initMap: '',
      geoJSON: '',
      filteredGeoJSON: '',
      zoom: 5,
      minZoom: 4,
      maxZoom: 6,
      center: [59, 59],
      osmURL: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      baseUrl: 'http://localhost:8080/geoserver/ucc/ows?',
      formatWMS: 'image/png'
    }
  },
  created () {
    this.$store.dispatch('LOAD_STATIONS')
    // this.filteredGeoJSON = this.$store.getters.GET_STATIONS_GEOJSON
    // eslint-disable-next-line no-unused-vars

    // const geoJSONData = this.$store.getters.GET_STATIONS_GEOJSON
    // console.log(this.geoJSONData)
    // eslint-disable-next-line new-cap
    // const myStyle = {
    //   color: '#ff7800',
    //   weight: 5,
    //   opacity: 0.65
    // }
    // eslint-disable-next-line new-cap
    // this.geoJSON = L.geoJSON(this.$store.getters.GET_STATIONS_GEOJSON)
    // this.geoJSON = L.geoJSON(this.geoJSONData)
    // this.geoJSON.addTo(initMap)
    // this.initMap = initMap
  },
  computed: {
    geoJSONData () {
      if (this.geoJSONVisibility) {
        return this.$store.getters.GET_FILTERED_GEOJSON
      } else {
        return []
      }
    },
    geoJSONVisibility () {
      return this.$store.getters.GEO_GEOJSON_VISIBILITY
    },
    options () {
      return {
        onEachFeature: this.onEachFeature,
        pointToLayer: this.pointToLayer
      }
    },
    onEachFeature () {
      return (feature, layer) => {
        layer.bindTooltip(
          '<div>code:' +
            feature.properties.name +
            '</div><div>nom: ' +
            feature.properties.wmo_id +
            '</div>'
        )
      }
    },
    pointToLayer () {
      return (feature, latlng) => {
        // console.log(feature)
        return L.circleMarker(latlng, {
          radius: feature.properties.wmo_id / 20000,
          fillColor: '#ff7800',
          color: '#000',
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        }
        )
      }
    },
    secondMap () {
      return this.$store.getters.GET_SECOND_MAP_VISIBILLITY
    },
    mapWidth () {
      return this.secondMap === true ? 50 : 100
    },
    WMSVisible () {
      return this.$store.getters.GET_WMS_VISIBILITY
    },
    // TODO: make refactoring for reference on one function with
    // parameters
    WMSOptionsMap1 () {
      console.log()
      return {
        // CQL_Filter: this.$store.getters.GET_MAP_FILTER(1)
        CQL_Filter: "(group='Climate_terms_3hours_data_focal') AND (indicator='Mean_pressure')  AND (period='1981_2010') AND (month='jan')"
        // format: 'image/png',
        // layers: 'ucc:dev_mosaic',
        // transparent: true
      }
    },
    WMSOptionsMap2 () {
      return {
        CQL_Filter: this.$store.getters.GET_MAP_FILTER(2)
        // format: 'image/png',
        // layers: 'ucc:dev_mosaic',
        // transparent: true
      }
    }
  },
  components: {
    LMap, LTileLayer, LGeoJson, LIcon, 'l-wms-tile-layer': LWMSTileLayer
  },
  methods: {
    addFilterType () {
      return ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      console.log(this.$refs.wms1) // work as expected
    })
  }
  // ,
  // async created () {
  //   await this.$store.dispatch('getStations')
  // }
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
</style>
