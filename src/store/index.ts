import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tagListOut: [{id:0,icon:'canyin',name: '餐饮'}, {id:1,icon:'gouwu',name:'购物'},{id:2,icon:'riyong',name:'日用'},{id:3,icon:'jiaotong',name:'交通'}, {id:4,icon:'shucai',name:'蔬菜'},{id:5,icon:'shuiguo',name:'水果'},{id:6,icon:'lingshi',name:'零食'},{id:7,icon:'yundong',name:'运动'}],
    tagListIn: [{id:0,icon:'--',name:'工资'},{id:1,icon:'jianzhi',name:'兼职'},{id:2,icon:'licai',name:'理财'}]
  },
  mutations: {},
  actions: {},
  modules: {}
});
