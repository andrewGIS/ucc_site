<template>
<div role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-1 variant="info">Растровые данные</b-button>
      </b-card-header>
      <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel" @input="toggleWMS">
        <b-card-body>
          <rastersController></rastersController>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-3 variant="info">Общая статистика</b-button>
      </b-card-header>
      <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel" @input="toggleGeoJson">
        <b-card-body>
          <layerControl></layerControl>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-4 variant="info">Статистика по станции</b-button>
      </b-card-header>
      <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          "Выберите станцию"
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-2 variant="info">Отдельные случаи опасных явлений</b-button>
      </b-card-header>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel" >
        <b-card-body>
          <b-card-text></b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>

  </div>
</template>

<script>

// dom.watch()
import layerControl from './SidebarLayerControl'
import rastersController from './SidebarRasterController'
// import RasterPicker from './RasterPicker'

export default {
  props: {
    sidebarWidth: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      text: '111'
    }
  },
  name: 'my-sidebar-menu',
  methods: {
    toggleGeoJson (visible) {
      // console.log(visible)
      this.$store.commit('SET_GEOJSON_VISIBILITY', visible)
      // this.$emit('toggleSidebar', this.$refs._sidebar.sidebarWidth)
      // this.$store.commit('toggleSideBarStatus')
      // console.log(this.width)
      // console.log(this.$refs.sidebar.sidebarWidth)
    },
    toggleWMS (visible) {
      // console.log(visible)
      this.$store.commit('SET_WMS_VISIBILITY', visible)
      // this.$emit('toggleSidebar', this.$refs._sidebar.sidebarWidth)
      // this.$store.commit('toggleSideBarStatus')
      // console.log(this.width)
      // console.log(this.$refs.sidebar.sidebarWidth)
    }
  },
  components: {
    layerControl, rastersController
  }
  // LayerController
  // RasterPicker

}
</script>
