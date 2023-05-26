import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC4u2ztHcOHet-8iqRQ_9JC91LyaWY0m9Y', // Google Maps API 
    libraries: 'places',
  },
})

Vue.use(ElementUI)

Vue.prototype.$http = axios

new Vue({
  render: h => h(App),
}).$mount('#app')
