<!-- src/components/lister.vue -->
<template >
  <div>
    <div class="container">
      <select name="select_subindicator" v-model="selected_indicator">
        <option
          @click="change_indicator"
          v-for="indicator in load_aviable_indicator_list()"
          :value="indicator.name"
          :key="indicator.name"
        >{{indicator.alias}}</option>
      </select>
      <button @click="start_anim_periods()">Play</button>
      <select name="select_period" v-model="selected_period">
        <option
          @click="update_params()"
          v-for="year in aviable_periods"
          :value="year"
          :key="year"
        >{{year.replace("_","-")}}</option>
      </select>
      <button @click="start_anim_monts()">Play</button>
      <select name="select_month" v-model="selected_month">
        <option
          @click="update_params()"
          v-for="month in aviable_months"
          :value="month.key"
          :key="month.key"
        >{{month.alias}}</option>
      </select>
    </div>
  </div>
</template>

<script >
import Vue from "vue";
import { loaded_data } from "../indicators_meta_v2";
import * as _ from "lodash";
import * as L from "leaflet";

// interface month {
//   key: string;
//   alias: string;
// }

export default Vue.extend({
  props: {
    index_group: Number,
    layer_wms: L.TileLayer.WMS,
    update_map: Function
  },
  data() {
    return {
      loaded_rasters: loaded_data,
      selected_indicator: "",
      selected_period: "",
      selected_month: "",
      selected_postfix: "",
      selected_style: "",
      aviable_months: [{ key: "jan", alias: "Январь" }],
      aviable_periods: [""]
    };
  },
  methods: {
    change_indicator() {
      this.selected_indicator = event.explicitOriginalTarget._value;
      //console.log("change_indicator => " + this.selected_indicator);
      this.update_postfix_for_group();
      this.update_style_for_indicator();
      this.load_aviable_months();
      this.load_aviable_periods();
      this.update_params();
    },
    update_params() {
      //console.log(`ucc:${this.selected_indicator}_${this.current_year}_${this.selected_month}_${this.selected_postfix}`)
      //console.log(this.selected_month)
      //console.log(this.selected_month)
      if (this.selected_month == "None") {
        // console.log(
        //   `ucc:${this.selected_indicator}_${this.selected_period}_${
        //     this.selected_postfix
        //   }`
        // );
        // this.layer_wms.setParams(
        //   {
        //     layers: `ucc:${this.selected_indicator}_${this.selected_period}_${
        //       this.selected_postfix
        //     }`,
        //     styles: this.selected_style
        //   },
        //   false
        // );
        this.update_map({
          layers: `ucc:${this.selected_indicator}_${this.selected_period}_${
            this.selected_postfix
          }`,
          styles: this.selected_style
        });
      } else {
        // console.log(
        //   `ucc:${this.selected_indicator}_${this.selected_period}_${
        //     this.selected_month
        //   }_${this.selected_postfix}`
        // );
        this.update_map({
          layers: `ucc:${this.selected_indicator}_${this.selected_period}_${
            this.selected_month
          }_${this.selected_postfix}`,
          styles: this.selected_style
        });
      }
    },
    update_postfix_for_group() {
      /**
       * Update postfix for adding to file
       * Sample postfix is with_h_focal in Day_with_snow_1951_1980_with_h_focal.tif
       * It may change in different group
       */
      this.selected_postfix = _.filter(
        this.loaded_rasters.groups[this.index_group].indicators,
        obj => {
          return obj.name === this.selected_indicator;
        }
      )[0].postfix_in_file;

      //console.log("change_postfix => " + this.selected_postfix);
    },
    update_style_for_indicator() {
      this.selected_style = _.filter(
        this.loaded_rasters.groups[this.index_group].indicators,
        obj => {
          return obj.name === this.selected_indicator;
        }
      )[0].style;
      //console.log("change_style => " + this.selected_style);
    },
    load_aviable_periods() {
      let aviable_periods = _.filter(
        this.loaded_rasters.groups[this.index_group].indicators,
        obj => {
          return obj.name === this.selected_indicator;
        }
      )[0];

      // get first aviable period and set its as default in dropdown list
      this.selected_period = aviable_periods.periods[0];
      this.aviable_periods = aviable_periods.periods;
      return aviable_periods.periods;
    },
    load_aviable_months() {
      let aviable_months = _.filter(
        this.loaded_rasters.groups[this.index_group].indicators,
        obj => {
          return obj.name === this.selected_indicator;
        }
      )[0];

      this.selected_month = aviable_months.months[0];
      this.aviable_months = _.map(aviable_months.months, month => {
        switch (month) {
          case "year":
            return { key: "year", alias: "Год" };
          case "jan":
            return { key: "jan", alias: "Январь" };
          case "jul":
            return { key: "jul", alias: "Июль" };
          case "oct":
            return { key: "oct", alias: "Октябрь" };
          case "apr":
            return { key: "apr", alias: "Апрель" };
          default:
            return { key: "None", alias: "Нет данных" };
        }
      });
      return aviable_months.months;
    },
    load_aviable_indicator_list() {
      return _.filter(
        this.loaded_rasters.groups[this.index_group].indicators,
        function(obj) {
          return obj.name;
        }
      );
    },
    start_anim_periods() {
      for (let index = 0; index < this.aviable_periods.length; index++) {
        this.selected_period = this.aviable_periods[index];
        this.update_params();
      }
    },
    start_anim_monts() {
      var index = 0;
      while(index !== this.aviable_months.length-1) {
        console.log(index)
        this.layer_wms.once("load",function(){
          console.log("loaded")
          index = index+1
          console.log(index)
          //this.selected_month = this.aviable_months[index].key;
          //this.update_params();
         })
      }
    }
  },
  mounted: function() {
    this.selected_indicator = _.map(
      this.loaded_rasters.groups[this.index_group].indicators,
      function(obj) {
        return obj.name;
      }
    )[0];
    this.update_postfix_for_group();
    this.update_style_for_indicator();
    this.load_aviable_periods();
    this.load_aviable_months();
    console.log(
      `ucc:${this.selected_indicator}_${this.selected_period}_${
        this.selected_month
      }_${this.selected_postfix}`
    );
  }
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  font-size: 84%;
  z-index: 3;
  white-space: nowrap;
}
</style>



