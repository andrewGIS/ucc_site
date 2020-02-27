<template>
  <div>
    <div class="select_container">
    </div>
    <!-- <input list="wmos" v-model.lazy="selectedStation" placeholder="Выберите станцию">
      <datalist id="wmos">
        <option v-for="station in stations" :key="station.wmo_id" :value="station.name" >{{station.name}}</option>
      </datalist> -->
      <!-- <b-button @click="stationChange">Показать станцию</b-button> -->
      <!-- <b-form-select v-model="selectedDamageType">
        <b-form-select-option :value="null">Все явления</b-form-select-option>
        <b-form-select-option v-for="damageType in damageTypes" :value="damageType" :key="damageType">{{damageType}}</b-form-select-option>
      </b-form-select> -->
      <b-form-checkbox v-model="usingDamageTypeFilter" name="check-button" switch>
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
      </b-form-group>

      <b-form-checkbox v-model="usingYearFilter" name="check-button" switch>
        Использовать фильтр по году
      </b-form-checkbox>
      <b-form-group label="Выберите год" v-bind:disabled="!usingYearFilter">
        <div>
        <!-- <div>
            <b-form-datepicker v-model="startDate" locale="en"></b-form-datepicker>
        </div>
        <div>
            <b-form-datepicker v-model="endDate" locale="en"></b-form-datepicker>
        </div> -->
        <div>
          <b-form-input v-model="startYear" placeholder="Начальный год"></b-form-input>
        </div>
        <div>
          <b-form-input v-model="endYear" placeholder="Конечный год"></b-form-input>
        </div>
        </div>
      </b-form-group>

      <b-form-checkbox v-model="usingMonthFilter" name="check-button" switch>
        Использовать фильтр по типу месяцу
      </b-form-checkbox>
      <b-form-group label="Выберите типы явления" v-bind:disabled="!usingMonthFilter">
      <b-form-checkbox
        v-for="month in months"
        v-model="selectedMonths"
        :key="month.value"
        :value="month.value"
        name="flavour-3a"
      >
        {{ month.text }}
      </b-form-checkbox>
       </b-form-group>

      <b-button @click="applyFilter" >Применить фильтр</b-button>
      <div v-text="'Найдено записей:' + countFiltered"></div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      selectedStation: '',
      selectedDamageTypes: [],
      selectedMonths: [],
      usingDamageTypeFilter: false,
      usingYearFilter: false,
      usingMonthFilter: false,
      startYear: null,
      endYear: null,
      months: [
        { text: 'Январь', value: 1 },
        { text: 'Ферваль', value: 2 }
      ]
    }
  },
  name: 'geojson-controller',
  computed: {
    stations () {
      return this.$store.getters.GET_STATIONS
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
    yearCondition () {
      // name of field on geoserver where damage type is stored
      return ''
    },
    monthCondtion () {
      const monthFieldName = 'month'
      if (this.usingMonthFilter) {
        return `${monthFieldName} in (${this.selectedMonths.join(',')})`
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
      return mergedConditionString.join(' AND ')
    },
    countFiltered () {
      return this.$store.getters.GET_COUNT_SELECTED
    }
  },
  methods: {
    applyFilter () {
      this.$store.dispatch('LOAD_WMOS_BY_CONDITION', this.mergedCondition)
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
    this.$store.commit('SET_GEOJSON_VISIBILITY', true)
  }
}
</script>

<style>

</style>
