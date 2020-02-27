import Vuex from 'vuex'
import Vue from 'vue'
// import { LMap } from 'vue2-leaflet'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    host: 'http://localhost:8080',
    gsWorkspaceName: 'ucc',
    gsMosaicLayerName: 'dev_mosaic',
    initGeoJson: null,
    filteredGeoJSON: null,
    initSideBarWidth: '350px',
    geoJSONVisible: false,
    WMSVisible: true,
    aviableDamageTypes: [],
    aviableStations: [],
    secondMapVisibillity: false,
    mapParams:
    {
      1: {
        CQLfilter: '',
        style: ''
      },
      2: {
        CQLfilter: '',
        style: ''
      }
    }
  },
  getters: {
    GET_STATIONS: state => {
      // console.log(state.initGeoJson)
      return state.aviableStations
    },
    GET_GEOJSON: state => {
      if (state.selectedStation) {
        return state.initGeoJson.features.filter(feature => {
          return (feature.properties.wmo_id === state.selectedStation)
        })
      } else {
        return state.initGeoJson
      }
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
        return null
      }
    },
    GET_SECOND_MAP_VISIBILLITY: state => {
      return state.secondMapVisibillity
    },
    GET_MAP_FILTER: (state) => (num) => {
      return state.mapParams[num].CQLfilter
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
    SET_DAMAGE_TYPES (state, data) {
      state.aviableDamageTypes = data.features.map(feature => {
        return {
          value: `${feature.properties.event_type}`,
          text: feature.properties.event_type
        }
      })
    },
    SET_FILTERED_GEOJSON (state, data) {
      console.log(data)
      let rawArray = data.features.map(feature => {
        return feature.properties.wmoid
      })
      rawArray = rawArray.filter((v, i, a) => a.indexOf(v) === i)
      // console.log(rawArray.sort())
      // console.log(state.initGeoJson.features.map(feature =>
      //   rawArray.indexOf(feature.properties.wmo_id) > -1
      // ))
      state.filteredGeoJSON = state.initGeoJson.features.filter(feature =>
        rawArray.indexOf(feature.properties.wmo_id) > -1
      )
    },
    SET_SECOND_MAP_VISIBILITY (state, data) {
      state.secondMapVisibillity = data
    },
    SET_MAP_FILTER (state, payload) {
      console.log(payload)
      // console.log(state.mapURLS[payload.mapNum])
      state.mapParams[payload.mapNum].CQLfilter = payload.filterExpression
    }
  },
  actions: {
    LOAD_STATIONS: async ({ commit }) => {
      await fetch('http://localhost:8080/geoserver/ucc/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ucc:wmo_stations&outputFormat=application/json')
        .then(response => { return response.json() })
        .then(data => {
          commit('SET_GEOJSON', data)
          commit('SET_STATIONS_LIST', data)
        })
    },
    LOAD_DAMAGE_TYPES: async ({ commit }) => {
      await fetch('http://localhost:8080/geoserver/ucc/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ucc:damage_types&outputFormat=application/json')
        .then(response => { return response.json() })
        .then(data => {
          commit('SET_DAMAGE_TYPES', data)
        })
    },
    LOAD_WMOS_BY_CONDITION: async ({ commit }, condition) => {
      // TO DO get from component ready condition
      // const tuple = (...args) => Object.freeze(args)
      // payload = tuple(payload)
      // console.log(payload)
      // console.log(tuple(payload))
      // condition = condition.map(feature => `'${feature}'`)
      // const url = `http://localhost:8080/geoserver/ucc/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ucc:base&outputFormat=application/json&CQL_FILTER=event_type in (${condition.join(',')})`
      let url
      if (condition) {
        url = `http://localhost:8080/geoserver/ucc/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ucc:base&outputFormat=application/json&CQL_FILTER=${condition}`
        console.log(url)
        await fetch(url)
        // console.log(url)
        // await fetch("http://localhost:8080/geoserver/ucc/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ucc:base&outputFormat=application/json&CQL_FILTER=event_type='Шквал'")
          .then(response => { return response.json() })
          .then(data => {
            commit('SET_FILTERED_GEOJSON', data)
          })
      }
    }
    // Here we will create Larry
  }
})
