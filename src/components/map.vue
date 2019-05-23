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
      <lister v-show="active_group==='temperature'" :index_group="0" :layer_wms="main_layer"/>
      <div class="temperature">
        <span class="some_days" @click="show_lister($event,1)">Какие то дни</span>
      </div>
      <lister v-show="active_group==='some_days'" :index_group="1" :layer_wms="main_layer"/>
      <div>Текущий показатель {{main_layer.wmsParams.layers}}</div>
    </div>
  </div>
</template>
<script>
//import "../../node_modules/leaflet/dist/leaflet.css";
import lister from "./lister.vue";
import L from "leaflet";



export default {
  name: "map_component",
  props: ["map_id"],
  data() {
    return {
      init_map: null,
      main_layer:  new L.tileLayer.wms(
        "http://localhost:8080/geoserver/ucc/ows?",
        {
          layers: "ucc:Day_with_snow_1951_1980_with_h_focal.tif",
          format: "image/png",
          transparent: true,
          opacity: 0.5
        },
        true
      ),
      active_group: "temperature"
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
      //osm_layer.addTo(this.init_map);
      this.main_layer.addTo(this.init_map);
    },
    show_lister(event, index) {
      //console.log(event.target.className);
      this.active_group = event.target.className;
      this.$children[index].update_layer();
      for (let index = 0; index < this.$children.length; index++) {
        const element = this.$children[index];
        element.brake_animation();
      }
      //this.$children[index].brake_animation();
    },
    update_map_size() {
      console.log("Map update");
      this.init_map.invalidateSize(true);
      //this.init_map.redraw();
      this.main_layer.redraw();
    }
  },
  mounted() {
    this.load_map();
  },
  components: {
    lister
  }
};
</script>
<style lang="scss">
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
</style>

