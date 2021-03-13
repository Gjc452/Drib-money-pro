import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    tags: [{
      title: '娱乐',
      icons: ['icon-youlechang', 'icon-shejian', 'icon-BowlingSpare', 'icon-Skiing', 'icon-Trekking', 'icon-toukui', 'icon-shoubing', 'icon-pingpang', 'icon--puke', 'icon--chouma', 'icon-guanying', 'icon-xiangqi', 'icon-huabing', 'icon-youyong', 'icon-bangqiu', 'icon-yumaoqiu', 'icon-fanchuan', 'icon-lanqiukuang', 'icon-taiqiu']
    },
      {
        title: '饮食',
        icons: ['icon-mifan', 'icon-hanbao', 'icon-jiubei', 'icon-xuegao', 'icon-kafei', 'icon-huoguo', 'icon-dangao', 'icon-dangao1', 'icon-shaokao', 'icon-shuichanhaixian', 'icon-yinliao-naicha', 'icon-kaoji', 'icon-shousi', 'icon-noodle', 'icon-bingqilin', 'icon-pingguo', 'icon-xiangjiao', 'icon-pijiu', 'icon-jitui']
      },
      {
        title: '医疗',
        icons: ['icon-yisheng', 'icon-tingzhenqi', 'icon-yao', 'icon-CTjiancha', 'icon-zhuyuan', 'icon-yunfu', 'icon-huaban', 'icon-lunyi', 'icon-yachi', 'icon-diandi']
      }, {
        title: '学习',
        icons: ['icon-gangqin', 'icon-xianweijing', 'icon-huihua', 'icon-shangke', 'icon-boshimao', 'icon-wenju', 'icon-jita', 'icon-shuji', 'icon-xuexiao', 'icon-jisuanqi']
      }, {
        title: '购物',
        icons: ['icon-erji', 'icon-pidai', 'icon-gaogenxie', 'icon-shuihu', 'icon-zhiniaoku', 'icon-maozi', 'icon-xiangji', 'icon-lingdai', 'icon-qunzi', 'icon-penzai', 'icon-jiezhi', 'icon-computer', 'icon-shoubiao', 'icon-kuzi', 'icon-xiaodao', 'icon-neiyi', 'icon-xianglian', 'icon-xiezi', 'icon-ximiannai', 'icon-Bag', 'icon-yanjing', 'icon-gouwuche', 'icon-neiku', 'icon-xianhua', 'icon-huazhuangpin', 'icon-hudiejie']
      }
      , {
        title: '家居',
        icons: ['icon-bingxiang', 'icon-shafa', 'icon-dengpao', 'icon-dianshi', 'icon-yundou', 'icon-pentou', 'icon-pentou', 'icon-kongtiao', 'icon-linyu', 'icon-xiyiji', 'icon-chuifengji', 'icon-chuang', 'icon-dianfei', 'icon-yigui', 'icon-weixiu', 'icon-cheliang']
      },
      {
        title: '交通',
        icons: ['icon-paoche1', 'icon-danche', 'icon-jiayou', 'icon-huoche', 'icon-gonglu', 'icon-xiaohuoche', 'icon-fangche', 'icon-feiji', 'icon-lunchuan', 'icon-taxi', 'icon-tingche', 'icon-diandong', 'icon-motuoche']
      }, {
        title: '收入',
        icons: ['icon-panjue', 'icon-jijin', 'icon-qian', 'icon-guquan', 'icon-jiangli', 'icon-qianbao', 'icon-saoma', 'icon-cunqian', 'icon-hongbao', 'icon-shouru', 'icon-xianjin']
      }],
    tagListOut: [[{icon: 'icon-canyin', name: '餐饮'}, {icon: 'icon-gouwu', name: '购物'}, {
      icon: 'icon-riyong',
      name: '日用'
    }, {icon: 'icon-jiaotong', name: '交通'}, {icon: 'icon-shucai', name: '蔬菜'}, {
      icon: 'icon-shuiguo', name: '水果'
    }, {icon: 'icon-lingshi', name: '零食'}, {icon: 'icon-yundong', name: '运动'}, {
      icon: 'icon-fushi',
      name: '服饰'
    }, {icon: 'icon-zhufang', name: '住房'}, {icon: 'icon-jujia', name: '居家'}, {
      icon: 'icon-haizi',
      name: '孩子'
    }, {icon: 'icon-changbei', name: '长辈'}, {icon: 'icon-shejiao', name: '社交'}, {
      icon: 'icon-lvxing',
      name: '旅行'
    }, {icon: 'icon-yanjiu', name: '烟酒'}, {icon: 'icon-shuma', name: '数码'}, {
      icon: 'icon-qiche',
      name: '汽车'
    }, {icon: 'icon-33485', name: '医疗'}
      , {icon: 'icon-xuexi', name: '书籍'}, {icon: 'icon-maozi', name: '学习'}, {
        icon: 'icon-chongwu',
        name: '宠物'
      }, {icon: 'icon-liwu', name: '礼物'}, {icon: 'icon-juanzeng', name: '捐赠'}, {
        icon: 'icon-weixiu',
        name: '维修'
      }, {icon: 'icon-caipiao', name: '彩票'}, {icon: 'icon-jiaren', name: '亲友'}, {
        icon: 'icon-kuaidi',
        name: '快递'
      }, {icon: 'icon-lijin', name: '礼金'}, {icon: 'icon-bangong', name: '办公'}, {
        icon: 'icon-tongxun',
        name: '通讯'
      }, {icon: 'icon-meirong', name: '美容'}, {icon: 'icon-yule', name: '娱乐'}], []],
    tagListIn: [[{icon: 'icon-gongzi', name: '工资'}, {icon: 'icon-jianzhi', name: '兼职'}, {
      icon: 'icon-licai',
      name: '理财'
    }, {icon: 'icon-lijin', name: '礼金'}, {icon: 'icon-qitashouru', name: '其他'}], []],
    type: '-',
    addType: '-',
    customTags: []
  } as RootState,
  mutations: {
    setType(state, type: '-' | '+') {
      state.type = type;
    },
    setAddType(state, type: '-' | '+') {
      state.addType = type;
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
    },
    fetchCustomTag(state) {
      state.customTags = JSON.parse(window.localStorage.getItem('customTags') || '[]');
    },
    saveCustomTags(state) {
      window.localStorage.setItem('customTags', JSON.stringify(state.customTags));
    },
    deleteCustomTag(state, index: number) {
      state.customTags.splice(index, 1);
      store.commit('saveCustomTags');
    },
    addCustomTag(state, payload: { icon: string; name: string }) {
      const {icon, name} = payload;
      state.customTags.push({icon, name});
      store.commit('saveCustomTags');
    }
  },
  actions: {},
  modules: {}
});
export default store;
