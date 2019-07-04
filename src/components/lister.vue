<!-- src/components/lister.vue -->
<template >
  <div>
    <div class="container">
      <select  @change="update_layer()" name="select_indicator" v-model="selected_indicator" :disabled="is_animation">
        <option
          v-for="indicator in aviable_indicators"
          :value="indicator.name"
          :key="indicator.name"
        >{{indicator.alias}}</option>
      </select>

      <select @change="update_layer()" name="select_period" v-model="selected_period" :disabled="is_animation">
        <option v-for="year in aviable_periods" :value="year" :key="year">{{year.replace("_","-")}}</option>
      </select>

      <select  @change="update_layer()" name="select_month" v-model="selected_month" :disabled="is_animation">
        <option v-for="month in aviable_months" :value="month.key" :key="month.key">{{month.alias}}</option>
      </select>

      <button @click="start_anim_periods">Play year</button>
      <button @click="brake_animation">Brake animation</button>
      <!-- <button @click="update_layer()">Обновить слой</button> -->
    </div>
  </div>
</template>


<script >
import Vue from "vue";
import all_metadata from "../indicators_meta_v2.js";
import * as _ from "lodash";
import { setTimeout, clearTimeout } from "timers";

export default {
  name: "Lister",
  props: {
    name_group: {
      type: String, // name group to filtering data  (from indicators meta v2)
      required: true
    },
    layer_wms: {
      required: true // layer wms for animation
    }
  },
  data() {
    return {
      // filter and store data for defined group (in prop)
      meta_data_group: "",
      // store selected indicator name (Mean pressure for example)
      selected_indicator: "",
      // store selected period value (1951_1958 for example)
      selected_period: "",
      // store selected month value (Jan for example)
      // keys defined in this.aviable_month
      selected_month: "",
      // list of aviable indicator in group
      // stores as list of objects [{"name":"Mean_pressure","alias":"Среднее давление"}]
      aviable_indicators: [],
      // is animation in action
      is_animation: false,
      // variable for animation
      timer: ""
    };
  },
  methods: {
    start_anim_periods() {
      /**
       * Animate period for selected indicator
       * Time control in duration variable
       */
      var index = _.indexOf(this.aviable_periods, this.selected_period) + 1;

      var duration = 2000;

      this.is_animation = true;
      this.layer_wms.redraw();
      this.layer_wms.on("load", () => {
        if (index < this.aviable_periods.length && this.is_animation) {
          this.timer = setTimeout(() => {
            this.selected_period = this.aviable_periods[index];
            this.update_layer();
            index += 1;
            this.layer_wms.redraw();
          }, duration);
        } else {
          this.brake_animation();
          return;
        }
      });
    },
    brake_animation() {
      /**
       * Brake animation
       */
      this.is_animation = false;
      this.layer_wms.off();
      clearTimeout(this.timer);
    },
    update_layer() {
      /**
       * Temp function for update layer
       * Need to find where is shoul be placed
       * for dynamic update
       */
      this.$emit("layer_update", {
        layers: this.layer_url,
        styles: this.style
      });
      this.$emit("update_desc", this.description);
      this.$emit("update_legend", this.legend);
    }
  },
  computed: {
    postfix() {
      /**
       * Return postfix of selected element
       * It is end of file and in meta data it is setted
       */
      return _.find(this.meta_data_group.indicators, {
        name: this.selected_indicator
      }).postfix_in_file;
    },
    style() {
      /**
       * Return style name for selected element
       */
      return _.find(this.meta_data_group.indicators, {
        name: this.selected_indicator
      }).style;
    },
    description() {
      /**
       * Return description of selected element
       */
      return _.find(this.meta_data_group.indicators, {
        name: this.selected_indicator
      }).desc;
    },
    legend() {
      /**
       * Computed legend URL for selected layer
       */
      return (
        `http://localhost:8080/geoserver/wms` +
        `?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/` +
        `png&WIDTH=10&HEIGHT=10&LAYER=${this.layer_url}&style=` +
        `${this.style + "_legend"}&legend_options=layout:vetrical`
      );
    },
    layer_url() {
      /**
       * Computed URL of selected layer
       * ucc - store on Geoserver !!!MAY CHANGE!!
       */
      let url_string;
      if (this.selected_month == "None") {
        url_string =
          `ucc:${this.selected_indicator}` +
          `_${this.selected_period}` +
          `_${this.postfix}`;
      } else {
        url_string =
          `ucc:${this.selected_indicator}` +
          `_${this.selected_period}` +
          `_${this.selected_month}` +
          `_${this.postfix}`;
      }

      return url_string;
    },
    aviable_months() {
      /**
       * Return aviable months for selected indicator
       * from metadata
       * Reading from pre-filtered meta_data_group property
       * return list of objects [{month_key:month_alias}]
       * sample output [{month_key:month_alias}]
       */

      // extacting months list from group data
      let _months = _.find(this.meta_data_group.indicators, {
        name: this.selected_indicator
      }).months;

      // set first month as selected in droplist
      this.selected_month = _months[0];

      // trasnform list to object {month_key:month_alias}
      _months = _.map(_months, month => {
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
      // return object list for render in select month select tag
      return _months;
    },
    aviable_periods() {
      /**
       * Return aviable periods for selected indicator (1951-1960 for example)
       * from metadata
       * Reading from pre-filtered meta_data_group property
       * return list of objects [periods]
       */

      // extacting months list from group data
      let _periods = _.find(this.meta_data_group.indicators, {
        name: this.selected_indicator
      }).periods;

      // set first period as selected
      this.selected_period = _periods[0];

      // return list for render in select period select tag
      return _periods;
    }
  },
  created() {
    /**
     * Update meta data for group
     * Load aviable indicators list and
     * set first element
     */
    this.meta_data_group = _.find(all_metadata.groups, {
      name: this.name_group
    });
    let _indicators = _.map(this.meta_data_group.indicators, o =>
      _.pick(o, ["name", "alias"])
    );
    // save list in variable
    this.aviable_indicators = _indicators;
    // set first indicator as selected
    this.selected_indicator = _indicators[0].name;
  }
};

// add functions
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 84%;
  z-index: 3;
  white-space: nowrap;
  border: 2px solid black;
}
.all_dates {
  width: 300 px;
  position: relative;
  border: 2px solid black;
  display: flex;
  flex-direction: row;
  bottom: 10%;
  justify-content: space-between;
  li {
    padding: 10px;
    margin: 10px;
    border: 2px solid red;
  }
}
</style>



