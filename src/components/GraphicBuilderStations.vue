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
          key: 'wmo_id',
          label: 'Идентификатор станции',
          sortable: false
        },
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
        }
      ]
    }
  },
  computed: {
    eventsFilterData () {
      return this.$store.getters.GET_EVENTS_DATA
    },
    eventsProps () {
      return this.eventsFilterData.features.map(feature => { return feature.properties })
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
  components: {
    highcharts: Chart
  }
}
</script>

<style>

</style>
