<template>
  <l-control position="bottomright" v-if="visible">
    <b-container>
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
                  <template v-for="colorMap in colorMaps">
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
    colorString () {
      if (!this.$_.isEmpty(this.legendData)) {
        return this.$_.map(this.colorMaps, 'color').join(',')
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
</style>
