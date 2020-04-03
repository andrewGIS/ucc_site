<template>
  <b-container>
    <!-- <b-row> -->
      <b-row>
        Введите название станции в поле или кликните на карте
      </b-row>
    <b-row>
    <div style="width:100%;">
    <b-form-group>
      <b-form-tags v-model="selectedStationsNames" no-outer-focus class="mb-2" >
        <template v-slot="{ tags, disabled, addTag }">
          <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
            <li v-for="tag in tags" :key="tag" class="list-inline-item">
              <b-form-tag
                @remove="removeTag(tag)"
                :title="tag"
                :disabled="disabled"
                variant="info"
              >{{ tag }}</b-form-tag>
            </li>
          </ul>

          <b-dropdown size="sm" variant="outline-secondary" block menu-class="w-100">
            <template v-slot:button-content>
              <b-icon icon="tag-fill"></b-icon> Поиск станции по имени
            </template>
            <b-dropdown-form @submit.stop.prevent="() => {}">
              <b-form-group
                label-for="tag-search-input"
                label="Имя метеостанции"
                label-cols-md="auto"
                class="mb-4"
                label-size="sm"
                :description="searchDesc"
                :disabled="disabled"
              >
                <b-form-input
                  v-model="search"
                  id="tag-search-input"
                  type="search"
                  size="sm"
                  autocomplete="off"
                 ></b-form-input>
              </b-form-group>
            </b-dropdown-form>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item-button
              v-for="option in availableOptions"
              :key="option.wmo_id"
              @click="onOptionClick({ option, addTag })"
            >
              {{ option.name }}
            </b-dropdown-item-button>
            <b-dropdown-text v-if="availableOptions.length === 0">
              Не выбрано ни одной станции
            </b-dropdown-text>
          </b-dropdown>
        </template>
      </b-form-tags>
    </b-form-group>
    </div>
    </b-row>

    <b-row>
        <b-button class="w-100" size="sm" @click="getEventsByStations" :disabled="selectedStationsNames.length===0"> Показать список опасных явлений</b-button>
    </b-row>

    <b-modal id="modal-stations-builder" title="Опасные явления по выбранным станциям" size="xl" ok-only>
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
      selectedStation: '',
      search: ''
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
    },
    criteria () {
      // Compute the search criteria
      return this.search.trim().toLowerCase()
    },
    availableOptions () {
      const criteria = this.criteria
      // Filter out already selected options
      const options = this.aviableStations.filter(opt => this.selectedStationsNames.indexOf(opt.name) === -1)
      if (criteria) {
        // Show only options that match criteria
        return options.filter(opt => opt.name.toLowerCase().indexOf(criteria) > -1)
      }
      // Show all options available
      return this.$_.sortBy(options, 'name')
    },
    searchDesc () {
      if (this.criteria && this.availableOptions.length === 0) {
        return 'Нет ни одной станции по вашему запросу'
      }
      return ''
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
    },
    onOptionClick ({ option, addTag }) {
      addTag((option.name))
      this.$store.commit('ADD_WMO_NAME', option.name)
      this.search = ''
    },
    removeTag (tag) {
      this.$store.commit('REMOVE_WMO_NAME', tag)
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
