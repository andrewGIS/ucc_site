<template>
<div style="font-size:13px">
    <b-container>
      <b-row align-h="center">
      <span style="font-size:14px; font-weight:bold;">Выдающие случаи погодных явлений</span>
      </b-row>
        <b-form-group>
            <b-form-radio-group v-model="selectedEvent">
                <template v-for="(event, index) in eventsDesc">
                  <b-row :key="event.name">
                    <b-col cols="9">
                      <b-form-radio :value="event"> {{event.alias}}</b-form-radio>
                    </b-col>
                    <b-col align-h="center">
                      <b-button :key="index" size="sm"><b-icon-info></b-icon-info></b-button>
                    </b-col>
                  </b-row>
                </template>
            </b-form-radio-group>
        </b-form-group>
    </b-container>
</div>
</template>

<script>
export default {
  name: 'extremeEventsController',
  data () {
    return {
      eventsDesc: [{
        name: 'prec_huge_2018',
        alias: 'Сильные осадки в июле 2019 года',
        info: '',
        dates: ['2019071212_003', '2019071212_006', '2019071212_009', '2019071212_012', '2019071212_015', '2019071212_018', '2019071212_021', '2019071212_024', '2019071212_027', '2019071312_003', '2019071312_006', '2019071312_009', '2019071312_012', '2019071312_015', '2019071312_018', '2019071312_021', '2019071312_024', '2019071312_027', '2019071412_003', '2019071412_006', '2019071412_009', '2019071412_012', '2019071412_015', '2019071412_018', '2019071412_021', '2019071412_024', '2019071412_027', '2019071512_003', '2019071512_006', '2019071512_009', '2019071512_012', '2019071512_015', '2019071512_018', '2019071512_021', '2019071512_024', '2019071512_027'],
        layerName: 'Rasters_Prec_July_2019',
        styleName: 'ucc:Rasters_Prec_July_2019'
      }],
      selectedEvent: {}
    }
  },
  watch: {
    selectedEvent: function () {
      this.$store.commit('SET_EXTREME_VISIBILLITY', true)
      this.$store.commit('SET_LEGEND_VISIBILLITY', true)
      this.$store.commit('SET_EXTREME_SELECTED_EVENT', this.selectedEvent)
      this.$store.dispatch('LOAD_LEGEND_JSON', {
        mapNum: 1,
        styleName: this.selectedEvent.styleName
      })
    }
  }
}
</script>

<style>

</style>
