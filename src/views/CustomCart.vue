<template>
  <div class="bg-white">
    <loading :active.sync="isLoading" />
    <div class="pt-5 container customerCart mb-2">
      <h1 class="text-center customerCart-title mb-5 text-secondary" v-if="cart.total">購物車</h1>
      <h5 class="text-center py-5 mt-3 mb-5 nonecart" v-if="!cart.total">目前您的購物車沒有任何商品!</h5>
      <hr s v-if="!cart.total" />
      <h3 class="cart-recommend text-center mb-4 pl-2 font-weight-bold" v-if="!cart.total">經典商品</h3>
      <div v-if="!cart.total">
        <CardCarousel :filterscard="filterscarousel" />
      </div>
      <div class="row" v-if="cart.total">
        <div class="col-lg-7">
          <ul class="list-unstyled customerCart-content">
            <li class="mb-1" v-for="item in cart.carts" :key="item.id">
              <div class="customerCart-list d-flex flex-row">
                <div class="customerCart-img">
                  <img :src="item.product.imageUrl" class="img-fluid" />
                </div>
                <div class="d-flex align-items-center ml-2 ml-sm-0">
                  <div>
                    <h4 class="customerCart-list-title mb-3">{{item.product.title}}</h4>
                    <div class="customerCart-list-info d-flex">
                      <span
                        class="price mr-3"
                      >{{item.product.price | currency}}&nbsp;x&nbsp;{{ item.qty }}&nbsp; 隻</span>
                    </div>
                  </div>
                </div>
                <div class="ml-auto pr-2 delete align-self-center">
                  <a
                    class="btn btn-danger text-white"
                    :class="{disabled:item.id === cartdisable}"
                    @click="deleteCart(item.id)"
                  >刪除</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="col-lg-5">
          <div class="customerCart-order">
            <div class="p-3">
              <h2 class="h5">訂單金額</h2>
              <hr class="my-3" />
              <div>
                <div
                  class="d-flex customerCart-order-item align-items-start mb-3"
                  v-for="items in cart.carts"
                  :key="items.id"
                >
                  <div class="d-flex flex-column mt-1">
                    <h5 class="mb-0 h6">{{items.product.title}}</h5>
                    <span>{{ items.qty }}隻</span>
                  </div>
                  <span class="ml-auto order-item-price">{{ items.total | currency }}</span>
                </div>
                <div class="d-flex customerCart-order-item align-items-start text-success" v-if="cart.final_total&&cart.final_total !==cart.total">
                  <div class="d-flex flex-column">
                    <h5 class="mb-0">已套用優惠</h5>
                    <span>{{ (cart.final_total/cart.total*100) }}% OFF</span>
                  </div>
                  <span class="ml-auto order-item-price">-{{ (cart.total -cart.final_total) | currency }}</span>
                </div>
                <div class="input-group input-group-sm">
                  <input type="text" class="form-control"  placeholder="請輸入優惠碼" v-model="coupon_num">
                  <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">套用優惠碼</button>
                  </div>
                </div>
              </div>
            </div>
            <hr class="my-3"/>
            <div class="pb-3 px-3 pt-0 customerCart-order-Next">
              <div class="d-flex justify-content-end align-content-center mb-3 align-items-end">
                <p class="subtotal mr-2">總計</p>
                <p class="total h3 mb-0 text-danger">{{ cart.final_total | currency }}</p>
              </div>
              <a href="#" class="btn btn-info btn-block" @click="GoOrder">下一步</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import CardCarousel from "../components/CardCarousel";
export default {
  name: "customerCart",
  components: {
    CardCarousel
  },
  data() {
    return {
      cartdisable: "",
      coupon_num: ""
    };
  },
  methods: {
    deleteCart(id) {
      const vm = this;
      vm.cartdisable = id;
      vm.$store.dispatch("CardModules/deleteCart", id);
    },
     addCouponCode() {
      const vm = this;
      if (vm.coupon_num !== '') {
        vm.$store.dispatch('CardModules/addCouponCode', vm.coupon_num).then(() => {
          vm.coupon_num = '';
        });
      }
    },
    GoOrder() {
      this.$router.push("/custom/customorder");
    },
    ...mapActions("HomeModules", ["CarouselProducts"]),
    ...mapActions("CardModules", ["getCart"])
  },
  computed: {
    filterscarousel() {
      let vm = this;
      let newarr = [];
      newarr = vm.carouselproducts.filter(
        item => item.unit.indexOf("hero") != -1
      );
      return newarr;
    },
    ...mapGetters("HomeModules", ["carouselproducts"]),
    ...mapGetters(["isLoading"]),
    ...mapGetters("CardModules", ["cart", "cartItem"])
  },
  created() {
    this.getCart();
  }
};
</script>