<template>
  <div class="h-menu-modal">
    <div class="h-menu-modal-bg" @click="HideModal"></div>
    <v-card class="h-menu-modal-card">
      {{ menu }}
      <v-card-title>
        {{
          `${selectedMonth.year}年
          ${Number(selectedMonth.month)}月
          ${miSelectedDay.date}日の献立の登録`
        }}
      </v-card-title>
      <!-- <v-form> -->
      <!-- <v-text-field
          class="h-menu-modal-cooktitle"
          label="料理名"
        ></v-text-field> -->
      <v-select
        :color="$hColor.subPink"
        label="時間"
        class="h-menu-modal-select-time"
        :items="times"
        v-model="time"
      >
      </v-select>

      <div v-for="(m, i) in menu" :key="m" class="h-menu-modal-recipe-block">
        <v-select
          :color="$hColor.subPink"
          class="h-menu-modal-select-recipe"
          :label="`料理${i + 1}`"
          v-model="m.recipe"
          :items="recipesCollection"
        ></v-select>
        <v-text-field
          :color="$hColor.subPink"
          label="量"
          class="h-menu-modal-servings"
          v-model="m.servings"
          suffix="人前"
          type="number"
        >
        </v-text-field>
      </div>

      <v-btn
        fab
        dark
        :color="$hColor.mainBlue"
        @click="IncreaseRecipeCollectionNum()"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <!-- </v-form> -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn dark x-large text :color="$hColor.mainGrey" @click="HideModal()">
          キャンセル
        </v-btn>
        <v-btn
          dark
          x-large
          :color="$hColor.subPink"
          class="ml-5"
          @click="
            MiSaveMenu({
              day: miSelectedDay,
              menu: menu,
              time: time
            });
            HideModal();
          "
        >
          保存する
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      menu: [{ recipe: "", servings: 1 }],
      time: "",
      units: ["g", "mm/cc", "個", "大さじ", "小さじ"],
      times: [
        { text: "朝", value: "morning" },
        { text: "昼", value: "lunch" },
        { text: "夜", value: "dinner" }
      ]
    };
  },
  methods: {
    PressSaveBtn() {},
    HideModal() {
      this.MiSetModalStatus({ modalName: "hMenuModal", isShow: false });
    },
    IncreaseRecipeCollectionNum() {
      this.menu.push({ recipe: "", servings: 1 });
    }
  },
  computed: {
    selectedMonth() {
      let yearAndMonth = this.miSelectedDay.month.split("-");
      return { month: yearAndMonth[1], year: yearAndMonth[0] };
    },
    recipesCollection() {
      let recipesCollection = [];
      console.log(this.miRecipes);
      Object.keys(this.miRecipes).forEach(key => {
        recipesCollection.push({ text: this.miRecipes[key].name, value: key });
      });
      return recipesCollection;
    }
  },
  created() {
    // this.materialsFormData.push({ name: "", quantity: "", unit: "" });
  }
};
</script>

<style lang="scss" scoped>
.h-menu-modal {
  position: fixed;
  // color: $sub-gray;
  z-index: 5;

  &-bg {
    width: 100vw;
    height: 100vh;
    background: #000;
    opacity: 0.8;
  }
  &-card {
    position: fixed;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    width: v(690);
    height: 80vh;
    padding: v(40);
    background: #fff;
  }

  &-row {
    display: flex;
    justify-content: space-between;
  }
  // &-materialname,
  // &-materialquantity {
  // }
  &-recipe-block {
    display: flex;
    justify-content: space-between;
  }
  &-select-time {
    width: v(100);
  }
  &-select-recipe {
    width: v(200) !important;
  }
  &-servings {
    width: v(80) !important;
  }

  &-materialname {
    width: v(250);
    max-width: v(250);
  }
  &-materialquantity {
    width: v(100);
    max-width: v(150);
  }
}
</style>
