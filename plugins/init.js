import Vue from "vue";
import { HModalFunctions, StorageFunctions } from "~/mixin/utils.js";
// import Calender from '~/components/Calender.vue'

Vue.prototype.$sp = window.innerWidth <= 750;
Vue.prototype.$hColor = {
  mainPink: "#FFAFAF",
  subPink: "#FF9999",
  mainBlue: "#A3E3E5",
  mainGrey: "#d8dce0",
  subGrey: "#9e9790"
};

Vue.prototype.$storageKeeper = {};
Vue.mixin(HModalFunctions);
Vue.mixin(StorageFunctions);
// Vue.component('HCalender', Calender)
