//import L from "leaflet/index";
//<reference path="../node_modules/@types/leaflet/index.d.ts" />
//import "scss/main.scss";
import * as L from "leaflet";
import Vue from "vue";
import loaded_data from "./indicators_meta";
import loaded_data_v2 from "./indicators_meta_v2";

import * as _ from "lodash";

//loaded_data["data"]["rasters"][0].raster.period
//delete L.Icon.Default.prototype._getIconUrl;
//import "bootstrap";
//import "popper";
//import "jquery";
//let container = Creat
//let map = new L.Map(document.getElementById("map"));

var start_index: number = 0;
var copy_data = loaded_data;
var copy_data_v2 = loaded_data_v2;
var first_layer = copy_data["data"]["rasters"][start_index].raster.raster_name
var start_indicator_name = "Day_with_snow"
var start_group_name = "Climate_terms_3_hours_data_focal";


var active_period_index = -1;


var layer_wms: L.TileLayer.WMS
console.log(first_layer);
layer_wms = new L.TileLayer.WMS('http://localhost:8080/geoserver/ucc/ows?',
    {
        layers: first_layer,
        //layers: 'raster_test:T_group',
        //styles:"geotiff_coverage:T_style",
        format: 'image/png',
        transparent: true,
        opacity: 0.5
    })

document.addEventListener("DOMContentLoaded", function (event) {
    //load_map();
    init_apps();

});


function init_apps() {

    // let slider_app = new Vue({
    //     el: '#slider-app',
    //     data: {
    //         loaded_rasters: copy_data,
    //         current_year: "Выберите год",
    //         map: load_map()
    //     },
    //     methods: {
    //         decrease_year: function () {
    //             start_index = start_index - 1
    //             //this.current_year -= 1;
    //             layer_wms.setParams({ layers: copy_data["data"]["rasters"][start_index].raster.raster_name }, false);
    //             // console.log(copy_data["data"]["rasters"][start_index+1].raster.raster_name);
    //             this.current_year = copy_data["data"]["rasters"][start_index].raster.period
    //             active_period_index -= 1;
    //         },
    //         increase_year: function () {
    //             start_index = start_index + 1
    //             //this.current_year += 1;
    //             layer_wms.setParams({ layers: copy_data["data"]["rasters"][start_index].raster.raster_name }, false);
    //             // console.log(copy_data["data"]["rasters"][start_index].raster.raster_name);
    //             this.current_year = copy_data["data"]["rasters"][start_index].raster.period;
    //             active_period_index += 1
    //         }
    //     }
    // })



    let main_app = new Vue({
        el: '#main_app',
        data: {
            temp_active: false,
            loaded_rasters: copy_data,
            selected_indicator: start_indicator_name,
            selected_group: start_group_name,
            current_year: "Выберите год",
            map: load_map(),
            periods: ""

        },
        methods: {
            show_temp: function () {
                this.temp_active ? this.temp_active = false : this.temp_active = true;
            },
            change_period: function (event: any) {
                this.current_year = event.explicitOriginalTarget._value
            },
            change_indicator: function (event: any) {
                // console.log(event.explicitOriginalTarget._value);
                this.selected_indicator = event.explicitOriginalTarget._value
            },
            decrease_year: function () {
                start_index = start_index - 1
                //this.current_year -= 1;
                layer_wms.setParams({ layers: copy_data["data"]["rasters"][start_index].raster.raster_name }, false);
                // console.log(copy_data["data"]["rasters"][start_index+1].raster.raster_name);
                this.current_year = copy_data["data"]["rasters"][start_index].raster.period
                active_period_index -= 1;
            },
            increase_year: function () {
                start_index = start_index + 1
                //this.current_year += 1;
                layer_wms.setParams({ layers: copy_data["data"]["rasters"][start_index].raster.raster_name }, false);
                // console.log(copy_data["data"]["rasters"][start_index].raster.raster_name);
                this.current_year = copy_data["data"]["rasters"][start_index].raster.period;
                active_period_index += 1
            },
            update_map: function () {
                console.log(`ucc:${this.selected_indicator}_${this.current_year}_with_h_focal.tif`)
                layer_wms.setParams({ layers: `ucc:${this.selected_indicator}_${this.current_year}_with_h_focal.tif` }, false)
            }
        },
        computed:
        {
            update_map: function () {
                console.log(`ucc:${this.selected_indicator}_${this.current_year}_with_h_focal.tif`)
                layer_wms.setParams({ layers: `ucc:${this.selected_indicator}_${this.current_year}_with_h_focal.tif` }, false)
            },
            create_aviable_indicator_list: function () {

                // return all object where group equals to selected now and create uniq list of indicator_alias in object

                let sorted_objects = _.filter(this.loaded_rasters.data.rasters, (obj) => {
                    return obj.raster.group_name === this.selected_group
                })

                return _.uniqBy(sorted_objects, function (raster) {
                    return raster.raster.indicator_alias;
                })

            },
            create_aviable_year_list: function () {

                // return all object for selected indicator group

                let sorted_objects = _.filter(this.loaded_rasters.data.rasters, (obj) => {
                    return obj.raster.indicator_name === this.selected_indicator
                })

                return _.uniqBy(sorted_objects, function (raster) {
                    return raster.raster.period;
                })

            },
            create_aviable_month_list: function () {

                // return all object for selected indicator group

                let sorted_objects = _.filter(this.loaded_rasters.data.rasters, (obj) => {
                    return obj.raster.indicator_name === this.selected_indicator
                })

                return _.uniqBy(sorted_objects, function (raster) {
                    return raster.raster.month;
                })

            }

        }
    })
}

function load_map(): L.Map {

    let map = new L.Map("map", {
        minZoom: 4,
        maxZoom: 5
    });
    map.setView(new L.LatLng(59, 59), 4);
    let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: "attribution test" })

    //layer.addTo(map);
    layer_wms.addTo(map);

    return map;
}

//document.body.innerHTML = greeter(user);
