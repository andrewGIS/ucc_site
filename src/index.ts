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

// interface for display aviable month in list
interface month {
    key:string,
    alias:string
}

//var copy_data = loaded_data;
var copy_data_v2 = loaded_data_v2;
var first_layer = "ucc:Day_with_snow_1951_1980_with_h_focal.tif"
var start_indicator_name = "Mean_pressure"
var start_period = "1981_2010"
var start_group_name = "Climate_terms_3_hours_data_focal";
var first_month = "year";
var first_postfix = "_focal.tif"
var first_style = "ucc:pressure_style"
var init_month: month[] =[{key:"jan",alias:"Январь"}]


var layer_wms: L.TileLayer.WMS
//console.log(first_layer);
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
    init_app();

});


function init_app() {

    var main_app = new Vue({
        el: '#main_app',
        data: {
            temp_active: true,
            loaded_rasters: copy_data_v2,
            selected_indicator: start_indicator_name,
            selected_group: start_group_name,
            selected_period: start_period,
            selected_month: first_month,
            selected_postfix: first_postfix,
            selected_style: first_style,
            aviable_months: init_month,
            aviable_periods: ["1981_2010"],
            map: load_map(),

        },
        methods: {
            show_temp: function () {
                this.temp_active ? this.temp_active = false : this.temp_active = true;
            },
            change_indicator: function (this: any, event: any) {
                this.selected_indicator = event.explicitOriginalTarget._value
                //console.log("change_indicator => " + this.selected_indicator);
                this.update_postfix();
                this.update_style();
                this.update_month();
                this.update_period();
                this.update_map();

            },
            update_map: function (this: any) {
                //console.log(`ucc:${this.selected_indicator}_${this.current_year}_${this.selected_month}_${this.selected_postfix}`)
                //console.log(this.selected_month)
                //console.log(this.selected_month)
                if (this.selected_month == "None") {
                    console.log(`ucc:${this.selected_indicator}_${this.selected_period}_${this.selected_postfix}`)
                    layer_wms.setParams(
                        { layers: `ucc:${this.selected_indicator}_${this.selected_period}_${this.selected_postfix}`, styles: this.selected_style }, false)

                } else {
                    console.log(`ucc:${this.selected_indicator}_${this.selected_period}_${this.selected_month}_${this.selected_postfix}`)
                    layer_wms.setParams(
                        { layers: `ucc:${this.selected_indicator}_${this.selected_period}_${this.selected_month}_${this.selected_postfix}`, styles: this.selected_style }, false)
                }

            },
            update_postfix() {
                /**
                 * Update postfix for adding to file 
                 * Sample postfix is with_h_focal in Day_with_snow_1951_1980_with_h_focal.tif
                 * It may change in different group
                 */
                this.selected_postfix = _.filter(this.loaded_rasters.groups[0].indicators, (obj) => {
                    return obj.name === this.selected_indicator
                })[0].postfix_in_file

                //console.log("change_postfix => " + this.selected_postfix);
            },
            update_style: function () {
                this.selected_style = _.filter(this.loaded_rasters.groups[0].indicators, (obj) => {
                    return obj.name === this.selected_indicator
                })[0].style
                //console.log("change_style => " + this.selected_style);
            },
            update_period: function () {

                let aviable_periods = _.filter(this.loaded_rasters.groups[0].indicators, (obj) => {
                    return obj.name === this.selected_indicator
                })[0]

                // get first aviable period and set its as default in dropdown list
                this.selected_period = aviable_periods.periods[0]
                this.aviable_periods = aviable_periods.periods
                return aviable_periods.periods
            },
            update_month: function () {

                let aviable_months = _.filter(this.loaded_rasters.groups[0].indicators, (obj) => {
                    return obj.name === this.selected_indicator
                })[0]

                this.selected_month = aviable_months.months[0]
                this.aviable_months = _.map(aviable_months.months, function (month) {
                    switch (month) {
                        case "year":
                            return { key:"year",alias: "Год" }
                        case "jan":
                            return { key:"jan",alias: "Январь" }
                        case "jul":
                            return { key:"jul",alias: "Июль" }
                        case "oct":
                            return { key:"oct",alias: "Октябрь" }
                        case "apr":
                            return { key:"apr",alias: "Апрель" }
                        default:
                            return { key:"None",alias: "Нет данных" }
                    }
                })
                return aviable_months.months
            }
        },
        computed: {

            aviable_indicator_list: function () {
                return _.filter(this.loaded_rasters.groups[0].indicators, (obj) => {
                    return obj.name
                })
            }
        }
    })
}

function load_map(): L.Map {

    //console.log("call build map")

    let map = new L.Map("map", {
        minZoom: 4,
        maxZoom: 6
    });
    map.setView(new L.LatLng(59, 59), 4);
    let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { attribution: "attribution test" })

    //layer.addTo(map);
    layer_wms.addTo(map);

    return map;
}

//document.body.innerHTML = greeter(user);
