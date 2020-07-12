import axios from 'axios';

export default {
  strict: true,
  namespaced: true,
  state: {
    cart: {},
    cartlength: 0,
    cartItem: '',
  },
  actions: {
    getCart(context) {
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_COSTOM}/cart`;
      context.commit('ISLOADING', true, { root: true });
      axios.get(api).then((response) => {
        context.commit('ISLOADING', false, { root: true });
        if (response.data.success) {
          context.commit('CART', response.data.data);
          context.commit('CARTITEM', '');
        }
      });

    },
    addtoCart(context, { id, qty = 1 }) {
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_COSTOM}/cart`;
      context.commit('ISLOADING', true, { root: true });
      context.commit('CARTITEM', id);
      const cart = {
        product_id: id,
        qty,
      };
      return new Promise((resolve) => {
        axios.post(api, { data: cart }).then((response) => {
          console.log(api)
          context.commit('ISLOADING', false, { root: true });
          if (response.data.success) {
            context.dispatch('getCart');
            resolve();
          }
        });
      });
    },
    deleteCart(context, id) {
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_COSTOM}/cart/${id}`;
      context.commit('CARTITEM', id);
      context.commit('ISLOADING', true, { root: true });
      axios.delete(api).then((response) => {
        context.commit('ISLOADING', false, { root: true });
        if (response.data.success) {
          context.dispatch('getCart');
        }
      });
    },
    addCouponCode(context, couponcode) {
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_COSTOM}/coupon`;
      const coupon = {
        code: couponcode,
      };
      context.commit('ISLOADING', true, { root: true });
      return new Promise((resolve) => {
        axios.post(api, { data: coupon }).then((response) => {
          context.commit('ISLOADING', false, { root: true });
          if (response.data.success) {
            context.dispatch('getCart');
            resolve();
          }
        });
      });
    },
  },
  mutations: {
    CART(state, payload) {
      state.cart = payload;
      state.cartlength = payload.carts.length;
    },
    CARTITEM(state, payload) {
      state.cartItem = payload;
    },
  },
  getters: {
    cart: state => state.cart,
    cartlength: state => state.cartlength,
    cartItem: state => state.cartItem,
  },
};