import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';

Vue.use(VueGoogleMaps, {
  load: {
    key: '{YOUR_GOOGLE_MAP_API}', // Google Maps API 
    libraries: 'places',
  },
})

Vue.use(ElementUI, { locale });

Vue.prototype.$http = axios

new Vue({
  render: h => h(App),
}).$mount('#app')
