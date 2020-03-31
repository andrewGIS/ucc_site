<template >
  <div>
    <b-container >
        <!-- Select group of indicators -->
        <b-row>
          Выберите группу показателей
        </b-row>
        <b-row>
          <b-form-select size="sm" v-model="selectedGroup" :disabled="isAnimation">
            <option
              v-for="group in aviableGroups"
              :value="group.name"
              :key="group.name"
            >{{group.alias}}
            </option>
          </b-form-select>
        </b-row>

        <b-row>
          Выберите показатель
        </b-row>
        <!-- Select group of indicators -->
        <b-row>
          <b-form-select size="sm" v-model="selectedIndicator" :disabled="isAnimation">
            <option
              v-for="indicator in aviableGroupIndicators"
              :value="indicator.name"
              :key="indicator.name"
            >{{indicator.alias}}
            </option>
          </b-form-select>
        </b-row>

        <b-row>
          Выберите временной промежуток
        </b-row>
        <!-- Select year of selected indicator -->
        <b-row>
          <b-form-select size="sm" v-model="selectedYear" :disabled="isAnimation">
            <option
              v-for="period in aviableIndicatorYears"
              :value="period"
              :key="period"
            >{{period.replace("_","-").replace("before", "до ")}}
            </option>
          </b-form-select>
        </b-row>

        <b-row>
          Выберите период расчета
        </b-row>
        <b-row>
        <!-- Select month of selected indicator -->
          <b-form-select size="sm" v-model="selectedPeriod" :disabled="isAnimation">
            <option
              v-for="month in aviableIndicatorPeriods"
              :value="month.key"
              :key="month.alias"
            >{{month.alias}}
            </option>
          </b-form-select>
        </b-row>

        <b-row style="padding:0">
            <b-button size="sm" style="width:100%" @click="openModal" variant="info" :disabled="isAnimation">Информация о показателе</b-button>
        </b-row>

      </b-container>
      <b-modal size="lg" :id="mapNum.toString()"  title="Информация о показателе" ok-only>
        <!-- <b-form-textarea plaintext :value="description"></b-form-textarea> -->
          <div>
            <b-table stacked :items="description" :fields="fieldsDesc">
              <template v-slot:cell(source)="data">
                <a :href="data.value" target="_blank" >{{data.value}}</a>
            </template>
              <template v-slot:cell(methodLink)="data">
                <a :href="data.value" target="_blank" >{{data.value}}</a>
            </template>
            </b-table>
        </div>
      </b-modal>
  </div>
</template>

<script>
// TODO : Make
// separate json in production for manual change group and indicators
// import json from '../assets/indicators.json'

// import * as _ from 'lodash'
import { allMetadata } from '../assets/RastersMetadata'

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
      aviableGroups: [], // aviable groups
      selectedGroupData: [], // data for selected group
      selectedIndicatorData: '', // data for selected indicators
      selectedGroup: '', // selectedGroup
      selectedIndicator: '', // store selected indicator name (Mean pressure for example)
      selectedYear: '', // store selected period value (1951_1958 for example)
      selectedPeriod: '', // store selected month value (Jan for example)
      isAnimation: false,
      timer: '', // for animation,
      fieldsDesc: [
        {
          key: 'source',
          label: 'Источник'
        },
        {
          key: 'spatialRes',
          label: 'Пространственное разрешение'
        },
        {
          key: 'countStations',
          label: 'Количество станций, использованных для интерполяции'
        },
        {
          key: 'method',
          label: 'Методика расчета'
        },
        {
          key: 'methodLink',
          label: 'Описание методики'
        }
      ]
    }
  },
  methods: {
    openModal () {
      this.$bvModal.show(this.mapNum.toString())
    },
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
      this.selectedYear = this.aviableIndicatorYears[0]
      this.selectedPeriod = this.aviableIndicatorPeriods[0].key
    },
    startAnimation () {
      this.$store.commit('SET_BUSY_STATE', true)
      let index = this.$_.indexOf(this.aviableIndicatorYears, this.selectedYear) + 1
      const duration = 2000

      // const ctx = this
      // this.selectedYear = this.aviableIndicatorYears[index]
      this.isAnimation = true
      this.wmsAnimLayer.redraw()
      this.wmsAnimLayer.on('load', () => {
        if (index < this.aviableIndicatorYears.length && this.isAnimation) {
          this.timer = setTimeout(() => {
            // console.log(this.aviableIndicatorYears[index])
            this.selectedYear = this.aviableIndicatorYears[index]
            index += 1
            this.wmsAnimLayer.redraw()
          }, duration)
        } else {
          this.brakeAnimation()
        }
      })
    },
    brakeAnimation () {
      this.$store.commit('SET_BUSY_STATE', false)
      this.isAnimation = false
      this.wmsAnimLayer.off()
      clearTimeout(this.timer)
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
    aviableIndicatorYears () {
      /**
       * Return aviable periods for selected indicator (1951-1960 for example)
       * from metadata
       * Reading from pre-filtered meta_data_group property
       * return list of objects [periods]
       */
      // let selectedGroupData = allMetadata.groups.find(group => group.name === this.selectedGroup)
      return this.selectedIndicatorData.years
      // return []
    },
    aviableIndicatorPeriods () {
      /**
       * Return aviable months for selected indicator
       * from metadata
       * Reading from pre-filtered meta_data_group property
       * return list of objects [{month_key:month_alias}]
       * sample output [{month_key:month_alias}]
       */
      const month = this.selectedIndicatorData.periods.map(month => {
        switch (month) {
          case 'year':
            return { key: 'year', alias: 'Год', num: 13 }
          case 'jan':
            return { key: 'jan', alias: 'Январь', num: 1 }
          case 'feb':
            return { key: 'feb', alias: 'Февраль', num: 2 }
          case 'mar':
            return { key: 'mar', alias: 'Март', num: 3 }
          case 'apr':
            return { key: 'apr', alias: 'Апрель', num: 4 }
          case 'may':
            return { key: 'may', alias: 'Май', num: 5 }
          case 'jun':
            return { key: 'jun', alias: 'Июнь', num: 6 }
          case 'jul':
            return { key: 'jul', alias: 'Июль', num: 7 }
          case 'aug':
            return { key: 'aug', alias: 'Август', num: 8 }
          case 'sep':
            return { key: 'sep', alias: 'Сентябрь', num: 9 }
          case 'oct':
            return { key: 'oct', alias: 'Октябрь', num: 10 }
          case 'nov':
            return { key: 'nov', alias: 'Ноябрь', num: 11 }
          case 'dec':
            return { key: 'dec', alias: 'Декабрь', num: 12 }
          case 'warm':
            return { key: 'warm', alias: 'Теплый период', num: 14 }
          case 'cold':
            return { key: 'cold', alias: 'Холодный период', num: 15 }
          case 'none':
            return { key: 'none', alias: 'Нет данных', num: 16 }
          default:
            return { key: 'none', alias: 'Ошибка', num: 17 }
        }
      })
      return this.$_.sortBy(month, 'num')
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
    layerFilter () {
      /**
       * Computed URL of selected layer
       * ucc - store on Geoserver !!!MAY CHANGE!!
       */
      // if (this.selectedPeriod === 'None') {
      //   summaryFilter =
      //     `${this.workspaceName}:${this.selectedIndicator}` +
      //     `_${this.selectedYear}`
      // } else {
      //   summaryFilter =
      //     `${this.workspaceName}:${this.selectedIndicator}` +
      //     `_${this.selectedYear}` +
      //     `_${this.selectedPeriod}`
      // }
      const groupFldName = 'group'
      const indicatorFldName = 'indicator'
      const periodFldName = 'year'
      const monthFldName = 'period'

      const summaryFilter = `(${groupFldName}='${this.selectedGroup}') AND (${indicatorFldName}='${this.selectedIndicator}')  AND (${periodFldName}='${this.selectedYear}') AND (${monthFldName}='${this.selectedPeriod}')`

      // this.$emit('changeURL')
      // this.$store.commit(`'${this.commitMethod}'`, urlString)
      // this.$store.commit('SET_MAP_URL', {
      //   mapNum: this.mapNum,
      //   url: urlString
      // })
      return summaryFilter
    },
    wmsAnimLayer () {
      return this.$store.getters.GET_WMS_LAYER
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
      this.selectedYear = this.selectedGroupData.indicators[0].years[0]
      this.selectedPeriod = this.selectedGroupData.indicators[0].periods[0]
    },
    selectedIndicator: function () {
      this.selectedIndicatorData = this.selectedGroupData.indicators.find(indicator =>
        indicator.name === this.selectedIndicator)
      this.selectedYear = this.selectedIndicatorData.years[0]
      this.selectedPeriod = this.selectedIndicatorData.periods[0]
    },
    style: function () {
      this.$store.dispatch('LOAD_LEGEND_JSON', {
        mapNum: this.mapNum,
        styleName: this.style
      })
      this.$store.commit('SET_MAP_STYLE', {
        mapNum: this.mapNum,
        styleName: this.style
      })
      // this.wmsAnimLayer.wmsParams.styles = this.style
      // this.wmsAnimLayer.redraw()
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
    this.selectedYear = allMetadata.groups[0].indicators[0].years[0]
    this.selectedPeriod = allMetadata.groups[0].indicators[0].periods[0]

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
