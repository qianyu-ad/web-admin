import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

export default new vuex.Store({
    state: {
        //记录跳转到当前页面之前的标签页
        from: null,
        scroll: null
    },
    mutations: {
        changeFrom(state, data){
            state.from = data.from;
        },
        recordScroll(state, data){
            state.scroll = data.scroll;
        }
    }
});