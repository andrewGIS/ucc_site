<template>
  <div>
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Общая таблица" active>
              Всего - {{this.eventsProps.length}}
            <b-table
              responsive
              striped
              :items="eventsProps"
              :fields="fieldsEventsTable"
              >
            <template v-slot:cell(url)="data">
                <a :href="data.value" target="_blank" >{{data.value}}</a>
            </template>
            <template v-slot:cell(url_video)="data">
                <a :href="data.value" target="_blank" >{{data.value}}</a>
            </template>
            </b-table>
          </b-tab>
          <b-tab title="График">
              <highcharts :options="chartOptionsDamageTypes"></highcharts>
          </b-tab>
        </b-tabs>
      </b-card>
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue'
export default {
  name: 'graphic-builder-stations',
  data () {
    return {
      fieldsEventsTable: [
        {
          key: 'name',
          label: 'Название станции',
          sortable: true
        },
        {
          key: 'region',
          label: 'Субъект РФ',
          sortable: true
        },
        {
          key: 'date',
          label: 'Дата',
          sortable: false
        },
        {
          key: 'event_type',
          label: 'Тип явления',
          sortable: true
        },
        {
          key: 'intensity',
          label: 'Интенсивность',
          sortable: true
        },
        {
          key: 'duration',
          label: 'Длительность',
          sortable: true
        },
        {
          key: 'url',
          label: 'Ссылки',
          sortable: true
        },
        {
          key: 'url_video',
          label: 'Медиа',
          sortable: true
        }
      ],
      tableData: this.$_.map(this.eventsProps, feature => {
        feature.intensity = feature.intensity + feature.unit
      })
    }
  },
  computed: {
    eventsFilterData () {
      return this.$store.getters.GET_EVENTS_DATA
    },
    eventsProps () {
      const features = this.$_.map(this.eventsFilterData.features, feature => feature.properties)
      return this.$_.forEach(features, feature => {
        feature.duration = feature.duration + ' ' + feature.unit_durat
        feature.intensity = feature.intensity + ' ' + feature.unit
        feature.date = this.parseDate(feature.date)
      })
    },
    chartOptionsDamageTypes () {
      const groupByObject = this.$_.groupBy(this.eventsProps, row => row.event_type)
      const dataTbl = this.$_.map(groupByObject, (values, eventTypeName) => {
        return {
          name: eventTypeName, y: values.length
        }
      })
      return {
        chart: {
          type: 'pie'
        },
        title: {
          text: ''
        },
        xAxis: [{
          title: {
            text: 'Типы явлений на выбранных станциях'
          }
        }],
        yAxis: [{
          title: {
            text: 'Количество'
          }
        }],
        series: [{
          data: dataTbl, // sample data
          name: 'Общее число явлений'
        }]
      }
    }
  },
  methods: {
    parseDate (dateString) {
      if (!dateString) {
        return 'Нет данных'
      }
      // 2016-12-19Z
      const splittedDate = dateString.split('-')
      const parseDate = new Date(splittedDate[0],
        splittedDate[1],
        parseInt(splittedDate[2]))
      return parseDate.toLocaleString('ru', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    }
  },
  components: {
    highcharts: Chart
  }
}
</script>

<style>

</style>
