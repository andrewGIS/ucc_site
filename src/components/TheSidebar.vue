<template>
<div>
        <b-list-group-item button style="cursor:pointer;padding-top:20px;padding-bottom:20px;" @click="toggleVisible" v-b-tooltip.hover title="Нажмите, чтобы скрыть меню">
              <b-icon icon="list" font-scale="1.4" style="vertical-align:bottom;"></b-icon><span>  АТЛАС ИЗМЕНЕНИЙ КЛИМАТА УРАЛА</span>
        </b-list-group-item>

      <b-list-group >

        <b-list-group-item button v-if="activeGroup===''||activeGroup==='maps'" @click="clickMaps" :disabled="busy">
          <b-icon-arrow-left v-if="activeGroup==='maps'" size="sm" :disabled="busy"></b-icon-arrow-left >
              <span v-if="activeGroup===''||activeGroup==='maps'">Карты</span>
        </b-list-group-item>

      <b-list-group-item button v-if="activeGroup===''||activeGroup==='stat'" @click="clickStat">
        <b-icon-arrow-left  class="chapter" v-if="activeGroup==='stat'" size="sm" ></b-icon-arrow-left>
        <span class="chapter" v-if="activeGroup===''||activeGroup==='stat'" >Статистика</span>
      </b-list-group-item>

      <b-list-group-item button v-if="activeGroup===''||activeGroup==='DB'" @click="clickDB">
        <b-icon-arrow-left class="chapter" v-if="activeGroup==='DB'" size="sm"></b-icon-arrow-left>
        <span  class="chapter" v-if="activeGroup===''||activeGroup==='DB'" >БД ОЯ</span>
      </b-list-group-item>

      <b-list-group-item button v-if="activeGroup===''||activeGroup==='extreme'" @click="clickExtreme" :disabled="busy">
        <b-icon-arrow-left class="chapter" v-if="activeGroup==='extreme'" size="sm" :disabled="busy"></b-icon-arrow-left>
        <span class="chapter" v-if="activeGroup===''||activeGroup==='extreme'" >Отдельные случаи ОЯ</span>
      </b-list-group-item>
      </b-list-group>

      <!-- <b-button @click='clearStorage'>Очистить посещение</b-button> -->

      <b-container>
        <rastersController v-if="activeGroup==='maps'"></rastersController>
        <layerControl v-if="activeGroup==='stat'"></layerControl>
        <stations-picker v-if="activeGroup==='DB'"></stations-picker>
        <extreme-events-controller v-if="activeGroup==='extreme'"></extreme-events-controller>
      </b-container>

      <b-toast id="mapInfo" title="Подсказка" no-auto-hide append-toast @hidden='isCloseMapsInfo=true'>
        Это раздел <b>КАРТЫ</b>. Здесь собраны данные с различных источников. Все карты переведены в растровый вид. Можно создать две карты рядом для сравнения. Данные сгруппированы по категориям (Меню группы показателей). В каждой группе есть несколько показателей (например, средняя температура воздуха). Кнопки
        <b-img :src="require('../assets/infoPics/buttons.jpg')" style="width:20%;height:20%"></b-img> позволяют анимировать периоды по доступным периодам, чтобы увидеть изменения, которые произошли за эти периоды.
        <!-- <b-container>
          <b-media right-align vertical-align="center">
            <b-img :src="require('../assets/infoPics/buttons.jpg')" style="width:100%"></b-img>
          </b-media>
        </b-container> -->
    </b-toast>

      <b-toast id="statInfo" title="Подсказка" no-auto-hide append-toast @hidden='isCloseStatInfo=true'>
        Это раздел <b>Статистика</b>. Здесь собраны данные по опасным случаям, которые произошли на метеостанциях Урала. Здесь можно посмотреть, сколько всего произошло явлений, в разрезе субъектов, типов явлений.
    </b-toast>

      <b-toast id="DBInfo" title="Подсказка" no-auto-hide append-toast @hidden='isCloseDBInfo=true'>
        Это раздел <b>База данных</b>. Здесь можно посмотреть информацию по опасным явлениям на одной или нескольких станциях. Для этого необходимо выбрать интересующие станции или на карте или с помощью поиска по имени. В таблице есть <b>видео-материалы</b> и <b>ссылки</b> на СМИ, которые писали об этом явлении. Обратите внимание на эти поля в таблице.
    </b-toast>

      <b-toast id="extremeInfo" title="Подсказка" no-auto-hide append-toast @hidden='isCloseExtremeInfo=true'>
        Это раздел <b>Отдельные случаи опасных явлений</b>. Здесь можно посмотреть информацию по отдельным опасным случаям. Для работы выберите интересующий случай. Внизу карты, можно выбрать отображение на конкретную дату, а также проиграть анимацию с помощью <b-img :src="require('../assets/infoPics/buttons.jpg')" style="width:20%;height:20%"></b-img>. Способы представления явления вы можете посмотреть кликнув на кнопочке информация <b-img :src="require('../assets/infoPics/info.jpg')" style="width:15%;height:15%"></b-img>. Там вы найдете о том, что это за явление и каким способами они отображено.
    </b-toast>

  </div>
</template>

<script>

// dom.watch()
import layerControl from './SidebarLayerControl'
import rastersController from './SidebarRasterController'
import stationsPicker from './SidebarStationPicker'
import extremeEventsController from './SidebarExtremeEventsController'
// import RasterPicker from './RasterPicker'

export default {
  data () {
    return {
      activeGroup: '',
      isCloseMapsInfo: null,
      isCloseStatInfo: null,
      isCloseDBInfo: null,
      isCloseExtremeInfo: null
    }
  },
  name: 'my-sidebar-menu',
  computed: {
    busy () {
      return this.$store.getters.GET_BUSY_STATE
    },
    helpStatus () {
      return this.$store.getters.GET_HELP_STATUS
    }
  },
  methods: {
    setActiveGroup (groupName) {
      this.activeGroup = groupName
    },
    clear () {
      this.activeGroup = ''
    },
    clickMaps () {
      if (this.activeGroup) {
        this.activeGroup = ''
        this.$store.commit('SET_WMS_VISIBILITY', false)
        this.$store.commit('SET_LEGEND_VISIBILLITY', false)
        this.$store.commit('SET_SECOND_MAP_VISIBILITY', false)
        this.$store.commit('SET_INFO_STATUS', false)
        this.$store.commit('SET_MAP_ZOOM', 14)
      } else {
        this.activeGroup = 'maps'
        this.$store.commit('SET_WMS_VISIBILITY', true)
        this.$store.commit('SET_LEGEND_VISIBILLITY', true)
        // this.$store.commit('SET_INFO_STATUS', true)
        this.$store.commit('SET_MAP_ZOOM', 6)

        if (this.helpStatus && !this.isCloseMapsInfo) {
          this.$bvToast.show('mapInfo')
        }
      }
    },
    clickStat () {
      if (this.activeGroup) {
        this.activeGroup = ''
        this.$store.commit('SET_GEOJSON_VISIBILITY', false)
        this.$store.commit('CLEAR_GEO_JSON_FILTER')
      } else {
        this.activeGroup = 'stat'
        this.$store.commit('SET_GEOJSON_VISIBILITY', true)
        this.$store.commit('SET_MAP_ZOOM', 14)
        if (this.helpStatus && !this.isCloseStatInfo) {
          this.$bvToast.show('statInfo')
        }
      }
    },
    clickDB () {
      if (this.activeGroup) {
        this.activeGroup = ''
        this.$store.commit('SET_GEOJSON_VISIBILITY', false)
      } else {
        this.activeGroup = 'DB'
        this.$store.commit('SET_GEOJSON_VISIBILITY', true)
        this.$store.commit('SET_MAP_ZOOM', 14)
        if (this.helpStatus && !this.isCloseDBInfo) {
          this.$bvToast.show('DBInfo')
        }
      }
    },
    clickExtreme () {
      if (this.activeGroup) {
        this.activeGroup = ''
        this.$store.commit('SET_EXTREME_VISIBILLITY', false)
        this.$store.commit('SET_LEGEND_VISIBILLITY', false)
        this.$store.commit('SET_EXTREME_SELECTED_EVENT', {})
        this.$store.commit('SET_MAP_ZOOM', 14)
      } else {
        this.activeGroup = 'extreme'
        this.$store.commit('SET_EXTREME_VISIBILLITY', true)
        this.$store.commit('SET_MAP_ZOOM', 4)
        if (this.helpStatus && !this.isCloseExtremeInfo) {
          this.$bvToast.show('extremeInfo')
        }
      }
    },
    toggleVisible () {
      this.$store.commit('SET_SIDEBAR_VISIBLE', false)
    },
    clearStorage () {
      delete localStorage.isFirstTime
    }
  },
  components: {
    layerControl, rastersController, stationsPicker, extremeEventsController
  }
  // LayerController
  // RasterPicker

}
</script>
<style>
.chapter {
  cursor: pointer;
}
</style>
