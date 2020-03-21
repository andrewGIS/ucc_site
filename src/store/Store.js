import Vuex from 'vuex'
import Vue from 'vue'
// import { LMap } from 'vue2-leaflet'
import _ from 'lodash'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    host: 'http://localhost:8090',
    gsWorkspaceName: 'ucc',
    gsMosaicLayerName: 'all_rasters_new',
    gsStationLayerName: 'wmo_stations',
    gsLayerJoined: 'joined_base',
    initGeoJson: null,
    filteredGeoJSON: null,
    initSideBarWidth: '350px',
    geoJSONVisible: false,
    WMSVisible: false,
    aviableDamageTypes: [],
    aviableStations: [],
    aviableRegions: [],
    secondMapVisibillity: false,
    countByWMO: {}, // object where stored count event by wmo {wmo_id: count events}
    mapParams:
    {
      1: {
        CQLfilter: '',
        style: '',
        legendJSON: {}
      },
      2: {
        CQLfilter: '',
        style: '',
        legendJSON: {}
      }
    },
    tableData: {}, // requested table data from geoserver
    selectedWMOs: [],
    selectedRegion: '',
    WMSLayerAnim: '',
    activeWMSStyle: '',
    legendJSON: {}
  },
  getters: {
    GET_STATIONS: state => {
      // console.log(state.initGeoJson)
      return state.aviableStations
    },
    GET_REGIONS: state => {
      // console.log(state.initGeoJson)
      return state.aviableRegions
    },
    GET_INIT_GEOJSON: state => {
      return state.initGeoJson
    },
    GEO_GEOJSON_VISIBILITY: state => {
      return state.geoJSONVisible
    },
    GET_WMS_VISIBILITY: state => {
      return state.WMSVisible
    },
    GET_DAMAGE_TYPES: state => {
      return state.aviableDamageTypes
    },
    GET_FILTERED_GEOJSON: state => {
      return state.filteredGeoJSON
    },
    GET_COUNT_SELECTED: state => {
      if (state.filteredGeoJSON) {
        return state.filteredGeoJSON.length
      } else {
        // return state.initGeoJson.length
        return null
      }
    },
    GET_SECOND_MAP_VISIBILLITY: state => {
      return state.secondMapVisibillity
    },
    GET_MAP_FILTER: (state) => (num) => {
      return state.mapParams[num].CQLfilter
    },
    GET_COUNTS_WMOS: (state) => {
      return state.countByWMO
    },
    GET_IS_FILTER: (state) => {
      if (state.initGeoJson === state.filteredGeoJSON) {
        return false
      } else {
        return true
      }
    },
    GET_FILTERED_TABLE_DATA: (state) => {
      return state.tableData
    },
    GET_WMS_LAYER: (state) => {
      return state.WMSLayerAnim
    },
    GET_WMS_STYLE: (state) => {
      return state.activeWMSStyle
    },
    GET_LEGENDJSON: (state) => (mapNum) => {
      return state.mapParams[mapNum].legendJSON
    },
    GET_MAP_STYLE: (state) => (num) => {
      return state.mapParams[num].style
    }
  },
  mutations: {
    SET_SELECTED_STATION_NAME (state, payload) {
      state.selectedStationName = payload
    },
    SET_SELECTED_STATION_NUMBER (state, payload) {
      state.selectedStation = payload
    },
    SET_GEOJSON_VISIBILITY (state, payload) {
      state.geoJSONVisible = payload
    },
    SET_WMS_VISIBILITY (state, payload) {
      state.WMSVisible = payload
    },
    SET_GEOJSON (state, payload) {
      state.initGeoJson = payload
      state.filteredGeoJSON = payload
    },
    SET_STATIONS_LIST (state, data) {
      state.aviableStations = data.features.map(feature => {
        return {
          name: feature.properties.name,
          wmo_id: feature.properties.wmo_id
        }
      })
      // state.stations = data.map(data.features)
    },
    SET_REGIONS_LIST (state, data) {
      const allRegions = data.features.map(feature =>
        feature.properties.region
      )
      state.aviableRegions = _.uniq(allRegions).sort()
      // state.stations = data.map(data.features)
    },
    SET_DAMAGE_TYPES (state, data) {
      state.aviableDamageTypes = data.features.map(feature => {
        return {
          value: `${feature.properties.event_type}`,
          text: feature.properties.event_type
        }
      })
    },
    SET_FILTERED_GEOJSON (state, data) {
      // TODO: con station by selected region here
      // TODO: delete conditions
      // calculate count events by sation
      const groupByObject = _.groupBy(data.features, (feature) => feature.properties.wmoid)

      state.countByWMO = _.mapValues(groupByObject, (value) => { return value.length })

      // filter station by wmo number from table data
      const uniqWMOIds = _.uniq(_.map(data.features, 'properties.wmoid'))
      state.filteredGeoJSON = _.filter(state.initGeoJson.features, feature =>
        _.indexOf(uniqWMOIds, feature.properties.wmo_id) > -1
      )

      // if (state.selectedRegion) {
      //   state.filteredGeoJSON = _.filter(state.filteredGeoJSON.features, feature =>
      //     feature.properties.region === state.selectedRegion
      //   )
      // }
      // state.filteredGeoJSON = uniqArray

      const filteredFeatures = state.filteredGeoJSON

      // insert count of event to selected stations
      filteredFeatures.map(feature => {
        feature.properties.count = state.countByWMO[feature.properties.wmo_id]
      })

      state.filteredGeoJSON = filteredFeatures
    },
    SET_FILTERED_TABLE_DATA (state, data) {
      state.tableData = data
    },
    SET_SECOND_MAP_VISIBILITY (state, data) {
      state.secondMapVisibillity = data
    },
    SET_MAP_FILTER (state, payload) {
      console.log(payload)
      // console.log(state.mapURLS[payload.mapNum])
      state.mapParams[payload.mapNum].CQLfilter = payload.filterExpression
    },
    CLEAR_GEO_JSON_FILTER (state) {
      state.countByWMO = {}
      state.filteredGeoJSON = state.initGeoJson
    },
    SET_WMS_ANIM (state, payload) {
      state.WMSLayerAnim = payload
    },
    SET_ACTIVE_STYLE (state, payload) {
      state.activeWMSStyle = payload
    },
    SET_LEGEND_JSON (state, payload) {
      state.mapParams[payload.mapNum].legendJSON = payload.data
    },
    SET_MAP_STYLE (state, payload) {
      state.mapParams[payload.mapNum].style = payload.style
    }
  },
  actions: {
    LOAD_STATIONS: async ({ state, commit }) => {
      await fetch(`${state.host}/geoserver/${state.gsWorkspaceName}/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${state.gsWorkspaceName}:${state.gsStationLayerName}&outputFormat=application/json`)
        .then(response => { return response.json() })
        .then(data => {
          commit('SET_GEOJSON', data)
          commit('SET_STATIONS_LIST', data)
          commit('SET_REGIONS_LIST', data)
        })
    },
    LOAD_DAMAGE_TYPES: async ({ state, commit }) => {
      await fetch(`${state.host}/geoserver/${state.gsWorkspaceName}/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${state.gsWorkspaceName}:damage_types&outputFormat=application/json`)
        .then(response => { return response.json() })
        .then(data => {
          commit('SET_DAMAGE_TYPES', data)
        })
    },
    LOAD_WMOS_BY_CONDITION: async ({ state, commit }, condition) => {
      // TO DO get from component ready condition
      // const tuple = (...args) => Object.freeze(args)
      // payload = tuple(payload)
      // console.log(payload)
      // console.log(tuple(payload))
      // condition = condition.map(feature => `'${feature}'`)
      // const url = `http://localhost:8080/geoserver/ucc/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ucc:base&outputFormat=application/json&CQL_FILTER=event_type in (${condition.join(',')})`
      let url
      if (condition) {
        url = `${state.host}/geoserver/ucc/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${state.gsWorkspaceName}:${state.gsLayerJoined}&outputFormat=application/json&CQL_FILTER=${condition}`
        console.log(url)
        await fetch(url)
        // console.log(url)
        // await fetch("http://localhost:8080/geoserver/ucc/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ucc:base&outputFormat=application/json&CQL_FILTER=event_type='Шквал'")
          .then(response => { return response.json() })
          .then(data => {
            commit('SET_FILTERED_TABLE_DATA', data)
            commit('SET_FILTERED_GEOJSON', data)
          })
      }
    },
    LOAD_LEGEND_JSON: async ({ state, commit }, params) => {
      const url = `${state.host}/geoserver/wms?service=WMS&version=1.1.0&request=GetLegendGraphic&style=${params.styleName}&format=application/json&layer=${state.gsMosaicLayerName}`
      console.log(url)
      if (params.styleName) {
        await fetch(url)
          .then(response => { return response.json() })
          .then(data => {
            commit('SET_LEGEND_JSON', {
              mapNum: params.mapNum,
              data: data
            })
          })
      } else {
        commit('SET_LEGEND_JSON', {
          mapNum: params.mapNum,
          data: {}
        })
      }
    }
    // Here we will create Larry
  }
})
