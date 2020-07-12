<template>
  <div>
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog " role="document">
        <div class="modal-content">
          <div class="modal-header bg-dark">
            <h6 class="modal-title text-white" id="exampleModalLabel">商品內容</h6>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="thisProduct.imageUrl" class="img-fluid" alt />
            <p class="h5 mt-2">
              {{ thisProduct.title }}
              <br />
              <small class="h6">{{ thisProduct.description }}</small>
            </p>
            <h6 class="text-right h4">加入購物車&nbsp;NT{{ thisProduct.origin_price | currency }}</h6>
          </div>
          <div class="modal-footer">
            <div class="text-nowrap mr-4 modal-total">
              小計
              <strong>{{ counts * thisProduct.origin_price | currency}}</strong>
            </div>
            <button
              type="button"
              class="modal-btn btn-dark px-4"
              @click="addtoCart(thisProduct.id)"
              :class="{disabled:thisProduct.id === cartdisable}"
            >
              立即購買
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: 'CustomModal',
  props: {
    thisProduct: {
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
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.close {
  outline: 0;
  &:focus {
    outline: 0;
  }
}
img{
  width: 100%;
}
</style>