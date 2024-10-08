<template>
  <div>
    <b-container style="font-size:12px">
      <b-row align-h="center">
          <div style="text-transform: uppercase;font-size:14px;" v-if="isFilterGeoJSON"> Отобрано станций:
            <span style="font-weight:bold">{{ this.countFiltered }}</span>
            </div>
        </b-row>
        <b-row>
          <b-col>
            <b-form-checkbox v-model="usingDamageTypeFilter" @change="clearDamageTypeFilter" name="check-button" switch>
              Использовать фильтр по типу явления
            </b-form-checkbox>
            <b-form-group label="Выберите типы явления" v-bind:disabled="!usingDamageTypeFilter">
            <b-form-checkbox
              v-for="damageType in damageTypes"
              v-model="selectedDamageTypes"
              :key="damageType.value"
              :value="damageType.value"
              name="flavour-3a"
            >
              {{ damageType.text }}
            </b-form-checkbox>
            <b-form-invalid-feedback style="font-size:14px;font-weight:bold;" :state="validDamageType">Выберите хотя бы один тип</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-checkbox v-model="usingMonthFilter" @change="clearMonthFilter" name="check-button" switch>
              Использовать фильтр по типу месяцу
            </b-form-checkbox>
            <b-form-group label="Выберите месяцы" v-bind:disabled="!usingMonthFilter">
            <b-form-checkbox
              v-for="month in months"
              v-model="selectedMonths"
              :key="month.value"
              :value="month.value"
              name="flavour-3a"
            >
              {{ month.text }}
            </b-form-checkbox>
            <b-form-invalid-feedback style="font-size:14px;font-weight:bold;" :state="validMonths">Выберите хотя бы один месяц</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

          <!-- TO DO selection with tags bootstrap a few reigons -->
        <b-row>
            <b-form-checkbox v-model="usingRegionFilter" @change="clearFilterRegion" name="check-button" switch>
              Использовать фильтр по субъекту
            </b-form-checkbox>
        </b-row>

        <b-row>
            <b-form-tags size="sm" input-id="tags-regions" :disabled="true" placeholder="Выбранные субъекты" v-model="selectedRegions"></b-form-tags>
            <b-form-invalid-feedback style="font-size:14px;font-weight:bold;" :state="validRegions" >Выберите хотя бы один регион</b-form-invalid-feedback>
        </b-row>
        <b-row align-h="start">
              <b-form-input class="w-75" size="sm" list="input-regions" v-bind:disabled="!usingRegionFilter" id="input-region-list" placeholder="Введите имя субъекта" v-model="selectedRegion"></b-form-input>

            <b-button class="w-25" size="sm" @click="addRegion" v-b-tooltip.hover title="Добавить субъект"> + </b-button>
            <b-form-datalist id="input-regions" v-bind:disabled="!usingRegionFilter" :options="regions"></b-form-datalist>
        </b-row>

        <b-row >
          <b-button
          class="w-100 mb-2 mt-2"
          size="sm"
          @click="applyFilter"
          :disabled="(!validDamageType||!validMonths||!validRegions) || (!usingDamageTypeFilter&&!usingMonthFilter&&!usingRegionFilter)">
          Применить фильтр
          </b-button>

          <b-button class="w-100 mb-2" size="sm" @click="clearFilters" :disabled="!isFilterGeoJSON">Очистить все фильтры</b-button>
        </b-row>
        <b-row >
          <b-button  class="w-100" variant="success" size="sm" v-bind:class ="{disabled:!isFilterGeoJSON}" v-b-modal.modal-graphic>Показать таблицу</b-button>
        </b-row>

      </b-container>

      <b-modal size="xl" id="modal-graphic" title="Список явлений по станциям" ok-only>
            <graphic-builder></graphic-builder>
      </b-modal>
  </div>
</template>

<script>

import GraphicBuilder from './GraphicBuilderDynamics.vue'

export default {
  data: function () {
    return {
      selectedStation: '',
      selectedDamageTypes: [],
      selectedMonths: [],
      selectedRegion: '',
      selectedRegions: [],
      usingDamageTypeFilter: false,
      usingYearFilter: false,
      usingMonthFilter: false,
      usingRegionFilter: false,
      startYear: null,
      endYear: null,
      months: [
        { text: 'Январь', value: 1 },
        { text: 'Февраль', value: 2 },
        { text: 'Март', value: 3 },
        { text: 'Апрель', value: 4 },
        { text: 'Май', value: 5 },
        { text: 'Июнь', value: 6 },
        { text: 'Июль', value: 7 },
        { text: 'Август', value: 8 },
        { text: 'Сентябрь', value: 9 },
        { text: 'Октябрь', value: 10 },
        { text: 'Ноябрь', value: 11 },
        { text: 'Декабрь', value: 12 }
      ]
    }
  },
  name: 'geojson-controller',
  computed: {
    isFilterGeoJSON () {
      return this.$store.getters.GET_IS_FILTER
    },
    stations () {
      return this.$store.getters.GET_STATIONS
      // return ''
    },
    regions () {
      return this.$store.getters.GET_REGIONS
      // return ''
    },
    selectedStationNumber () {
      if (this.selectedStation) {
        const selectedStation = this.stations.find(station => {
          return station.name === this.selectedStation
        })
        return selectedStation
      } else {
        return null
      }
    },
    damageTypes () {
      return this.$store.getters.GET_DAMAGE_TYPES
      // return ''
    },
    damageTypesCondition () {
      // name of field on geoserver where damage type is stored
      const evetTypeFieldName = 'event_type'
      if (this.usingDamageTypeFilter) {
        const selectedValues = this.selectedDamageTypes.map(feature => `'${feature}'`)
        return `${evetTypeFieldName} in (${selectedValues.join(',')})`
      } else {
        return null
      }
    },
    monthCondtion () {
      const monthFieldName = 'month'
      if (this.usingMonthFilter) {
        return `${monthFieldName} in (${this.selectedMonths.join(',')})`
      } else {
        return null
      }
    },
    regionCondition () {
      // TODO: set selected region in store
      const regionFieldName = 'region'
      if (this.usingRegionFilter) {
        // for one region
        // return `${regionFieldName}='${this.selectedRegion}'`
        return `${regionFieldName} in (${this.$_.map(this.selectedRegions, regionName => `'${regionName}'`).join(',')})`
      } else {
        return null
      }
    },
    // TODO make computer condition here
    mergedCondition () {
      const mergedConditionString = []
      if (this.damageTypesCondition) {
        mergedConditionString.push(this.damageTypesCondition)
      }
      if (this.monthCondtion) {
        mergedConditionString.push(this.monthCondtion)
      }
      if (this.regionCondition) {
        mergedConditionString.push(this.regionCondition)
      }
      return mergedConditionString.join(' AND ')
    },
    countFiltered () {
      return this.$store.getters.GET_COUNT_SELECTED
    },
    validDamageType () {
      return this.usingDamageTypeFilter ? this.selectedDamageTypes.length > 0 : true
    },
    validMonths () {
      return this.usingMonthFilter ? this.selectedMonths.length > 0 : true
    },
    validRegions () {
      return this.usingRegionFilter ? this.selectedRegions.length > 0 : true
    }
  },
  methods: {
    addRegion () {
      this.selectedRegions.push(this.selectedRegion)
    },
    applyFilter () {
      this.$store.dispatch('LOAD_WMOS_BY_CONDITION', this.mergedCondition)
    },
    clearFilters () {
      console.log('Clear filter')
      this.$store.commit('CLEAR_GEO_JSON_FILTER')
      this.selectedDamageTypes = []
      this.selectedMonths = []
      this.selectedRegion = ''
      this.selectedRegions = []
      this.usingDamageTypeFilter = false
      this.usingMonthFilter = false
      this.usingRegionFilter = false
    },
    clearFilterRegion (usingFilter) {
      if (!usingFilter) {
        this.selectedRegions = []
      }
    },
    clearDamageTypeFilter (usingFilter) {
      if (!usingFilter) {
        this.selectedDamageTypes = []
      }
    },
    clearMonthFilter (usingFilter) {
      if (!usingFilter) {
        this.selectedMonths = []
      }
    }
  },
  destroyed () {
    console.log('Station picker destroyed')
    this.$store.commit('SET_GEOJSON_VISIBILITY', false)
  },
  mounted () {
    console.log('Station picker mounted')
    // await this.$store.dispatch('LOAD_DAMAGE_TYPES')
    // this.$store.commit('SET_GEOJSON_VISIBILITY', true)
  },
  created () {
    console.log('Station picker created')
    this.$store.dispatch('LOAD_DAMAGE_TYPES')
    // this.$store.dispatch('LOAD_STATIONS')
    this.$store.commit('SET_GEOJSON_VISIBILITY', true)
  },
  components: {
    GraphicBuilder
  }
}
</script>
