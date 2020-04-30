import Vue from 'vue'
import Vuex from 'vuex'
import VueSocketIO from 'vue-socket.io'
import SocketIO from "socket.io-client"

import App from './App'
import router from './router'
import store from './store'


Vue.config.productionTip = false
const options = { path: '/bids/' };


Vue.use(Vuex)
Vue.use(new VueSocketIO({
    debug: false,
    connection: SocketIO('http://localhost:3000', options),
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')