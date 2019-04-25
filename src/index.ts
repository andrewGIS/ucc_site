//import L from "leaflet/index";
//<reference path="../node_modules/@types/leaflet/index.d.ts" />
//import "scss/main.scss";
import * as L from "leaflet";
import Vue from "vue";
import loaded_data from "./indicators_meta";

//loaded_data["data"]["rasters"][0].raster.period
//delete L.Icon.Default.prototype._getIconUrl;
//import "bootstrap";
//import "popper";
//import "jquery";
//let container = Creat
//let map = new L.Map(document.getElementById("map"));

var periods:string[]= ["1951_1980","1961_1990","1971_2000","1981_2010"];
var start_index:number = 0;
var copy_data = loaded_data;
var first_layer = copy_data["data"]["rasters"][start_index].raster.raster_name

var active_period_index = -1;

var layer_wms:L.TileLayer.WMS
console.log(first_layer);
layer_wms = new L.TileLayer.WMS('http://localhost:8080/geoserver/ucc/ows?',
    {
        layers: first_layer,
        //layers: 'raster_test:T_group',
        //styles:"geotiff_coverage:T_style",
        format: 'image/png',
        transparent: true,
        opacity:0.5
})

document.addEventListener("DOMContentLoaded", function (event) {
    //load_map();
    init_apps();

});

function init_apps(){
    
    let slider_app = new Vue({
        el: '#slider-app',
        data: {
            current_year: "Выберите год",
            map:load_map()
        },
        methods: {
            decrease_year: function () {
                start_index = start_index - 1 
                //this.current_year -= 1;
                layer_wms.setParams({layers: copy_data["data"]["rasters"][start_index].raster.raster_name},false);
                console.log(copy_data["data"]["rasters"][start_index+1].raster.raster_name);
                this.current_year = copy_data["data"]["rasters"][start_index].raster.period
                active_period_index -=1;
            },
            increase_year: function () {
                start_index = start_index + 1
                //this.current_year += 1;
                layer_wms.setParams({layers: copy_data["data"]["rasters"][start_index].raster.raster_name},false);
                console.log(copy_data["data"]["rasters"][start_index].raster.raster_name);
                this.current_year = copy_data["data"]["rasters"][start_index].raster.period;
                active_period_index +=1
            },
        }
    })
    let indicator_app = new Vue ({
        el: '#indicators-app',
        data: {
            temp_active:false
        },
        methods: {
            show_temp: function () {
                this.temp_active ? this.temp_active = false : this.temp_active = true;
            },
            change_period:function(period_index:number){
                console.log('raster_test:T_average_'+periods[period_index]+"_with_relief_focal")
                layer_wms.setParams({layers:"raster_test:T_average_"+periods[period_index]+"_with_relief_focal"});
                document.getElementsByClassName("current_year")[0].innerHTML = periods[period_index];
            }
        }
    })
}



function load_map():L.Map {

    let map = new L.Map("map",{
        minZoom: 4,
        maxZoom: 5
    });
    map.setView(new L.LatLng(59, 59), 4);
    let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: "attribution test" })
    // let layer_1 = new L.TileLayer.WMS('http://localhost:8080/geoserver/raster_test/ows?',
    //     {layers: 'raster_test:geotiff_coverage',
    //     transparent: true})
    //let layer_1 = new L.TileLayer.WMS('http://localhost:8080/geoserver/nurc/wms?',{layers: 'nurc:mosaic'})
    //var layer_1 = new L.TileLayer.WMS('http://ogs.psu.ru:8080/geoserver/nurc/ows?',{layers: 'nurc:mosaic'})
    //let layer_1 = new L.TileLayer.WMS('http://ogs.psu.ru:8080/geoserver/nurc/wms?',{layers: 'nurc:mosaic'})

    //layer.addTo(map);
    layer_wms.addTo(map);

    // let circle = L.circle([59, 59], {
    //     color: 'red',
    //     fillColor: '#f03',
    //     fillOpacity: 0.5,
    //     radius: 5000
    // }).addTo(map);

    interface IPerson {
        firstName: string;
        secondName: string;
    }
    function greeter(person: IPerson) {
        return "Hello, " + person.firstName + " - " + person.secondName;
    }

    let user: IPerson = {

        firstName: "Andrey",
        secondName: "Tarasov_18000"
    }

    //document.getElementsByClassName("current_year")[0].innerHTML = user.firstName;

    console.log("DOM fully loaded and parsed");

    return map;
}

//document.body.innerHTML = greeter(user);
