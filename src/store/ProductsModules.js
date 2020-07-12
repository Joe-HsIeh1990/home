import axios from 'axios';

export default {
    strict: true,
    namespaced: true,
    state: {
        txt: '',
        contxt: '',
        products: [],
        currentProduct: {},
        temproduct: {},
        pagination: {
            total_pages: 1,
            current_page: 1,
            has_pre: false,
            has_next: false,
            page_size: 8,
        },
    },
    mutations: {
        PRODUCTS(state, payload) {
            state.products = payload;
            state.products.forEach(e => {
                e.is_enabled = false;
            })
        },
        PRODUCT(state, payload) {
            state.product = payload
        },
        HOVERLIST(state, payload) {
            let WinWid = window.innerWidth;
            state.products.forEach(e => {
                if (WinWid > 768) {
                    if (payload == e.id) {
                        e.is_enabled = true;
                    } else {
                        e.is_enabled = false;
                    }
                }
            })
        },
        FILTERPRODUCTS(state, payload) {
            if (state.contxt !== '') {
                state.products = state.products.filter(item => item.category.indexOf(state.contxt) != -1);
            }
            const len = state.products.length;
            const size = state.pagination.page_size;
            state.pagination.total_pages = Math.ceil(len / size);
            state.pagination.current_page = payload;
            if (payload > 1) {
                state.pagination.has_pre = true;
            } else {
                state.pagination.has_pre = false;
            }
            if (payload < state.pagination.total_pages) {
                state.pagination.has_next = true;
            } else {
                state.pagination.has_next = false;
            }
            state.products = state.products.slice((0 + size * (payload - 1)), size * payload);
        },
        
        CURRENTCONTEXT(state, payload) {
            if (state.contxt === payload && payload !== '' || payload === 'all') {
                state.contxt = '';
            } else {
                state.contxt = payload;
                state.txt = payload
            }
        },
        GETCURRENTPAGEPRODUCT(state, payload) {
            state.currentProduct = payload;
        },
        GETCURRENTPRODUCT(state, payload) {
            state.temproduct = payload;
        },
    },
    actions: {
        GetProducts(context, page = 1) {
            const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_COSTOM}/products/all`;
            context.commit('ISLOADING', true, { root: true });
            axios.get(api).then(response => {
                context.commit('PRODUCTS', response.data.products);
                context.commit('FILTERPRODUCTS', page);
                context.commit('ISLOADING', false, { root: true });
            });
        },
        getCurrentPageProduct(context, id) { 
            const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_COSTOM}/product/${id}`;
            context.commit('ISLOADING', true, { root: true });
            return new Promise((resolve) => {
              axios.get(api).then((response) => {
                context.commit('ISLOADING', false, { root: true });
                if (response.data.success) {
                  context.commit('GETCURRENTPAGEPRODUCT', response.data.product);
                  resolve();
                } 
              });
            });
          },
        getCurrentProduct(context, id) {
            const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_COSTOM}/product/${id}`;
            context.commit('ISLOADING', true, { root: true });
            return new Promise((resolve) => {
                axios.get(api).then((response) => {
                    if (response.data.success) {
                        context.commit('GETCURRENTPRODUCT', response.data.product);
                        context.commit('ISLOADING', false, { root: true });
                        resolve();
                    }
                });
            });
        },
    },
    getters: {
        products: state => state.products,
        contxt: state => state.contxt,
        pagination: state => state.pagination,
        txt: state => state.txt,
        currentProduct: state => state.currentProduct,
        temproduct: state => state.temproduct,
    }
}