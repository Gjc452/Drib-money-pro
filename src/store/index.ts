import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    tagListOut: [[{id: 0, icon: 'canyin', name: '餐饮'}, {id: 1, icon: 'gouwu', name: '购物'}, {
      id: 2, icon: 'riyong', name: '日用'
    }, {id: 3, icon: 'jiaotong', name: '交通'}, {id: 4, icon: 'shucai', name: '蔬菜'}, {
      id: 5, icon: 'shuiguo', name: '水果'
    }, {id: 6, icon: 'lingshi', name: '零食'}, {id: 7, icon: 'yundong', name: '运动'}], []],
    tagListIn: [[{id: 0, icon: '--', name: '工资'}, {id: 1, icon: 'jianzhi', name: '兼职'}, {
      id: 2, icon: 'licai', name: '理财'
    }], []],
    type: '-'
  } as RootState,
  mutations: {
    setType(state, type: '-' | '+') {
      state.type = type;
    },
    fetchTagList(state) {
      state.tagListOut = JSON.parse(window.localStorage.getItem('tagListOut') || `'${state.tagListOut}'`);
      state.tagListIn = JSON.parse(window.localStorage.getItem('tagListIn') || `'${state.tagListIn}'`);
    },
    saveTagList(state) {
      window.localStorage.setItem('tagListOut', JSON.stringify(state.tagListOut));
      window.localStorage.setItem('tagListIn', JSON.stringify(state.tagListIn));
    },
    deleteTagListOut(state, index: number) {
      state.tagListOut[1].unshift(...state.tagListOut[0].splice(index, 1));
      store.commit('saveTagList');
    },
    deleteTagListIn(state, index: number) {
      state.tagListIn[1].unshift(...state.tagListIn[0].splice(index, 1));
      store.commit('saveTagList');
    },
    addTagListOut(state, index: number) {
      state.tagListOut[0].push(...state.tagListOut[1].splice(index, 1));
      store.commit('saveTagList');
    },
    addTagListIn(state, index: number) {
      state.tagListIn[0].push(...state.tagListIn[1].splice(index, 1));
      store.commit('saveTagList');
    }
  },
  actions: {},
  modules: {}
});
export default store;
