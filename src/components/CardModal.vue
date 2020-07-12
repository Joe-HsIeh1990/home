<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">{{ theProduct.title }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <img :src="theProduct.imageUrl" class="img-fluid" alt />
          <div class="mt-3">
            <p class="modal-description text-secondary">{{theProduct.description}}</p>
          </div>
          <div class="d-flex justify-content-between align-items-baseline modal-price">
            <del class="h6 text-secondary">原價 {{ theProduct.origin_price | currency}}</del>
            <div class="h4 text-danger">
              現在購買
              <strong>{{ theProduct.price | currency}}</strong>
            </div>
          </div>
          <select name="count" class="form-control mt-3" v-model="counts">
            <option :value="num" v-for="num in 10" :key="num">總共 {{num}} 隻</option>
          </select>
        </div>
        <div class="modal-footer">
          <div class="text-nowrap mr-4 modal-total">
            小計
            <strong>{{ counts * theProduct.price | currency}}</strong>
          </div>
          <a
            href="#"
            class="btn btn-danger btn-block px-4"
            @click="addtoCart(theProduct.id, counts)"
            :class="{disabled:theProduct.id === cartdisable}"
          >立即下單</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "CardModal",
  props: {
    theProduct: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      counts: 1,
      cartdisable: ""
    };
  },
  methods: {
    addtoCart(id, qty) {
      const vm = this;
      vm.cartdisable = id;
      this.$store.dispatch("CardModules/addtoCart", { id, qty }).then(() => {
        $("#productModal").modal("hide");
        vm.cartdisable = "";
        vm.counts = 1;
        console.log(vm.cartdisable);
      });
    }
  }
};
</script>

<style>
</style>