import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios'
import routes from './router';
// import store from './store/index.js';
import util from './libs/util';
import iView from 'iview';

// import VueQuillEditor from 'vue-quill-editor'

// require styles
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'


import 'iview/dist/styles/iview.css';
import './styles/style.css';

Vue.use(VueAxios, axios)
Vue.use(VueRouter);
Vue.use(iView);

Vue.mixin({
    methods: util
});

// Vue.use(VueQuillEditor)

// 开启debug模式
Vue.config.debug = true;

const router = new VueRouter({
    //history: Env != 'production',
    routes // （缩写）相当于 routes: routes
})
let app = new Vue({
    router,
    // store
}).$mount('#app');



