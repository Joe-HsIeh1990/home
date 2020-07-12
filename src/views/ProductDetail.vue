<template>
  <div class="container detail">
    <loading :active.sync="isLoading"></loading>
    <div class="row align-items-center mb-3" v-if="currentProduct.id">
      <div class="col-md-7 px-0">
        <div>
          <img :src="currentProduct.imageUrl" class="detail-img" alt />
        </div>
      </div>
      <div class="detail-cash col-md-5 detall-price">
        <div class="p-3">
          <h2 class="font-weight-bold mb-2">{{currentProduct.title}}</h2>
          <div class="mb-3">
            <del>原價 {{currentProduct.origin_price | currency}}</del>
            <h4 class="mt-2 text-danger font-weight-bold">特價 {{currentProduct.price | currency}}</h4>
          </div>
          <select class="form-control mb-3" v-model="counts">
            <option :value="num" v-for="num in 10" :key="num">選購 {{num}} 隻</option>
          </select>
          <p
            class="text-right text-main font-weight-bold mb-1"
          >小計 {{counts * currentProduct.price | currency}}</p>
          <a
            class="btn btn-info btn-block text-white"
            @click="addtoCart(currentProduct.id,counts)"
          >加入購物車</a>
        </div>
      </div>
    </div>
    <div class="row detail-container bg-white">
      <div class="col-md-8 detail-content-title my-3 p-3" v-if="currentProduct.id">
        <div>
          <h3 class="mb-3 font-weight-bold pb-3">產品描述</h3>
          <hr>
          <p>
            {{ currentProduct.description }}
            <em>{{ currentProduct.content }}</em>
          </p>
        </div>
      </div>
      <div class="col-md-12 detall-content-same mb-5" v-if="currentProduct.id">
        <h3 class="font-weight-bold my-3 pb-3">同類別商品</h3>
        <hr>
        <CardCarousel :filterscard="filterscarousel" />
      </div>
      <div class="col-md-12">
        <div class="detail-content-title">
          <h3 class="my-3 pb-3">消費者權益</h3>
          <hr>
          <ul>
            <li>退款必須滿足兩個條件，分別是『商品未拼裝前有瑕疵』與『商品購入後未開封七天』。</li>
            <li>退款的數量沒有上限，但是請注意，若我們發現您濫用退款機制，就會以個案駁回您的退款要求，甚至降低您未來的退款成功率。</li>
            <li>退款成功後，將於7個工作天內將款項退回給您。</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardCarousel from "../components/CardCarousel";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    CardCarousel
  },
  data() {
    return {
      counts: 1,
      currentPageProduct: {}
    };
  },
  methods: {
    addtoCart(id, qty = 1) {
      const vm = this;
      this.$store.dispatch("CardModules/addtoCart", { id, qty }).then(() => {
        vm.counts = 1;
      });
    },
    ...mapActions("ProductsModules", ["getCurrentPageProduct"]),
    ...mapActions("HomeModules", ["CarouselProducts"])
  },
  computed: {
    filterscarousel() {
      let vm = this;
      let newarr = [];
      newarr = vm.carouselproducts.filter(item => {
        if (item.title !== vm.currentProduct.title) {
          return item.category.indexOf(vm.currentProduct.category) != -1;
        }
      });
      return newarr;
    },
    ...mapGetters(["isLoading"]),
    ...mapGetters("ProductsModules", ["currentProduct"]),
    ...mapGetters("HomeModules", ["carouselproducts"])
  },
  created() {
    this.$store
      .dispatch("ProductsModules/getCurrentPageProduct", this.$route.params.id)
      .then(() => {
        this.currentPageProduct = Object.assign({}, this.currentProduct);
      });
    this.CarouselProducts();
  },
  watch: {
    "$route.params.id": function() {
      const vm = this;
      vm.getCurrentPageProduct(vm.$route.params.id);
    }
  }
};
</script>

<style>
</style>