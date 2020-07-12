import axios from 'axios';

export default {
    strict: true,
    namespaced: true,
    state: {
        carouselproducts: [],
    },
    actions: {
        CarouselProducts(context) {
            const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_COSTOM}/products/all`; 
            context.commit('ISLOADING', true, { root: true });
            axios.get(api).then(response => {
                context.commit('CAROUSELPRODUCTS', response.data.products);
            });
        },
    },
    mutations: {
        CAROUSELPRODUCTS(state, payload) {
            state.carouselproducts = payload;
        },
    },
    getters: {
        carouselproducts: state => state.carouselproducts,
    },
};