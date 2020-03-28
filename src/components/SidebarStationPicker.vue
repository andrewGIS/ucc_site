<template>
  <b-container>
    <b-row>

        Введите название станции в поле или кликниет на карте
        <b-form-tags size="sm" input-id="tags-stations" :disabled="true" placeholder="Выбранные станции" v-model="selectedStationsNames"></b-form-tags>
    </b-row>
    <b-row>
        <b-form-input class="w-75" size="sm" list="input-stations" id="input-station-list" placeholder="Введите имя станции" v-model="selectedStation"></b-form-input>

        <b-form-datalist id="input-stations" :options="stationsNames"></b-form-datalist>

        <b-button class="w-25" size="sm" @click="addStationByName" v-b-tooltip.hover title="Добавить станцию к выбранным">+</b-button>
    </b-row>
    <b-row>
        <b-button class="w-100" size="sm" @click="clearSelectedStationsNames"> Очистить выбранные станции</b-button>
    </b-row>
    <b-row>
        <b-button class="w-100" size="sm" @click="getEventsByStations" :disabled="selectedStationsNames.length===0"> Показать список опасных явлений</b-button>
    </b-row>

    <b-modal id="modal-stations-builder" title="Опасные явления по выбранным станциям" size="xl">
        <graphic-builder-stations></graphic-builder-stations>
    </b-modal>

  </b-container>
</template>

<script>
import GraphicBuilderStations from './GraphicBuilderStations'
export default {
  name: 'stations-picker',
  data () {
    return {
      selectedStation: ''
    }
  },
  computed: {
    aviableStations () {
      return this.$store.getters.GET_STATIONS
    },
    stationsNames () {
      return this.$_.map(this.aviableStations, 'name').sort()
    },
    selectedStationsNames () {
      return this.$store.getters.GET_SELECTED_STATIONS_NAMES
    }
  },
  methods: {
    addStationByName () {
      // this.selectedStationsNames.push(this.selectedStation)
      this.$store.commit('ADD_WMO_NAME', this.selectedStation)
    },
    clearSelectedStationsNames () {
      // this.selectedStationsNames.push(this.selectedStation)
      this.$store.commit('CLEAR_SELECTED_WMOS')
    },
    async getEventsByStations () {
      await this.$store.dispatch('LOAD_EVENTS_BY_STATIONS_NAME')
      this.$bvModal.show('modal-stations-builder')
    }
  },
  mounted () {
    console.log('mounted')
    this.$store.commit('SET_GEOJSON_CLICK', true)
  },
  components: {
    GraphicBuilderStations
  }

}
</script>

<style>

</style>
