import Vue from "vue";
import { mapActions, mapGetters } from "vuex";

function GetRandomStr(length) {
  const LENGTH = length; //生成したい文字列の長さ
  const SOURCE =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; //元になる文字
  let result = "";

  for (let i = 0; i < LENGTH; i++) {
    result += SOURCE[Math.floor(Math.random() * SOURCE.length)];
  }

  return new Date().getTime().toString(16) + result;
}

//名前衝突を避けるため、mixinの関数はmiを接頭辞にする
export const HModalFunctions = {
  methods: {
    ...mapActions({
      MiSetModalStatus: "modal/SetModalStatus",
      MiSetSelectedDay: "modal/SetSelectedDay"
    })
  },
  computed: {
    ...mapGetters({
      miSelectedDay: "modal/getSelectedDay",
      miModalIsShowState: "modal/getModalIsShowState"
    })
  }
};

export const StorageFunctions = {
  methods: {
    ...mapActions({
      MiUpdateRecipes: "storage/UpdateRecipes",
      MiUpdateMenus: "storage/UpdateMenus"
    }),
    MiSaveRecipe(recipe) {
      // const sample = {'recipes':[],'menus':{'2022-01':{name:"味噌漬け",materials:[]}}}
      let recipeDatas = JSON.parse(localStorage.getItem("recipes"));
      if (!recipeDatas) {
        recipeDatas = {};
      }
      //レシピにユニークなIDをつける
      let id = GetRandomStr(6);
      recipeDatas[id] = recipe;

      localStorage.setItem("recipes", JSON.stringify(recipeDatas));
      // console.log(localStorage);
      this.MiUpdateRecipes();
    },
    MiSaveMenu({ day, menu, time }) {
      const month = day.month;
      const date = day.date;
      // console.log("menu", menu);
      let allMenus = JSON.parse(localStorage.getItem("menus"));
      // console.log("menus2", allMenus);
      if (!allMenus) {
        allMenus = {};
      }
      // console.log("menus3", allMenus);
      if (!allMenus[month]) {
        allMenus[month] = {};
        // Vue.set(allMenus, month, {});
      }
      // console.log("menus4", allMenus);
      if (!allMenus[month][date]) {
        allMenus[month][date] = {};
      }
      console.log("menu", menu);
      allMenus[month][date][time] = menu;
      localStorage.setItem("menus", JSON.stringify(allMenus));
      this.MiUpdateMenus();
    },
    MiDeleteAllStorage() {
      localStorage.clear();
      this.MiUpdateRecipes();
      this.MiUpdateMenus();
    }
  },
  computed: {
    ...mapGetters({
      miRecipes: "storage/recipes",
      miAllMenus: "storage/allMenus",
      miIsDayMenu: "storage/isDayMenu",
      miDayMenu: "storage/getDayMenu"
    }),
    miMenus() {
      return JSON.parse(localStorage.getItem("recipes"));
    }
  }
};
