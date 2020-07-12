
import axios from 'axios';
import router from '../router';

export default {
  strict: true,
  namespaced: true,
  state: {
    order: {
      user: {},
    },
  },
  actions: {
    createOrder(context, order) {
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_COSTOM}/order`;
      context.commit('ISLOADING', true, { root: true });
      return new Promise((resolve) => {
        axios.post(api, { data: order }).then((response) => {
          context.commit('ISLOADING', false, { root: true });
          if (response.data.success) {
            resolve();
            context.dispatch('CardModules/getCart', null, { root: true });
            setTimeout(() => {
              router.push(`/custom/custompay/${response.data.orderId}`);
            },200)
          }
        });
      });
    },
    getOrder(context, id) {
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_COSTOM}/order/${id}`;
      axios.get(api).then((response) => {
        context.commit('GETORDER', response.data.order);
      });
    },
    payOrder(context, id) {
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_COSTOM}/pay/${id}`;

      context.commit('ISLOADING', true, { root: true });
      return new Promise((resolve) => {
        axios.post(api).then((response) => {
          context.commit('ISLOADING', false, { root: true });
          if (response.data.success) {
            resolve();
            context.dispatch('AlertModules/updateMessage', { message: '付款完成', status: 'success' }, { root: true });
            context.dispatch('CardModules/getCart', null, { root: true });
            setTimeout(() => {
            router.replace(`/custom/customcomplete/${id}`);},200)

          }
        });
      });
    },
  },
  mutations: {
    GETORDER(state, payload) {
      state.order = payload;
    },
  },
  getters: {
    order: state => state.order,
  },
};