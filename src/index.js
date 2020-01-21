
import "../dist/css/scss/main.scss"
import Vue from "vue";
import MapComponent from "./components/Map.vue"
var app_1,app_2,app_3;

var add_func = function add_component(event){
    var element ;
    document.getElementById("button_add_window").disabled = true;
    document.getElementById("button_delete_windows").disabled = false;
    element = document.getElementById("window1");
    element.style.width="50%";
    element = document.getElementById("map_1");
    element.style.width="50%";

    element = document.getElementById("window2");
    element.style.width="50%";
    element.style.display = "block";
    element = document.getElementById("map_2");
    element.style.width="50%";
    element.style.left= "50%";
    
   
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

    document.getElementById("button_delete_windows").disabled = true;
    document.getElementById("button_add_window").disabled = false;

    var element = document.getElementById("window1");
    element.style.width="100%";
    element = document.getElementById("map_1");
    element.style.width="100%";

    var w2 = document.getElementById("window2");
    w2.style.width="0%";
    w2.style.display="none";
    
    //app_2.$destroy();
    app_2 = null;
    app_1.$children[0].update_map_size();

}

document.addEventListener("DOMContentLoaded",function(){

    document.getElementById("button_add_window").onclick=add_func;
    document.getElementById("button_delete_windows").onclick=delete_func;
    document.getElementById("button_delete_windows").disabled = true;

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
