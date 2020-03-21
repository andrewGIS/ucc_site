<template>
  <div>
      <b-card no-body>
        <b-tabs card>
          <b-tab title="В разрезе станций" active>
            <b-table
              responsive
              striped
              :items="attrs"
              :fields="fieldsWMOTable"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              >
            </b-table>
          </b-tab>
          <b-tab title="Общее число случае по годам">
            <highcharts :options="chartOptions"></highcharts>
          </b-tab>
          <b-tab title="В разрезе субъектов"  :disabled="oneRegion">
            <highcharts :options="chartOptionsRegions"></highcharts>
          </b-tab>
          <b-tab title="В разрезе типов явлений" :disabled="oneEventType">
            <highcharts :options="chartOptionsDamageTypes"></highcharts>
          </b-tab>
        </b-tabs>
      </b-card>
</div>
</template>

<script>
import { Chart } from 'highcharts-vue'
export default {
  data () {
    return {
      sortBy: 'count',
      sortDesc: true,
      fieldsWMOTable: [
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
          key: 'count',
          label: 'Общее число опасных явлений',
          sortable: false
        }
      ]
    }
  },
  computed: {
    oneRegion () {
      const regions = this.$_.uniq(this.$_.map(this.filteredTableData.features, 'properties.region')).length
      console.log(regions)
      return regions === 1
    },
    oneEventType () {
      const eventTypes = this.$_.uniq(this.$_.map(this.filteredTableData.features, 'properties.event_type')).length
      console.log(eventTypes)
      return eventTypes === 1
    },
    filteredGeoJSONData () {
      return this.$store.getters.GET_FILTERED_GEOJSON
    },
    filteredTableData () {
      return this.$store.getters.GET_FILTERED_TABLE_DATA
    },
    attrs () {
      return this.filteredGeoJSONData.map((feature) => { return feature.properties })
    },
    chartOptions () {
      const groupByObject = this.$_.groupBy(this.filteredTableData.features, (row) => row.properties.year)
      const labels = this.$_.keys(groupByObject)
      const dataTbl = this.$_.map(groupByObject, obj => obj.length)
      return {
        title: {
          text: ''
        },
        xAxis: [{
          categories: labels,
          title: {
            text: 'Годы'
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
    },
    chartOptionsRegions () {
      const groupByObject = this.$_.groupBy(this.filteredTableData.features, (row) => row.properties.region)
      const dataTbl = this.$_.map(groupByObject, (values, region) => { return { name: region, y: values.length } })
      return {
        chart: {
          type: 'pie'
        },
        title: {
          text: ''
        },
        xAxis: [{
          title: {
            text: 'Субъекты'
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
    },
    chartOptionsDamageTypes () {
      const groupByObject = this.$_.groupBy(this.filteredTableData.features, (row) => row.properties.event_type)
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
            text: 'Типы явлений'
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
  name: 'graphic-builder',
  components: {
    highcharts: Chart
  }
}
</script>

<style>
.msg{
  background:red;
}
</style>
