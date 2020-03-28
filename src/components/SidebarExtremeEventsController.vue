<template>
<div>
    <b-container>
      <b-row align-h="center">
      <span style="font-weight:bold;">Выдающие случаи погодных явлений</span>
      </b-row>
        <b-form-group>
            <b-form-radio-group v-model="selectedEvent">
                <template v-for="(event, index) in eventsDesc">
                  <b-row :key="event.name">
                    <b-col cols="9">
                      <b-form-radio :value="event"> {{event.alias}}</b-form-radio>
                    </b-col>
                    <b-col align-h="center">
                      <b-button :key="index" size="sm" @click="getInfo(event.name)"><b-icon-info></b-icon-info></b-button>
                    </b-col>
                  </b-row>
                </template>
            </b-form-radio-group>
        </b-form-group>
    </b-container>
    <b-modal size="lg" id="eventInfo" title="Информация о явлении" ok-only>
        <b-form-textarea plaintext :value="infoText"></b-form-textarea>
      </b-modal>
</div>
</template>

<script>
export default {
  name: 'extremeEventsController',
  data () {
    return {
      eventsDesc: [
        {
          name: 'prec_huge_2018',
          alias: 'Сильные осадки в июле 2019 года',
          info: 'Сильные осадки в июле 2019. Показаны данные по срокам измерения',
          // in correct order
          dates: ['20190712_003', '20190712_006', '20190712_009', '20190712_012', '20190712_015', '20190712_018', '20190712_021', '20190712_024', '20190712_027', '20190713_003', '20190713_006', '20190713_009', '20190713_012', '20190713_015', '20190713_018', '20190713_021', '20190713_024', '20190713_027', '20190714_003', '20190714_006', '20190714_009', '20190714_012', '20190714_015', '20190714_018', '20190714_021', '20190714_024', '20190714_027', '20190715_003', '20190715_006', '20190715_009', '20190715_012', '20190715_015', '20190715_018', '20190715_021', '20190715_024', '20190715_027'],
          layers: ['ucc:Rasters_Prec_July_2019'],
          legendStylename: 'ucc:Rasters_Prec_July_2019',
          fieldsFilter: ['location']
        },
        {
          name: 'strong_forest_2009',
          alias: 'Сильные морозы в декабре 2009 года',
          info: 'Сильные морозы в декабре 2009 года. Показаны изобары и температура воздуха',
          // in correct order
          dates: ['20091211_00', '20091211_06', '20091211_12', '20091211_18', '20091212_00', '20091212_06', '20091212_12', '20091212_18', '20091213_00', '20091213_06', '20091213_12', '20091213_18', '20091214_00', '20091214_06', '20091214_12', '20091214_18', '20091215_00', '20091215_06', '20091215_12', '20091215_18', '20091216_00', '20091216_06', '20091216_12', '20091216_18', '20091217_00', '20091217_06', '20091217_12', '20091217_18', '20091218_00', '20091218_06', '20091218_12', '20091218_18', '20091219_00', '20091219_06', '20091219_12', '20091219_18', '20091220_00', '20091220_06', '20091220_12', '20091220_18', '20091221_00', '20091221_06', '20091221_12', '20091221_18', '20091222_00', '20091222_06', '20091222_12', '20091222_18'],
          layers: ['ucc:Rasters_T_December_2019', 'ucc:Lines_T_December_2019'],
          legendStylename: 'ucc:Rasters_T_December_2009',
          fieldsFilter: ['location', 'date']
        }
      ],
      selectedEvent: {},
      infoText: ''
    }
  },
  methods: {
    getInfo (e) {
      this.infoText = this.eventsDesc.filter(event => event.name === e)[0].info
      this.$bvModal.show('eventInfo')
    }
  },
  watch: {
    selectedEvent: function () {
      this.$store.commit('SET_EXTREME_VISIBILLITY', true)
      this.$store.commit('SET_LEGEND_VISIBILLITY', true)
      this.$store.commit('SET_EXTREME_SELECTED_EVENT', this.selectedEvent)
      this.$store.dispatch('LOAD_LEGEND_JSON', {
        mapNum: 1,
        styleName: this.selectedEvent.legendStylename
      })
    }
  }
}
</script>

<style>

</style>
