
import Vue from "vue";
import MapComponent from "./components/Map.vue"
var app_1,app_2,app_3;

var add_func = function add_component(event){
    var w1 = document.getElementById("window1");
    w1.style.width="50%";
    var w2 = document.getElementById("window2");
    w2.style.width="50%";
    w2.style.display="block";
    
   
    app_2 = new Vue({
        el: "#app2",
        data:{
            map_id_num:"map_2"
        },
        components: {
            MapComponent
        },
        template:'<MapComponent :map_id="map_id_num"></MapComponent>'
    })
    app_1.$children[0].update_map_size();
    app_2.$children[0].update_map_size();


}

var delete_func = function delete_component(event){

    var w1 = document.getElementById("window1");
    w1.style.width="100%";
    var w2 = document.getElementById("window2");
    //w2.style.width="0%";
    w2.style.display="none";
    
    //app_2.$destroy();
    app_2 = null;
    app_1.$children[0].update_map_size();


}

document.addEventListener("DOMContentLoaded",function(){

    document.getElementById("button_add_window").onclick=add_func;
    document.getElementById("button_delete_windows").onclick=delete_func;

    app_1 =new Vue({
        el: "#app1",
        data:{
            map_id_num:"map_1"
        },
        components: {
            MapComponent
        },
        template:'<MapComponent :map_id="map_id_num"></MapComponent>'
    })
    
})
