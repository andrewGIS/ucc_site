<!-- src/components/lister.vue -->
<template >
  <div>
    <select name="select_subindicator" v-model="selected_indicator">
      <option
        @click="change_indicator"
        v-for="indicator in aviable_indicator_list()"
        :value="indicator.name"
        :key="indicator.name"
      >{{indicator.alias}}</option>
    </select>
    <select name="select_period" v-model="selected_period">
      <option
        @click="update_map()"
        v-for="year in aviable_periods"
        :value="year"
        :key="year"
      >{{year.replace("_","-")}}</option>
    </select>
    <select name="select_month" v-model="selected_month">
      <option
        @click="update_map()"
        v-for="month in aviable_months"
        :value="month.key"
        :key="month.key"
      >{{month.alias}}</option>
    </select>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { loaded_data } from "../indicators_meta_v2";
import * as _ from "lodash";

interface month {
  key: string;
  alias: string;
}

export default Vue.extend({
  props: ["index_group", "layer_wms"],
  data() {
    return {
      loaded_rasters: loaded_data,
      selected_indicator: "Mean_pressure",
      selected_period: "1981_2010",
      selected_month: "jan",
      selected_postfix: "focal.tif",
      selected_style: "ucc:pressure_style",
      aviable_months: [{ key: "jan", alias: "Январь" }],
      aviable_periods: ["1981_2010"]
    };
  },
  methods: {
    change_indicator(event: any) {
      this.selected_indicator = event.explicitOriginalTarget._value;
      //console.log("change_indicator => " + this.selected_indicator);
      this.update_postfix();
      this.update_style();
      this.update_month();
      this.update_period();
      this.update_map();
    },
    update_map(this: any) {
      //console.log(`ucc:${this.selected_indicator}_${this.current_year}_${this.selected_month}_${this.selected_postfix}`)
      //console.log(this.selected_month)
      //console.log(this.selected_month)
      if (this.selected_month == "None") {
        console.log(
          `ucc:${this.selected_indicator}_${this.selected_period}_${
            this.selected_postfix
          }`
        );
        this.layer_wms.setParams(
          {
            layers: `ucc:${this.selected_indicator}_${this.selected_period}_${
              this.selected_postfix
            }`,
            styles: this.selected_style
          },
          false
        );
      } else {
        console.log(
          `ucc:${this.selected_indicator}_${this.selected_period}_${
            this.selected_month
          }_${this.selected_postfix}`
        );
        this.layer_wms.setParams(
          {
            layers: `ucc:${this.selected_indicator}_${this.selected_period}_${
              this.selected_month
            }_${this.selected_postfix}`,
            styles: this.selected_style
          },
          false
        );
      }
    },
    update_postfix() {
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
    update_style() {
      this.selected_style = _.filter(
        this.loaded_rasters.groups[this.index_group].indicators,
        obj => {
          return obj.name === this.selected_indicator;
        }
      )[0].style;
      //console.log("change_style => " + this.selected_style);
    },
    update_period() {
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
    update_month() {
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
    aviable_indicator_list() {
      return _.filter(
        this.loaded_rasters.groups[this.index_group].indicators,
        function(obj) {
          return obj.name;
        }
      );
    }
  },
  created: function() {
    this.selected_indicator = _.map(
      this.loaded_rasters.groups[this.index_group].indicators,
      function(obj) {
        return obj.name;
      }
    )[0];
    this.update_postfix();
    this.update_style();
    this.update_month();
    this.update_period();
  }
});
</script>

<style lang="scss" scoped>
div {
    background: black;
    box-shadow: 0 1.5px 3px rgba(0, 0, 0, 0.25);
}
</style>



