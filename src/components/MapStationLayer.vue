<template>
    <l-geo-json :geojson="geoJSONData" :visible="geoJSONVisibility" :options="optionsGeoJSON">
    </l-geo-json>
</template>

<script>
import L from 'leaflet'
import { LGeoJson } from 'vue2-leaflet'
export default {
  name: 'StationLayer',
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
    isFilterGeoJSON () {
      return this.$store.getters.GET_IS_FILTER
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
        if (this.clickGEOJSON) {
          layer.on({
            click: e => {
              this.$store.commit('ADD_WMO_NAME', e.target.feature.properties.name)
              console.log(e.target.feature)
              // e.layer.setStyle({
              //   weight: 5
              // })
            }
          })
        }
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
          radius: this.$_.isEmpty(this.countEvetns) ? 5 : this.countEvetns[feature.properties.wmo_id],
          fillColor: '#ff7800',
          color: '#000',
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        }
        )
      }
    },
    countEvetns () {
      return this.$store.getters.GET_COUNTS_WMOS
    },
    clickGEOJSON () {
      return this.$store.getters.GET_GEOJSON_CLIK
    }
  },
  components: { LGeoJson }
}
</script>

<style>

</style>
