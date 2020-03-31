<template>
  <l-control position="bottomright" v-if="visible">
    <b-container class="main_container">
        <b-row>
            <div class='legend-title'>Легенда
            </div>
        </b-row>
        <b-row>
            <div class='units'>Единицы:
            </div>
        </b-row>
        <b-row>
            <div class='units'> {{this.units}}
            </div>
        </b-row>
        <b-row>
            <b-col style="padding:0">
              <div class="color" :style="{'background-image':'linear-gradient(to bottom, '+ colorString +')'}"></div>
            </b-col>
            <b-col style="padding:0">
                <div class="labels">
                  <template v-for="colorMap in sortedColorMaps">
                      <p :key="colorMap.quantity"> {{parseFloat(colorMap.quantity).toFixed(1)}} </p>
                  </template>
                </div>
            </b-col>
        </b-row>
    </b-container>
  </l-control>
</template>

<script>
import { LControl } from 'vue2-leaflet'
export default {
  props: {
    mapNum: {
      type: Number,
      required: false
    }
  },
  name: 'WMSlegend',
  computed: {
    legendData () {
      return this.$store.getters.GET_LEGENDJSON(this.mapNum)
    },
    colorMaps () {
      if (!this.$_.isEmpty(this.legendData)) {
        return this.legendData.Legend[0].rules[0].symbolizers[0].Raster.colormap.entries
      } else {
        return {}
      }
    },
    sortedColorMaps () {
      if (!this.$_.isEmpty(this.legendData)) {
        const initArray = this.colorMaps
        return initArray.sort((a, b) => {
          return -(parseFloat(a.quantity) - parseFloat(b.quantity))
        })
      } else {
        return {}
      }
    },
    colorString () {
      if (!this.$_.isEmpty(this.legendData)) {
        return this.$_.map(this.sortedColorMaps, 'color').join(',')
      } else {
        return ''
      }
    },
    units () {
      if (!this.$_.isEmpty(this.legendData)) {
        return `${this.legendData.Legend[0].rules[0].title}`
      } else {
        return 'Нет данных'
      }
    },
    visible () {
      return this.$store.getters.GET_LEGEND_VISIBILLITY
    }
  },
  components: {
    LControl
  }
}
</script>

<style>
  .color {
    width: 15px;
    height: 100%;
  }
  .labels p {
    margin: 0;
    padding:0;
  }
  .main_container {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    background:white;
    border-radius:0.25rem;
  }
  .legend-title {
    font-weight: bold;
  }
</style>
