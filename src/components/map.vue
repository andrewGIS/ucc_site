<template>
  <div>
    <div id="indicators-app" class="indicators rounded">
      <div class="group-header" @click="show_lister($event,0,'temperature')">
        <span class="temperature">
          Климатические
          показатели 3-ч часовые
        </span>
      </div>
      <Lister
        v-show="active_group==='temperature'"
        v-on:layer_update="update_layer_root"
        v-on:update_desc="update_description_root"
        v-on:update_legend="update_legend_string_root"
        :name_group="'Climate_terms_3_hours_data_focal'"
        :layer_wms="main_layer"
        :update_animation_status="updated_animation_root"
      />

      <div class="group-header" @click="show_lister($event,1,'some_days')">
        <span class="some_days" >Данные AISORI</span>
      </div>
      <Lister
        v-show="active_group==='some_days'"
        v-on:layer_update="update_layer_root"
        v-on:update_desc="update_description_root"
        v-on:update_legend="update_legend_string_root"
        :name_group="'Days_data_AISORI_focal'"
        :layer_wms="main_layer"
        :update_animation_status="updated_animation_root"
      />

      <!-- <div>Текущий показатель {{main_layer.wmsParams.layers}}</div> -->
      <!-- <div id = "legend">Легенда URL {{legend_string}}</div> -->
      <div>
        Легенда
        <img :src="legend_string" />
      </div>
      <div class="map_component_buttons">
        <button
          :disabled="is_animation_root"
          @click="run_aimation_root"
          class="btn btn-light play_anim"
        ></button>
        <button
          :disabled="!is_animation_root"
          @click="stop_animation_root"
          class="btn btn-light stop_anim"
        ></button>
        <button @click="toggle_description_visibility" class="btn btn-light show_desc"></button>

      </div>
      <div v-if="desc_shown" class="description card rounded">
        <p class="desc_text">{{this.$children[active_group_index].description}}</p>
      </div>
    </div>
  </div>
</template>
<script>
//import "../../node_modules/leaflet/dist/leaflet.css";
import Lister from "./Lister.vue";
import L from "leaflet";

export default {
  name: "MapComponent",
  props: {
    map_id: {
      type: String, // html element id container for map
      required: true
    }
  },
  data() {
    return {
      init_map: null,
      main_layer: new L.tileLayer.wms(
        "http://localhost:8080/geoserver/ucc/ows?",
        {
          layers: "ucc:Mean_pressure_1971_2000_jul_focal.tif",
          format: "image/png",
          transparent: true,
          opacity: 0.5
        },
        true
      ),
      active_group: "temperature",
      legend_string:
        "http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=20&LAYER=ucc:Mean_pressure_1971_2000_jul_focal.tif&style=raster_sld&legend_options=layout:horizontal",
      desc_shown: false,
      description_text: "init text",
      layer_params: "",
      active_group_index: 0,
      is_animation_root: false
    };
  },
  methods: {
    load_map() {
      this.init_map = new L.Map(this.map_id, {
        minZoom: 4,
        maxZoom: 6
      });
      this.init_map.setView(new L.LatLng(59, 59), 4);

      var osm_layer = new L.TileLayer(
        "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      );

      //this.main_layer = layer_wms;
      osm_layer.addTo(this.init_map);
      this.main_layer.addTo(this.init_map);
    },
    show_lister(event, index, active_group_name) {
      //console.log(event.target.className);
      this.active_group = active_group_name;
      //this.main_layer.redraw();
      this.$children[index].update_layer();
      //this.$children[index].brake_animation();
      // for (let index = 0; index < this.$children.length; index++) {
      //    const element = this.$children[index];
      //    element.brake_animation();
      // }
      this.stop_animation_root();
      this.active_group_index = index;
    },
    update_map_size() {
      console.log("Map update");
      this.init_map.invalidateSize(true);
      this.main_layer.redraw();
    },
    toggle_description_visibility() {
      this.desc_shown = this.desc_shown == false ? true : false;
    },
    update_legend_string_root(new_legend_string) {
      //console.log(new_legend_string);
      this.legend_string = new_legend_string;
    },
    update_description_root(new_desc_string) {
      //console.log(new_legend_string);
      this.description_text = new_desc_string;
    },
    update_layer_root(obj) {
      console.log(obj);
      this.main_layer.setParams(obj);
    },
    run_aimation_root() {
      this.$children[this.active_group_index].start_anim_periods();
    },
    stop_animation_root() {
      this.$children[this.active_group_index].brake_animation();
    },
    updated_animation_root(value) {
      this.is_animation_root = value;
    }
  },
  mounted() {
    this.load_map();
  },
  destroyed() {
    this.init_map.remove();
    //this.init_map = null;
    this.main_layer = null;
  },
  components: {
    Lister
  }
};
</script>
<style lang="scss" scoped>
</style>

