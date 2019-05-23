
import Vue from "vue";
import map_component from "./components/map.vue"
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
            map_component
        },
        template:'<map_component :map_id="map_id_num"/>'
    })
    app_1.$children[0].update_map_size();
    app_2.$children[0].update_map_size();


}

document.addEventListener("DOMContentLoaded",function(){

    document.getElementById("button_add_window").onclick=add_func;

    app_1 =new Vue({
        el: "#app1",
        data:{
            map_id_num:"map_1"
        },
        components: {
            map_component
        },
        template:'<map_component :map_id="map_id_num"/>'
    })
    
})
