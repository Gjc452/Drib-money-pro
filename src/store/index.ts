import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    tags: [{title: '娱乐', icons: []}, {title: '饮食', icons: []}, {title: '医疗', icons: []}, {
      title: '学习',
      icons: []
    }, {title: '购物', icons: []}
      , {title: '家居', icons: []}, {title: '办公', icons: []}, {title: '收入', icons: []}],
    tagListOut: [[{id: 0, icon: 'icon-canyin', name: '餐饮'}, {id: 1, icon: 'icon-gouwu', name: '购物'}, {
      id: 2, icon: 'icon-riyong', name: '日用'
    }, {id: 3, icon: 'icon-jiaotong', name: '交通'}, {id: 4, icon: 'icon-shucai', name: '蔬菜'}, {
      id: 5, icon: 'icon-shuiguo', name: '水果'
    }, {id: 6, icon: 'icon-lingshi', name: '零食'}, {id: 7, icon: 'icon-yundong', name: '运动'}], []],
    tagListIn: [[{id: 0, icon: 'icon---', name: '工资'}, {id: 1, icon: 'icon-jianzhi', name: '兼职'}, {
      id: 2, icon: 'icon-licai', name: '理财'
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
    deleteTagList(state, payload: { type: string; index: number }) {
      const {type, index} = payload;
      type === '-' ? state.tagListOut[1].unshift(...state.tagListOut[0].splice(index, 1)) : state.tagListIn[1].unshift(...state.tagListIn[0].splice(index, 1));
      store.commit('saveTagList');
    },
    addTagList(state, payload: { type: string; index: number }) {
      const {type, index} = payload;
      type === '-' ? state.tagListOut[0].push(...state.tagListOut[1].splice(index, 1)) : state.tagListIn[0].push(...state.tagListIn[1].splice(index, 1));
      store.commit('saveTagList');
    }
  },
  actions: {},
  modules: {}
});
export default store;
