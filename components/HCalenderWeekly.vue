<template>
  <div class="calendar">
    <!-- <div class="calendar-title">
      <v-btn dark x-large @click="prevMonth" :color="$hColor.mainBlue">
        前の月
      </v-btn>
      <h2>{{ displayDate }}</h2>
      <v-btn dark x-large @click="nextMonth" :color="$hColor.subPink">
        次の月
      </v-btn>
    </div> -->

    <v-btn class="mb-5" block dark :color="$hColor.mainBlue">
      <v-icon left>
        mdi-arrow-up-bold
      </v-icon>
      前の週
    </v-btn>

    <div class="calendar-list-wrapper">
      <div class="calendar-list-titles">
        <div class="calendar-list-empty"></div>
        <div class="calendar-list-morning">朝</div>
        <div class="calendar-list-lunch">昼</div>
        <div class="calendar-list-dinner">夕</div>
      </div>
    </div>

    <div
      class="calendar-wrapper"
      v-for="(day, index) in currentWeek"
      :key="index"
    >
      <div class="calendar-day-block">
        <div
          class="calendar-youbi"
          :class="{
            'calendar-youbi-sunday': index == 0,
            'calendar-youbi-saturday': index == 6
          }"
        >
          <div>
            {{ `${separatedMonth(day.month)}/${day.date}` }}
            <br />
            {{ youbi(index) }}
          </div>
        </div>
        <div
          class="calendar-card"
          :class="{
            'calendar-card-sunday': index == 0,
            'calendar-card-saturday': index == 6,
            outside: currentMonth !== day.month
          }"
          @click="
            MiSetModalStatus({
              modalName: 'hMenuModal',
              isShow: true
            });
            MiSetSelectedDay(day);
          "
        >
          <v-chip
            close
            v-for="recipe in miDayMenu(day, 'morning')"
            :key="recipe.id"
            class="ma-1"
          >
            <!-- {{ recipe.name }} -->
            {{ recipe.name }}
          </v-chip>
          <!-- </div> -->
        </div>
        <div
          class="calendar-card"
          :class="{
            'calendar-card-sunday': index == 0,
            'calendar-card-saturday': index == 6,
            outside: currentMonth !== day.month
          }"
          @click="
            MiSetModalStatus({
              modalName: 'hMenuModal',
              isShow: true
            });
            MiSetSelectedDay(day);
          "
        >
          <v-chip
            close
            v-for="recipe in miDayMenu(day, 'lunch')"
            :key="recipe.id"
            class="ma-1"
          >
            <!-- {{ recipe.name }} -->
            {{ recipe.name }}
          </v-chip>
          <!-- </div> -->
        </div>
        <div
          class="calendar-card"
          :class="{
            'calendar-card-sunday': index == 0,
            'calendar-card-saturday': index == 6,
            outside: currentMonth !== day.month
          }"
          @click="
            MiSetModalStatus({
              modalName: 'hMenuModal',
              isShow: true
            });
            MiSetSelectedDay(day);
          "
        >
          <v-chip
            close
            v-for="recipe in miDayMenu(day, 'dinner')"
            :key="recipe.id"
            class="ma-1"
          >
            <!-- {{ recipe.name }} -->
            <!-- <h1></h1> -->
            {{ recipe.name }}
          </v-chip>
          <!-- </div> -->
        </div>
      </div>
    </div>
    <!-- <div class="calendar-memo">
      <div>
        MEMO
      </div>
    </div> -->
    <v-btn class="mt-5" block dark :color="$hColor.subPink">
      <v-icon left>
        mdi-arrow-down-bold
      </v-icon>
      次の週
    </v-btn>
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
      todayDate: moment().get("date"),
      weekIndex: -1
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
    getThisWeekIndex() {
      const iterator = this.calendars.entries();
      for (const week of iterator) {
        for (let day of week[1]) {
          if (day.month == this.todayMonth && day.date == this.todayDate) {
            console.log(this.todayMonth, this.todayDate, day.date, day.month);
            return week[0];
          }
        }
      }
      return -1;
    },
    getCurrentWeek() {
      console.log(this.calendars, this.weekIndex);
      return this.calendars[this.weekIndex];
    }
  },

  mounted() {
    const startDate = this.getStartDate();
    const endDate = this.getEndDate();
    const weekNumber = Math.ceil(endDate.diff(startDate, "days") / 7);
    // console.log(weekNumber); //5と表示される
    this.weekIndex = this.getThisWeekIndex();
    // this.currentWeek=;
  },
  computed: {
    currentWeek() {
      console.log("get week");
      return this.getCurrentWeek();
    },
    calendars() {
      return this.getCalendar();
    },

    displayDate() {
      return this.currentDate.format("YYYY[年]M[月]");
    },
    currentMonth() {
      return this.currentDate.format("YYYY-MM");
    },
    //このアプリにおけるmonthはYYYY-MM
    separatedMonth() {
      return function(month) {
        let m = month.split("-")[1];
        return Number(m);
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.outside {
  background: $main-gray !important;
  color: $sub-gray-light !important;
}
$cel-length: v(215);
$cel-length-shorter: v(55);

.calendar {
  &-list {
    &-titles {
      font-size: v(20);
      // min-width: calc(93.33vw + 3px);
      // max-width: calc(93.33vw + 3px);
      width: 100%;
      height: $cel-length-shorter;
      margin: 0 auto;
      display: flex;
      border-left: solid $sub-gray;
      border-top: solid $sub-gray;
      border-bottom: solid $sub-gray;
      // border-right: solid $sub-gray;
      // border: solid $sub-gray;
      font-weight: bold;
      color: $sub-gray;
      text-align: center;
    }
    &-empty {
      min-width: $cel-length-shorter;
      max-width: $cel-length-shorter;
      border-right: solid $sub-gray;
    }
    &-morning,
    &-lunch,
    &-dinner {
      min-width: $cel-length;
      max-width: $cel-length;
      border-right: solid $sub-gray;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  &-list-wrapper {
    width: v(700);
    background: red;
  }
  &-wrapper {
    // width: v(690);
    // min-width: v(700);
    // max-width: v(700);
    margin: 0 auto;
    font-weight: bold;
    color: $sub-gray;
    border-left: solid $sub-gray;
  }
  &-day-block {
    display: flex;
  }
  &-memo {
    width: v(450);
    font-size: v(28);
    background-color: #fff;
    border: solid $sub-gray;
    border-radius: v(10);
    margin-bottom: v(10);
    height: v(300);
    padding-left: v(5);
    position: relative;
    &:hover {
      background: $sub-gray;
      color: white;
      cursor: pointer;
    }
  }

  &-card {
    min-width: $cel-length;
    max-width: $cel-length;

    background-color: #fff;
    height: v(300);
    padding-left: v(5);
    position: relative;
    border-right: solid $sub-gray;
    border-bottom: solid $sub-gray;
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
  &-youbi {
    // width: v(80);
    min-width: $cel-length-shorter;
    max-width: $cel-length-shorter;
    font-size: v(20);
    display: flex;
    justify-content: center; /*左右中央揃え*/
    align-items: center; /*上下中央揃え*/
    border-right: solid $sub-gray;
    text-align: center;
    font-weight: bold;
    color: $sub-gray;
    border-bottom: solid $sub-gray;
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
