//store
import Vue from "vue";

import { HModal, HMenuModal } from "~/lib/class.js";

console.log("store is ready");

export const state = () => ({
  selectedDay: { month: "", date: "" },
  hMenuModal: new HModal(),
  hRecipeModal: new HModal()
});

export const getters = {
  getModalState: state => {
    return function(modalName) {
      return state[modalName];
    };
  },
  getState: state => state,
  getModalIsShowState: state => {
    return function(modalName) {
      return state[modalName].isShow;
    };
  },
  getSelectedDay: state => {
    return state.selectedDay;
  }
};

export const mutations = {
  //名前を指定したモーダルの見える見えないのfunction
  SetModalStatus(state, { modalName, isShow }) {
    // console.log("set", modalName, selectedDay, isShow);
    if (typeof isShow !== "undefined" && isShow !== null) {
      state[modalName].SetShowStatus(isShow);
    }
  },
  //カレンダーを押したときに
  SetSelectedDay(state, { month, date }) {
    state.selectedDay.month = month;
    state.selectedDay.date = date;
  }
};

//mutation発火
export const actions = {
  SetModalStatus({ commit }, payload) {
    commit("SetModalStatus", payload);
  },
  SetSelectedDay({ commit }, payload) {
    commit("SetSelectedDay", payload);
  }
};
