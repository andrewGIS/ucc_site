<template >
  <div>
    <div class="select_container">
      <!-- Select group of indicators -->
      <b-form-select v-model="selectedGroup">
        <option
          v-for="group in aviableGroups"
          :value="group.name"
          :key="group.name"
        >{{group.alias}}
        </option>
      </b-form-select>

      <!-- Select group of indicators -->
      <b-form-select v-model="selectedIndicator">
        <option
          v-for="indicator in aviableGroupIndicators"
          :value="indicator.name"
          :key="indicator.name"
        >{{indicator.alias}}
        </option>
      </b-form-select>

      <!-- Select year of selected indicator -->
      <b-form-select v-model="selectedPeriod">
        <option
          v-for="period in aviableIndicatorPeriods"
          :value="period"
          :key="period"
        >{{period.replace("_","-")}}
        </option>
      </b-form-select>

      <!-- Select month of selected indicator -->
      <b-form-select v-model="selectedMonth">
        <option
          v-for="month in aviableIndicatorMonths"
          :value="month.key"
          :key="month.alias"
        >{{month.alias}}
        </option>
      </b-form-select>

      <b-button v-b-modal.modal-1 variant="info">Информация о показателе</b-button>

      <b-modal id="modal-1" title="BootstrapVue">
        <p class="my-4">{{this.description}}</p>
      </b-modal>

    </div>
      <!-- Second map controller -->
  </div>
</template>

<script>
// TODO : Make
// separate json in production for manual change group and indicators
// import json from '../assets/indicators.json'

// import * as _ from 'lodash'
import { allMetadata } from '../assets/indicators_meta_v2'

export default {
  props: {
    mapNum: {
      type: Number,
      required: false
    }
  },
  name: 'raster-controller',
  data () {
    return {
      // aviable groups
      aviableGroups: [],
      // data for selected group
      selectedGroupData: [],
      // data for selected indicators
      selectedIndicatorData: '',
      // selectedGroup
      selectedGroup: '',
      // store selected indicator name (Mean pressure for example)
      selectedIndicator: '',
      // store selected period value (1951_1958 for example)
      selectedPeriod: '',
      // store selected month value (Jan for example)
      // keys defined in this.aviable_month
      selectedMonth: ''
    }
  },
  methods: {
    updateGroup () {
      /**
       * Update after change indicator manually
       * Problem is that period and months not updated
       * after change indicator
       * ???Test to fix it????
       */
      // this.selectedIndicator = this.aviableGroupIndicators[0].name
      // this.updateIndicator()
      // this.updateLayer()
    },
    updateIndicator () {
      this.selectedPeriod = this.aviableIndicatorPeriods[0]
      this.selectedMonth = this.aviableIndicatorMonths[0].key
    }
  },
  computed: {
    // selectedGroupData () {
    //   return allMetadata.groups.find(group =>
    //     group.name === this.selectedGroup)
    // },
    aviableGroupIndicators () {
      return this.selectedGroupData.indicators.map(indicator => {
        return {
          name: indicator.name,
          alias: indicator.alias
        }
      })
    },
    // selectedIndicatorData () {
    //   return this.selectedGroupData.indicators.find(indicator =>
    //     indicator.name === this.selectedIndicator)
    // },
    aviableIndicatorPeriods () {
      /**
       * Return aviable periods for selected indicator (1951-1960 for example)
       * from metadata
       * Reading from pre-filtered meta_data_group property
       * return list of objects [periods]
       */
      // let selectedGroupData = allMetadata.groups.find(group => group.name === this.selectedGroup)
      return this.selectedIndicatorData.periods
      // return []
    },
    aviableIndicatorMonths () {
      /**
       * Return aviable months for selected indicator
       * from metadata
       * Reading from pre-filtered meta_data_group property
       * return list of objects [{month_key:month_alias}]
       * sample output [{month_key:month_alias}]
       */
      return this.selectedIndicatorData.months.map(month => {
        switch (month) {
          case 'year':
            return { key: 'year', alias: 'Год' }
          case 'jan':
            return { key: 'jan', alias: 'Январь' }
          case 'feb':
            return { key: 'feb', alias: 'Февраль' }
          case 'mar':
            return { key: 'mar', alias: 'Март' }
          case 'apr':
            return { key: 'apr', alias: 'Апрель' }
          case 'may':
            return { key: 'may', alias: 'Май' }
          case 'jun':
            return { key: 'jun', alias: 'Июнь' }
          case 'jul':
            return { key: 'jul', alias: 'Июль' }
          case 'aug':
            return { key: 'aug', alias: 'Август' }
          case 'sep':
            return { key: 'sep', alias: 'Сентябрь' }
          case 'oct':
            return { key: 'oct', alias: 'Октябрь' }
          case 'nov':
            return { key: 'nov', alias: 'Ноябрь' }
          case 'dec':
            return { key: 'dec', alias: 'Декабрь' }
          default:
            return { key: 'None', alias: 'Нет данных' }
        }
      })
    },
    style () {
      /**
       * Return style name for selected element
       */
      return this.selectedIndicatorData.style
    },
    description () {
      /**
       * Return description of selected element
       */
      return this.selectedIndicatorData.desc
    },
    legend () {
      /**
       * Computed legend URL for selected layer
       */
      // return (
      //   'http://ogs.psu.ru:8080/geoserver/wms' +
      //   '?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/' +
      //   `png&WIDTH=10&HEIGHT=10&LAYER=${this.layerUrl}&style=` +
      //   `${this.style + '_legend'}&legend_options=layout:vertical`
      // )
      return ''
    },
    layerFilter () {
      /**
       * Computed URL of selected layer
       * ucc - store on Geoserver !!!MAY CHANGE!!
       */
      // if (this.selectedMonth === 'None') {
      //   summaryFilter =
      //     `${this.workspaceName}:${this.selectedIndicator}` +
      //     `_${this.selectedPeriod}`
      // } else {
      //   summaryFilter =
      //     `${this.workspaceName}:${this.selectedIndicator}` +
      //     `_${this.selectedPeriod}` +
      //     `_${this.selectedMonth}`
      // }
      const groupFldName = 'group'
      const indicatorFldName = 'indicator'
      const periodFldName = 'period'
      const monthFldName = 'month'

      const summaryFilter = `(${groupFldName}='${this.selectedGroup}') AND (${indicatorFldName}='${this.selectedIndicator}')  AND (${periodFldName}='${this.selectedPeriod}') AND (${monthFldName}='${this.selectedMonth}')`

      // this.$emit('changeURL')
      // this.$store.commit(`'${this.commitMethod}'`, urlString)
      // this.$store.commit('SET_MAP_URL', {
      //   mapNum: this.mapNum,
      //   url: urlString
      // })
      return summaryFilter
    }
  },
  watch: {
    layerFilter: function () {
      this.$store.commit('SET_MAP_FILTER', {
        mapNum: this.mapNum,
        filterExpression: this.layerFilter
      })
      // this.$emit('changeURL')
      // this.$store('chanheURL', urlString)
    },
    // TODO: refactor watchers and create hook to remove duplicating code
    selectedGroup: function () {
      this.selectedGroupData = allMetadata.groups.find(group =>
        group.name === this.selectedGroup)
      this.selectedIndicator = this.selectedGroupData.indicators[0].name
      this.selectedPeriod = this.selectedGroupData.indicators[0].periods[0]
      this.selectedMonth = this.selectedGroupData.indicators[0].months[0]
    },
    selectedIndicator: function () {
      this.selectedIndicatorData = this.selectedGroupData.indicators.find(indicator =>
        indicator.name === this.selectedIndicator)
      this.selectedPeriod = this.selectedIndicatorData.periods[0]
      this.selectedMonth = this.selectedIndicatorData.months[0]
    }
  },
  created () {
    /**
     * Update meta data for group
     * Load aviable indicators list and
     * set first element
     */
    // console.log(allMetadata)
    this.aviableGroups = allMetadata.groups.map(group => {
      return {
        name: group.name,
        alias: group.alias
      }
    })
    this.selectedGroup = this.aviableGroups[0].name
    this.selectedGroupData = allMetadata.groups[0]
    this.selectedIndicator = allMetadata.groups[0].indicators[0].name
    this.selectedIndicatorData = allMetadata.groups[0].indicators[0]
    this.selectedPeriod = allMetadata.groups[0].indicators[0].periods[0]
    this.selectedMonth = allMetadata.groups[0].indicators[0].months[0]

    // this.$store.commit(this.commitMethod, this.layerUrl)

    // this.metaDataGroup = _.find(allMetadata.groups, {
    //   name: this.nameGroup
    // })
    // const _indicators = _.map(this.metaDataGroup.indicators, o =>
    //   _.pick(o, ['name', 'alias'])
    // )
    // // save list in variable
    // this.aviableIndicators = _indicators
    // // set first indicator as selected
    // this.selectedIndicator = _indicators[0].name
  }
}

// add functions
// function sleep (ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

</script>

<style></style>
