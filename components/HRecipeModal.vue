<template>
  <div class="h-recipe-modal">
    <div class="h-recipe-modal-bg" @click="HideModal"></div>
    <v-card class="h-recipe-modal-card">
      <!-- {{ materialsFormData }} -->
      <v-card-title>
        <!-- {{
          `${selectedMonth.year}年
          ${Number(selectedMonth.month)}月
          ${selectedDay.date}日の献立の登録`
        }} -->
        料理の登録
      </v-card-title>
      <v-form>
        <v-text-field
          class="h-recipe-modal-cooktitle"
          label="料理名"
          v-model="recipeName"
        ></v-text-field>
        <v-text-field
          class="h-recipe-modal-cooktitle"
          label="レシピURL"
          v-model="recipeURL"
        ></v-text-field>
        <div
          v-for="(fd, index) in materialsFormData"
          :key="String(fd) + index"
          class="h-recipe-modal-row"
        >
          <!-- {{ index }}{{ fd }} -->
          <v-text-field
            class="h-recipe-modal-materialname"
            label="素材名"
            v-model="fd.name"
          ></v-text-field>
          <v-text-field
            class="h-recipe-modal-materialquantity"
            label="分量"
            v-model="fd.quantity"
            type="number"
          ></v-text-field>
          <v-select
            class="h-recipe-modal-materialquantity"
            label="単位"
            v-model="fd.unit"
            :items="units"
          ></v-select>
        </div>
        <v-btn fab dark :color="$hColor.mainBlue" @click="AddMaterial()">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-form>
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
          @click="PressSaveBtn()"
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
      recipeName: "",
      recipeURL: "",
      materialNum: 1,
      materialsFormData: [],
      units: ["g", "mm/cc", "個", "大さじ", "小さじ"]
    };
  },
  methods: {
    PressSaveBtn() {
      this.MiSaveRecipe({
        name: this.recipeName,
        url: this.recipeURL,
        materials: this.materialsFormData
      });
      this.HideModal();
    },
    HideModal() {
      this.MiSetModalStatus({ modalName: "hRecipeModal", isShow: false });
    },
    AddMaterial() {
      this.materialsFormData.push({ name: "", quantity: "", unit: "" });
    }
  },
  computed: {
    selectedMonth() {
      let yearAndMonth = this.selectedDay.month.split("-");
      return { month: yearAndMonth[1], year: yearAndMonth[0] };
    }
  },
  created() {
    this.materialsFormData.push({ name: "", quantity: "", unit: "" });
  }
};
</script>

<style lang="scss" scoped>
.h-recipe-modal {
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
