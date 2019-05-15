import * as L from "leaflet";
import Vue from "vue";
import lister from "./components/lister.vue"

document.addEventListener("DOMContentLoaded", function (event) {
    //load_map();
    init_main_app();

});


function init_main_app() {

    //import * from "./components/

    var layer_wms: L.TileLayer.WMS
    var first_layer = "ucc:Day_with_snow_1951_1980_with_h_focal.tif";
    var layer_wms = new L.TileLayer.WMS(
        "http://localhost:8080/geoserver/ucc/ows?",
        {
            layers: first_layer,
            format: "image/png",
            transparent: true,
            opacity: 0.5
        }
    );


    let start_map: any

    let v = new Vue({
        el: '#main_app',
        data: {
            init_map: start_map,
            main_layer:layer_wms
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
                <a class="active_icon class=temperature">
                    <span class="temperature active_indicator">
                        Климатические
                        показатели 3-ч часовые
                    </span>
                    </a>
                    <lister :index_group="0" :layer_wms="main_layer" />
                    <a class=" class=temperature">
                    <span class="temperature ">
                        Какие то дни
                    </span>
                    <lister :index_group="1" :layer_wms="main_layer" />
                </a>
            </div>
        </div>
        `
    })
}