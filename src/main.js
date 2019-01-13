import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import * as fb from 'firebase';
import App from './App.vue';
import router from './router';
import store from './store';
import BuyModalComponent from '@/components/Shared/BuyModal';

Vue.component('app-buy-modal', BuyModalComponent)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    fb.initializeApp({
      apiKey: 'AIzaSyBCb7-GhFNvOVMmluFvw7KsWr89ysuF-6E',
      authDomain: 'vue-p-4baa6.firebaseapp.com',
      databaseURL: 'https://vue-p-4baa6.firebaseio.com',
      projectId: 'vue-p-4baa6',
      storageBucket: 'vue-p-4baa6.appspot.com',
      messagingSenderId: '1030848062563',
    });

    fb.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user);
      }
    });

    this.$store.dispatch('fetchAds');
  },
}).$mount('#app');
