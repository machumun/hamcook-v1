<template>
  <div class="calendar">
    <div class="calendar-title">
      <!-- <div class="calendar-btn"  @click="prevMonth"></div> -->
      <!-- <h-btn :backgroundColor="$hColor.subPink"> {{ $hColor.mainPink }}</h-btn> -->
      <v-btn dark x-large @click="prevMonth" :color="$hColor.mainBlue">
        前の月
      </v-btn>
      <h2>{{ displayDate }}</h2>
      <v-btn dark x-large @click="nextMonth" :color="$hColor.subPink">
        次の月
      </v-btn>
    </div>
    <!-- {{ modalState("h_menu_modal") }} -->
    <div class="calendar-weekly">
      <div
        class="calendar-youbi"
        :class="{
          'calendar-youbi-sunday': n == 1,
          'calendar-youbi-saturday': n == 7
        }"
        v-for="n in 7"
        :key="n"
      >
        {{ youbi(n - 1) }}
      </div>
    </div>
    <div class="calendar-wrapper2">
      <div
        class="calendar-wrapper"
        v-for="(week, index) in calendars"
        :key="index"
      >
        <div
          class="calendar-card"
          :class="{
            'calendar-card-sunday': index == 0,
            'calendar-card-saturday': index == 6,
            'calendar-card-today': isToday(day),
            outside: currentMonth !== day.month
          }"
          v-for="(day, index) in week"
          :key="index"
          @click="
            MiSetModalStatus({
              modalName: 'hMenuModal',
              isShow: true
            });
            MiSetSelectedDay(day);
          "
        >
          <!-- {{ isToday(day) }} -->
          <div>{{ day.date }}</div>
          <v-icon
            class="calendar-card-check"
            :color="$hColor.mainPink"
            x-large
            v-if="miIsDayMenu(day)"
          >
            mdi-check-outline
          </v-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {},
  data() {
    return {
      currentDate: moment(),
      selectedDate: {},
      todayMonth: moment().format("YYYY-MM"),
      todayDate: moment().get("date")
    };
  },
  methods: {
    youbi(dayIndex) {
      const week = ["日", "月", "火", "水", "木", "金", "土"];
      return week[dayIndex];
    },
    nextMonth() {
      this.currentDate = moment(this.currentDate).add(1, "month");
    },
    prevMonth() {
      this.currentDate = moment(this.currentDate).subtract(1, "month");
    },
    getStartDate() {
      let date = moment(this.currentDate);
      date.startOf("month");
      const youbiNum = date.day();
      return date.subtract(youbiNum, "days");
    },
    getEndDate() {
      let date = moment(this.currentDate);
      date.endOf("month");
      const youbiNum = date.day();
      return date.add(6 - youbiNum, "days");
    },
    getCalendar() {
      let startDate = this.getStartDate();
      const endDate = this.getEndDate();
      const weekNumber = Math.ceil(endDate.diff(startDate, "days") / 7);

      let calendars = [];

      for (let week = 0; week < weekNumber; week++) {
        let weekRow = [];
        for (let day = 0; day < 7; day++) {
          weekRow.push({
            date: startDate.get("date"),
            month: startDate.format("YYYY-MM")
          });
          startDate.add(1, "days");
        }
        calendars.push(weekRow);
      }
      return calendars;
    },
    isToday({ date, month }) {
      return this.todayMonth == month && this.todayDate == date;
    }
  },

  mounted() {
    const startDate = this.getStartDate();
    const endDate = this.getEndDate();
    const weekNumber = Math.ceil(endDate.diff(startDate, "days") / 7);
    console.log(weekNumber); //5と表示される
  },
  computed: {
    calendars() {
      return this.getCalendar();
    },
    displayDate() {
      return this.currentDate.format("YYYY[年]M[月]");
    },
    currentMonth() {
      return this.currentDate.format("YYYY-MM");
    }
  }
};
</script>

<style lang="scss" scoped>
.outside {
  background: $main-gray !important;
  color: $sub-gray-light !important;
}
.calendar {
  &-title {
    color: $sub-gray;
    width: v(690);
    margin: 0 auto;
    padding-top: v(40);
    padding-bottom: v(40);
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  &-wrapper {
    display: flex;
    border-left: solid $sub-gray;
    // border-top: 1px solid gray;
    justify-content: center;
  }
  &-wrapper2,
  &-weekly {
    width: v(690);
    margin: 0 auto;
    font-weight: bold;
    color: $sub-gray;
  }
  &-weekly {
    display: flex;
    border-left: solid $sub-gray;
    border-top: solid $sub-gray;
  }

  &-card,
  &-youbi {
    width: v(100);
    // color: #000;
    font-size: v(26);
    background-color: #fff;
    // flex: 1;
    border-right: solid $sub-gray;
    border-bottom: solid $sub-gray;
  }
  &-card {
    height: v(100);
    padding-left: v(5);
    position: relative;
    &:hover {
      background: $main-pink;
      color: white;
      cursor: pointer;
    }
    &-check {
      position: absolute !important;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  &-card-sunday {
    color: $sub-pink;
  }
  &-card-saturday {
    color: $main-blue;
  }
  &-card-today {
    background-color: $sub-pink;
    color: white !important;
  }
  &-youbi {
    text-align: center;
    font-weight: bold;
    color: $sub-gray;
  }
  &-youbi-sunday {
    background: $sub-pink;
    color: white;
  }
  &-youbi-saturday {
    background: $main-blue;
    color: white;
  }
  &-selected {
    color: #fff;
    background-color: $sub-pink;
  }
}
</style>
