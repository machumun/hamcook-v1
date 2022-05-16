import Vue from "vue";

export const state = () => ({
  recipes: {},
  allMenus: {}
});

export const mutations = {
  UpdateRecipes(state) {
    state.recipes = {};
    const items = JSON.parse(localStorage.getItem("recipes"));
    if (items) {
      Object.assign(state.recipes, items);
    }
    console.log("update recipe was completed");
  },
  UpdateMenus(state) {
    state.allMenus = {};
    const items = JSON.parse(localStorage.getItem("menus"));
    console.log("items", items);
    if (items) {
      Object.keys(items).forEach(key => {
        console.log("YYYY-MM", key);
        console.log("items[key]", items[key]);
        Vue.set(state.allMenus, key, items[key]);
      });
    }
    console.log("allMenus", state.allMenus);
    console.log("update menu was completed");
  }
};

export const actions = {
  UpdateRecipes({ commit }) {
    commit("UpdateRecipes");
  },
  UpdateMenus({ commit }) {
    commit("UpdateMenus");
  }
};

export const getters = {
  recipes: state => state.recipes,
  allMenus: state => state.allMenus,
  isDayMenu: state => {
    return function(day) {
      const date = day.date;
      const month = day.month;
      if (state.allMenus[month]) {
        return state.allMenus[month][date] ? true : false;
      } else {
        return false;
      }
    };
  },
  getDayMenu: state => {
    return function(day, time) {
      const date = day.date;
      const month = day.month;
      // console.log(day, time);
      console.log();
      if (state.allMenus[month]) {
        if (state.allMenus[month][date]) {
          if (state.allMenus[month][date][time]) {
            let recipes = [];
            console.log(day, time, state.allMenus[month][date][time]);
            state.allMenus[month][date][time].forEach(id => {
              const recipe = state.recipes[id.recipe];
              if (recipe) {
                recipes.push(recipe);
              }
            });
            //配列でレシピかえす
            return recipes;
          }
        }
      }
      return [];
    };
  }
};
