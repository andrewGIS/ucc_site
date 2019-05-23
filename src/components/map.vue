<template>
  <div>
    <div id="map"></div>
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
import lister from "lister.vue";

export default {
  data() {
    return {
      init_map: first_layer,
      main_layer: layer_wms,
      active_group: "temperature"
    };
  },
  methods: {
    load_map() {

      this.init_map = new L.Map("map", {
        minZoom: 4,
        maxZoom: 6
      });
      this.init_map.setView(new L.LatLng(59, 59), 4);

    var osm_layer = new L.TileLayer(
        "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { attribution: "attribution test" }
      );

    var layer_wms = L.tileLayer.wms(
        "http://localhost:8080/geoserver/ucc/ows?",
        {
            layers: "ucc:Day_with_snow_1951_1980_with_h_focal.tif",
            format: "image/png",
            transparent: true,
            opacity: 0.5
        },true
    )
      //osm_layer.addTo(this.init_map);
      layer_wms.addTo(this.init_map);
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
