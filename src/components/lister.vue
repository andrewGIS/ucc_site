<!-- src/components/lister.vue -->
<template >
  <div>
    <div class="container">
      <select
        v-on:change="change_indicator"
        name="select_subindicator"
        v-model="selected_indicator"
      >
        <option
          v-for="indicator in load_aviable_indicator_list()"
          :value="indicator.name"
          :key="indicator.name"
        >{{indicator.alias}}</option>
      </select>
      <button @click="start_anim_periods()">Play year</button>
      <select v-on:change="update_layer()" name="select_period" v-model="selected_period">
        <option v-for="year in aviable_periods" :value="year" :key="year">{{year.replace("_","-")}}</option>
      </select>
      <button @click="start_anim_monts">Play month</button>
      <button @click="brake_animation">Brake animation</button>
      <select v-on:change="update_layer()" name="select_month" v-model="selected_month">
        <option v-for="month in aviable_months" :value="month.key" :key="month.key">{{month.alias}}</option>
      </select>
      <!-- <div class="all_dates">
        <li v-for="date in all_dates" :value="date" :key="date">{{date}}</li>
        <li></li>
      </div> -->
    </div>
  </div>
</template>


<script >
import Vue from "vue";
import { loaded_data } from "../indicators_meta_v2.js";
import * as _ from "lodash";
import  L from "leaflet";
import { setTimeout, clearTimeout } from "timers";

// interface month {
//   key: string;
//   alias: string;
// }

export default {
  name:"lister",
  props: {
    index_group: Number,
    layer_wms: {
      required: true
    }
  },
  data() {
    return {
      loaded_rasters: loaded_data,
      selected_indicator: " ",
      selected_period: " ",
      selected_month: "apr",
      selected_postfix: " ",
      selected_style: " ",
      aviable_months: [{ key: "jan", alias: "Январь" }],
      aviable_periods: [" "],
      brake_animation_flag: false,
      timer: ""
    };
  },
  methods: {
    brake_animation() {
      // clearTimeout(this.timer);
      //this.layer_wms.off();
      this.brake_animation_flag = true;
      clearTimeout(this.timer);
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
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
    change_indicator(event) {
      this.selected_indicator = event.target.value;
      //console.log("change_indicator => " + this.selected_indicator);
      this.update_postfix_for_group();
      this.update_style_for_indicator();
      this.load_aviable_months();
      this.load_aviable_periods();
      this.update_layer();
    },
    update_layer() {
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
        this.layer_wms.setParams({
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
        this.layer_wms.setParams({
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
    load_aviable_indicator_list() {
      return _.filter(
        this.loaded_rasters.groups[this.index_group].indicators,
        function(obj) {
          return obj.name;
        }
      );
    },
    start_anim_periods() {
      // var stop = function() {
      //   if (animationId !== null) {
      //     window.clearInterval(animationId);
      //     animationId = null;
      //   }
      // };
    },
    start_anim_monts() {
      var index =
        _.findIndex(this.aviable_months, {
          key: this.selected_month
        }) + 1;
      var inst = this;
      var duration = 2000;

      this.layer_wms.redraw();
      this.layer_wms.on("load", function() {
        //     //console.log(inst.selected_month);
        if (index < inst.aviable_months.length && !this.brake_animation_flag) {
          inst.timer = setTimeout(function() {
            if (!inst.brake_animation_flag) {
              inst.selected_month = inst.aviable_months[index].key;
              inst.update_layer();
              index += 1;
              console.log("loaded");
              inst.layer_wms.redraw();
            } else {
              inst.brake_animation_flag = false;
              //inst.brake_animation();
              return;
            }
          }, duration);
        }
      });
      //
      //index = 0;
      //this.layer_wms.off();
      // var stop = function() {
      //   if (animationId !== null) {
      //     window.clearInterval(animationId);
      //     animationId = null;
      //   }
      // };
      // var set_month = function() {
      //   if (index < inst.aviable_periods.length - 1) {
      //     inst.selected_month = inst.aviable_periods[index].key;
      //     inst.update_layer();
      //     index += 1;
      //   } else {
      //     stop();
      //   }
      // };

      // var play = function() {
      //   stop();
      //   animationId = window.setInterval(set_month, 2000);
      // };
      // play();

      // while(index!== this.aviable_months.length -1){
      //   console.log("loaded")

      //   var flag = true
      //   while (flag){
      //     index +=1
      //     this.selected_month = this.aviable_months[index+1]
      //     this.update_layer();
      //     console.log( this.layer_wms.isLoading());
      //     this.layer_wms.redraw();
      //     console.log("loading")
      //   }
      // }

      // for (const mon of inst.aviable_months) {
      //   this.selected_month = mon.key
      //   this.update_layer();
      //   window.setInterval(this.update_layer(),2000)
      // }
      //     //const element = array[index];
      //     this.layer_wms.on("load", function() {
      //       //console.log(inst.selected_month);
      //       //console.log("loaded");
      //       inst.update_layer();
      //       //index = index + 1;
      //       console.log(mon.key);
      //       //inst.update_layer();
      //     });
      //     this.selected_month = mon.key;
      //     this.layer_wms.redraw();
      //     //setTimeout("",2000)
      //   }

      //console.log(index);

      //this.selected_period = this.aviable_periods[index];
      //this.update_params();
      //}
    }
  },
  computed: {
    all_dates() {
      var full_date = [];
      for (const period of this.aviable_periods) {
        for (const month of this.aviable_months) {
          full_date.push(`${period.replace("_",'-')}  ${month.alias}`);
        }
      }
      return full_date;
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
    // console.log(
    //   `ucc:${this.selected_indicator}_${this.selected_period}_${
    //     this.selected_month
    //   }_${this.selected_postfix}`
    // );
  }
};
</script>

<style lang="scss" scoped>
.container {
  width:100%;
  display: flex;
  flex-direction: column;
  font-size: 84%;
  z-index: 3;
  white-space: nowrap;
}
.all_dates{
  width: 300 px;
  position: relative;
  border:2px solid black;
  display: flex;
  flex-direction: row;
  bottom:10%;
  justify-content: space-between;
  li{
    padding:10px;
    margin:10px;
    border: 2px solid red;
  }
}
</style>



