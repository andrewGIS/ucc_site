<template>
  <div>
    <div :id="map_id"></div>
    <div id="indicators-app" class="indicators rounded">
      <div class="active_icon class=temperature">
        <span class="temperature" @click="show_lister($event,0)">
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
      />

      <div class="temperature">
        <span class="some_days" @click="show_lister($event,1)">Какие то дни</span>
      </div>
      <Lister
        v-show="active_group==='some_days'"
        v-on:layer_update="update_layer_root"
        v-on:update_desc="update_description_root"
        v-on:update_legend="update_legend_string_root"
        :name_group="'Days_data_AISORI_focal'"
        :layer_wms="main_layer"
      />

      <div>Текущий показатель {{main_layer.wmsParams.layers}}</div>
      <!-- <div id = "legend">Легенда URL {{legend_string}}</div> -->
      <div>
        <img :src="legend_string" />
      </div>
      <button @click="toggle_description_visibility">Информация о показателе</button>
      <div v-if="desc_shown" id="description">{{this.description_text}}</div>
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
      layer_params: ""
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
        "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { attribution: "attribution test" }
      );

      //this.main_layer = layer_wms;
      osm_layer.addTo(this.init_map);
      this.main_layer.addTo(this.init_map);
    },
    show_lister(event, index) {
      //console.log(event.target.className);
      this.active_group = event.target.className;
      //this.main_layer.redraw();
      this.$children[index].update_layer();
       for (let index = 0; index < this.$children.length; index++) {
         const element = this.$children[index];
         element.brake_animation();
       }
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
#map_1 {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
}
#map_2 {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
}
#map_3 {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
}
#legend {
  width: 200px;
  display: inline-block;
  border: 2px solid black;
  word-wrap: break-word;
}
</style>

