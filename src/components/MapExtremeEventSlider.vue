<template>
  <l-control position="bottomleft" v-if="(visible===true)&&(isSelectedSomething===true)">
      <div style="margin-right:75px;">
        <b-container fluid>
          <b-row align-v="center">
          <b-button size="sm" @click="startExtremeAnim" :disabled="isAnimation"><b-icon-play/></b-button>
          <b-button size="sm" @click="brakeAnimation" :disabled="!isAnimation"><b-icon-stop></b-icon-stop></b-button>
          <span v-if="isFullScreen" class="selectedDate">{{this.parsedDate}}</span>
            <div v-if="isFullScreen">
            <template v-for="date in aviableDates">
              <input :disabled="isAnimation" type="radio" name="dates" :key="date" :value="date" v-model="selectedDate">
            </template>
            </div>

          <!-- control when not full display -->
          <div v-if="!isFullScreen" >
            <b-form inline>
                <b-button size="sm" @click="prevDate" :disabled="isFirstDate||isAnimation">
                  <b-icon icon="arrow-bar-left"></b-icon> Предыдущая дата
                </b-button>
                <b-form-select style="max-width:160px;" size="sm" v-model="selectedDate" :options="datesOptions"></b-form-select>
                <!-- {{this.parsedDate}} -->
                <b-button size="sm" @click="nextDate" :disabled="isLastDate||isAnimation">
                  Следующая дата<b-icon icon="arrow-bar-right"></b-icon>
                </b-button>
                </b-form>
          </div>

          <!-- <b-form-group label="Individual radios">
            <b-form-radio-group size="sm">
            <template v-for="date in aviableDates">
              <b-form-radio size="sm" :key="date" :value="date"></b-form-radio>
            </template>
            </b-form-radio-group>
          </b-form-group> -->
          </b-row>
         </b-container>
    </div>
  </l-control>
</template>

<script>
import { LControl } from 'vue2-leaflet'
export default {
  data () {
    return {
      selectedDate: '',
      isAnimation: false,
      timer: '',
      windowWidth: 0
    }
  },
  name: 'slider',
  components: { LControl },
  methods: {
    startExtremeAnim () {
      let index = this.$_.indexOf(this.selectedDate, this.aviableDates) + 1
      const duration = 500

      this.isAnimation = true
      this.wmsAnimLayer.redraw()
      this.wmsAnimLayer.on('load', () => {
        if (index < this.aviableDates.length && this.isAnimation) {
          this.timer = setTimeout(() => {
            // console.log(this.aviableIndicatorYears[index])
            this.selectedDate = this.aviableDates[index]
            index += 1
            this.wmsAnimLayer.redraw()
          }, duration)
        } else {
          this.brakeAnimation()
        }
      })
    },
    brakeAnimation () {
      this.isAnimation = false
      this.wmsAnimLayer.off()
      clearTimeout(this.timer)
    },
    onResize () {
      // console.log(window.innerWidth)
      // console.log(screen.width)
      this.windowWidth = window.innerWidth
    },
    nextDate () {
      this.selectedDate = this.aviableDates[this.aviableDates.indexOf(this.selectedDate) + 1]
    },
    prevDate () {
      this.selectedDate = this.aviableDates[this.aviableDates.indexOf(this.selectedDate) - 1]
    },
    parseDate (date) {
      const parseDate = new Date(parseInt(date.substring(0, 4)),
        parseInt(date.substring(4, 6)) - 1,
        parseInt(date.substring(6, 8)),
        parseInt(date.split('_')[1]))
      return parseDate.toLocaleString('ru', {
        day: '2-digit',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      })
    }
  },
  computed: {
    visible () {
      return this.$store.getters.GET_EXTREME_VISIBILLITY
    },
    aviableDates () {
      return this.selectedEvent.dates
    },
    selectedEvent () {
      return this.$store.getters.GET_EXTREME_SELECTED_EVENT
    },
    isSelectedSomething () {
      return !this.$_.isEmpty(this.selectedEvent)
    },
    wmsAnimLayer () {
      return this.$store.getters.GET_EXTREME_WMS
    },
    parsedDate () {
      // 2019071512_018
      if (this.selectedDate) {
        const parseDate = new Date(parseInt(this.selectedDate.substring(0, 4)),
          parseInt(this.selectedDate.substring(4, 6)) - 1,
          parseInt(this.selectedDate.substring(6, 8)),
          parseInt(this.selectedDate.split('_')[1]))
        return parseDate.toLocaleString('ru', {
          day: '2-digit',
          month: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        })
      } else {
        return 'Нет данных'
      }
    },
    isFullScreen () {
      return this.windowWidth === screen.width && screen.width > 1000
    },
    isFirstDate () {
      return this.aviableDates.indexOf(this.selectedDate) === 0
    },
    isLastDate () {
      return this.aviableDates.indexOf(this.selectedDate) === this.aviableDates.length - 1
    },
    datesOptions () {
      return this.$_.map(this.aviableDates, date => {
        return {
          value: date,
          text: this.parseDate(date)
        }
      })
    }
  },
  watch: {
    aviableDates: function () {
      this.selectedDate = this.aviableDates[0]
    },
    selectedDate: function () {
      this.$store.commit('SET_EXTREME_SELECTED_DATE', this.selectedDate)
    },
    windowHeight (newHeight, oldHeight) {
      console.log(`it changed to ${newHeight} from ${oldHeight}`)
    }
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  }
}
</script>

<style>
.selectedDate {
  padding-left:15px;
  padding-right:15px;
  font-weight:bold;
  background: white;
  border-radius: 0.25rem;
}
</style>
