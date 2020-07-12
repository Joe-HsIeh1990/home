import axios from 'axios';
import router from '../router';

export default {
    strict: true,
    namespaced: true,
    state: {

    },
    actions: {
        signin(context, payload) {
            const api = `${process.env.VUE_APP_APIPATH}admin/signin`;
            context.commit('ISLOADING', true, { root: true });
            return new Promise((resolve) => {
                axios.post(api, payload).then(response => {
                    context.commit('ISLOADING', false, { root: true });
                    if (response.data.success) {
                        router.push('/admin');
                        resolve()
                    }
                });
            })
        },
        signout(context) {
            const api = `${process.env.VUE_APP_APIPATH}logout`;
            context.commit('ISLOADING', true, { root: true });
            axios.post(api).then(response => {
                if (response.data.success) {
                    context.commit('ISLOADING', false, { root: true });
                    router.push("/");
                }
            });
        }
    },
    mutations: {

    },
    getters: {

    },
};