<template>
<div class="map-wrapper">
      <div id="map1" :style="{width:mapWidth + '%'}">
      <l-map :zoom="zoom" :center="center">

        <wms-legend :mapNum="1"></wms-legend>

        <l-tile-layer :url="osmURL"></l-tile-layer>
        <l-wms-tile-layer ref="wms1" :visible="WMSVisible" :base-url="baseUrl" :format="formatWMS" :layers="layers" :opacity="0.5" :options="WMSOptionsMap1">
        </l-wms-tile-layer>
        <!-- <my-layer></my-layer> -->
        <l-geo-json :geojson="geoJSONData" :visible="geoJSONVisibility" :options="optionsGeoJSON">
          <l-icon></l-icon>
        </l-geo-json>
      </l-map>
      </div>
      <div id="map2" :style="{width:mapWidth + '%'}" v-if="secondMap">
        <l-map :zoom="zoom" :center="center">
           <wms-legend :mapNum="2"></wms-legend>
          <l-tile-layer :url="osmURL"></l-tile-layer>
          <l-wms-tile-layer ref="wms2" :visible="WMSVisible" :base-url="baseUrl" :format="formatWMS" :layers="layers" :opacity="0.5" :options="WMSOptionsMap2"
          ></l-wms-tile-layer>
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
import { isEmpty } from 'lodash'
// import { WMSLegend } from './MapRasterLegend'
// import MyLayer from './StationGeoJSON.vue'

// Vue.component('l-map', LMap)
// Vue.component('l-tile-layer', LTileLayer)

export default {
  name: 'my-map',
  data () {
    return {
      wms1: '',
      wms2: '',
      geoJSON: '',
      filteredGeoJSON: '',
      zoom: 5,
      minZoom: 4,
      maxZoom: 6,
      center: [59, 59],
      osmURL: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
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
    optionsGeoJSON () {
      return {
        onEachFeature: this.onEachFeature,
        pointToLayer: this.pointToLayer
      }
    },
    onEachFeature () {
      return (feature, layer) => {
        const tooltipContent = (accumulator, currentValue) => accumulator +
        '<div>' +
        `${currentValue.alias} : ${feature.properties[currentValue.field]}` +
        '<div>'
        layer.bindTooltip(
          this.tooltipFields.reduce(tooltipContent, '')
        )
      }
    },
    tooltipFields () {
      if (this.isFilterGeoJSON) {
        // return ['name', 'wmo_id', 'count']
        return [
          {
            field: 'name',
            alias: 'Имя метеостанции'
          },
          {
            field: 'wmo_id',
            alias: 'Идентификатор'
          },
          {
            field: 'count',
            alias: 'Общее число опасных явлений'
          }
        ]
      } else {
        return [
          {
            field: 'name',
            alias: 'Имя метеостанции'
          }
        ]
      }
    },
    pointToLayer () {
      // console.log(isEmpty(this.countEvetns) ? 5 : 10)
      return (feature, latlng) => {
        // console.log(feature)
        return L.circleMarker(latlng, {
          radius: isEmpty(this.countEvetns) ? 5 : this.countEvetns[feature.properties.wmo_id],
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
    CQL_filter1 () {
      return this.$store.getters.GET_MAP_FILTER(1)
    },
    CQL_filter2 () {
      return this.$store.getters.GET_MAP_FILTER(2)
    },
    styleMap1 () {
      return this.$store.getters.GET_WMS_STYLE
    },
    WMSOptionsMap1 () {
      return {
        // TO DO : automatic change first style
        styles: 'ucc:Day_with_snow',
        CQL_Filter: this.$store.getters.GET_MAP_FILTER(1)
        // CQL_Filter: "(group='Climate_terms_3hours_data_focal') AND (indicator='Mean_pressure')  AND (period='1981_2010') AND (month='jan')"
        // format: 'image/png',
        // layers: 'ucc:dev_mosaic',
        // transparent: true
      }
    },
    WMSOptionsMap2 () {
      return {
        styles: 'ucc:Day_with_snow',
        CQL_Filter: this.$store.getters.GET_MAP_FILTER(2)
      }
    },
    countEvetns () {
      return this.$store.getters.GET_COUNTS_WMOS
    },
    isFilterGeoJSON () {
      return this.$store.getters.GET_IS_FILTER
    },
    layers () {
      return `${this.$store.state.gsWorkspaceName}:${this.$store.state.gsMosaicLayerName}`
    },
    baseUrl () {
      return `${this.$store.state.host}/geoserver/ucc/ows?`
    }
  },
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LIcon,
    'l-wms-tile-layer': LWMSTileLayer,
    'wms-legend': () => import('./MapRasterLegend.vue')
  },
  watch: {
    WMSVisible: function () {
      this.wms1.remove()
      // this.wms1.redraw()
    },
    // TO DO change watch on computer property
    CQL_filter1: function () {
      console.log('somethins change on map1')
      // console.log(`"${this.$store.getters.GET_MAP_FILTER(1)}"`)
      this.wms1.wmsParams.CQL_Filter = this.$store.getters.GET_MAP_FILTER(1)
      // this.wms1.options.CQL_Filter = this.$store.getters.GET_MAP_FILTER(1)
      this.wms1.redraw()
    },
    CQL_filter2: function () {
      console.log('somethins change on map2')
      // console.log(`"${this.$store.getters.GET_MAP_FILTER(1)}"`)
      this.wms2.wmsParams.CQL_Filter = this.$store.getters.GET_MAP_FILTER(2)
      // this.wms1.options.CQL_Filter = this.$store.getters.GET_MAP_FILTER(1)
      this.wms2.redraw()
    //   // this.wms1.visible = this.$store.getters.GET_WMS_VISIBILITY
    //   try {
    //     this.wms1.redraw()
    //   } catch (error) {
    //     console.log(error)
    },
    secondMap: function () {
      this.$nextTick(() => {
        this.wms2 = this.$refs.wms2.mapObject
      })// work as expected
    }
    // WMSOptionsMap2: function () {
    //   console.log(`"${this.$store.getters.GET_MAP_FILTER(1)}"`)
    //   this.wms1.wmsParams.CQL_FILTER = this.$store.getters.GET_MAP_FILTER(1)
    //   this.wms1.redraw()
    // }
  },
  mounted () {
    this.$nextTick(() => {
    //   console.log(this.$refs.wms1) // work as expected
    // this.map1 = this.$refs.map1.mapObject // work as expected
      this.$store.commit('SET_WMS_ANIM', this.$refs.wms1.mapObject)
      this.wms1 = this.$refs.wms1.mapObject // work as expected
      // this.wms2 = this.$refs.wms2.mapObject // work as expected

      // this.wms1.on('load', function () {
      //   console.log('loaded')
      // })
    // this.map2 = this.$refs.map2.mapObject // work as expected
    // this.wms2 = this.$refs.wms2.mapObject // work as expected
    })
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
