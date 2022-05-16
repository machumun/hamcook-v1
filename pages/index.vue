<template>
  <div class="ham">
    <!-- <div class="color-sample-c">main-pink</div>
    <div class="color-sample-a">ham-beige</div>
    <div class="color-sample-b">sub-beige</div> -->
    <!-- {{ $hColor.mainPink }} -->
    <v-btn @click="MiDeleteAllStorage">すべてりせっと</v-btn>

    <v-col class="monthly-or-weekly">
      <v-btn
        :color="$hColor.subGrey"
        plain
        dark
        @click="calenderType = 'monthly'"
        >マンスリー</v-btn
      >
      <v-btn
        :color="$hColor.subGrey"
        plain
        dark
        @click="calenderType = 'weekly'"
      >
        ウィークリー
      </v-btn>
    </v-col>

    <HCalender v-if="calenderType == 'monthly'"></HCalender>
    <HCalenderWeekly v-if="calenderType == 'weekly'"></HCalenderWeekly>

    <v-btn
      dark
      block
      x-large
      :color="$hColor.subPink"
      class="mt-10"
      @click="
        MiSetModalStatus({
          modalName: 'hRecipeModal',
          isShow: true
        })
      "
    >
      <v-icon dark class="mr-5">
        mdi-cloud-upload
      </v-icon>
      新規レシピの登録
    </v-btn>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      calenderType: "monthly"
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.ham {
  // background: $ham-beige;
  padding-top: v(30);
  width: v(700);
  margin: 0 auto;
  padding-bottom: v(200);
}
// .monthly-or-weekly {
//   width: v(690);
// }
.color-sample-a {
  height: 20px;
  background: $ham-beige;
}
.color-sample-b {
  height: 20px;
  background: $sub-beige;
}
.color-sample-c {
  height: 20px;
  background: $main-pink;
}
</style>
