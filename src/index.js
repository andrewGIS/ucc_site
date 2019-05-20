import * as L from "leaflet";
import Vue from "vue";
import lister from "./components/lister.vue"

document.addEventListener("DOMContentLoaded", function (event) {
    //load_map();
    init_main_app();

});


function init_main_app() {

    //import * from "./components/

    var first_layer = "ucc:Day_with_snow_1951_1980_with_h_focal.tif";
    var layer_wms = L.tileLayer.wms(
        "http://localhost:8080/geoserver/ucc/ows?",
        {
            layers: first_layer,
            format: "image/png",
            transparent: true,
            opacity: 0.5
        },true
    );
    let v = new Vue({
        el: '#main_app',
        data: {
            init_map: first_layer,
            main_layer: layer_wms,
            active_group:"temperature"
        },
        methods: {
            load_map() {

                this.init_map = new L.Map("map", {
                    minZoom: 4,
                    maxZoom: 6
                });

                this.init_map.setView(new L.LatLng(59, 59), 4);

                let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    { attribution: "attribution test" })

                //layer.addTo(this.init_map);
                layer_wms.addTo(this.init_map);


            },
            show_lister(event,index) {
                //console.log(event.target.className);
                this.active_group = event.target.className;
                this.$children[index].update_layer();
                this.$children[index].brake_animation();
            }
        },
        mounted() {
            this.load_map();
            

        },
        components: {
            lister
        },
        template: `
        <div>
            <header
                class="main_header offset-sm-3 offset-md-3 col-xl-6 col-sm-6 col-12 col-md-6 col-lg-6 rounded"
                >Атласная информационная система "Изменение климата Урала"
            </header>
            <div id="indicators-app" class="indicators rounded">
                <div class="active_icon class=temperature">
                    <span class="temperature" @click="show_lister($event,0)">
                        Климатические
                        показатели 3-ч часовые
                        
                    </span>
                </div>
                    <lister v-show="active_group==='temperature'" ref="group" :index_group="0" :layer_wms="main_layer" />
                <div  class="temperature" >
                    <span class="some_days" @click="show_lister($event,1)">
                        Какие то дни
                    </span>
                </div>
                    <lister v-show="active_group==='some_days'" :index_group="1" :layer_wms="main_layer" />
                <div>
                    Текущий показатель {{main_layer.wmsParams.layers}}
                </div>
            </div>

        </div>
        `
    })
}