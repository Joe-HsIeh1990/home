<template >
  <nav class="nav shadow-sm py-md-0 px-0">
    <div class="nav-container d-flex px-0 flex-wrap justify-content-between align-content-center p-2">
      <div class="nav-logo d-flex align-items-center">
        <router-link to="/" class="text-decoration-none">
          <a href="#" class>
            <h2 class="text-white">AsStore</h2>
          </a>
        </router-link>
      </div>
      <div class="d-flex">
        <div class="nav-cart pt-3 pr-3">
          <div class="cart">
            <button type="button" class="dropdown-toggle cart-check" data-toggle="dropdown">
              <font-awesome-icon icon="cart-plus" size="lg" />
              <span class="cart-num text-center text-white" v-if="cartlength > 0">{{cartlength}}</span>
            </button>
            <div class="dropdown-menu p-2">
              <h6 class="p-2">已加入購物車</h6>
              <table class="table mb-2">
                <tbody>
                  <tr class="text-nowrap" v-if="cartlength == 0">
                    <td class="p-0">
                      <router-link to="/custom/products" class="text-decoration-none">
                        <a href="#" class="btn btn-info btn-block">目前沒有商品加入!</a>
                      </router-link>
                    </td>
                  </tr>
                  <tr v-for="item in cart.carts" :key="item.id">
                    <td class="px-2">
                      <img :src="item.product.imageUrl" width="30" />
                    </td>
                    <td class="ellipsis px-2 align-middle">{{ item.product.title }}</td>
                    <td class="text-nowrap px-2 align-middle">{{ item.qty }} 隻</td>
                    <td
                      class="text-right text-nowrap px-2 align-middle mincart-total"
                    >{{item.total | currency}}</td>
                  </tr>
                </tbody>
              </table>
              <router-link to="/custom/customcart" class="text-decoration-none">
                <a href="#" class="GoCustomerCart btn btn-danger btn-block">前往購物車</a>
              </router-link>
            </div>
          </div>
        </div>
        <div class="hamburger" :class="{'hamburger-x' : ham}" @click="hamburger">
          <span></span>
        </div>
      </div>

      <ul class="nav-content list-unstyled d-md-flex mb-0 align-items-center">
        <router-link to="/" class="text-decoration-none">
          <li class="nav-list mr-0 mr-md-5 py-3 py-md-0 pl-3 pl-md-0">
            <a href="#" class="font-weight-bold">首頁</a>
          </li>
        </router-link>
        <router-link to="/custom/products" class="text-decoration-none">
          <li class="nav-list mr-md-5 mr-0 py-3 py-md-0 pl-3 pl-md-0">
            <a href="#" class="font-weight-bold">商品</a>
          </li>
        </router-link>
        <router-link to="/custom/login" class="text-decoration-none">
          <li class="nav-list mr-md-5 mr-0 py-3 py-md-0 pl-3 pl-md-0">
            <a href="#" class="font-weight-bold">
              <font-awesome-icon icon="user-cog" size="lg" />
            </a>
          </li>
        </router-link>
        <li class="nav-list-cart">
          <div class="cart">
            <button type="button" class="dropdown-toggle cart-check" data-toggle="dropdown">
              <font-awesome-icon icon="cart-plus" size="lg" />
              <span class="cart-num text-center text-white" v-if="cartlength > 0">{{cartlength}}</span>
            </button>
            <div class="dropdown-menu p-2">
              <h6 class="p-2">已加入購物車</h6>
              <table class="table mb-2">
                <tbody>
                  <tr class="text-nowrap" v-if="cartlength == 0">
                    <td class="p-0">
                      <router-link to="/custom/products">
                        <a href="#" class="btn btn-info btn-block">目前沒有商品加入!</a>
                      </router-link>
                    </td>
                  </tr>
                  <tr v-for="item in cart.carts" :key="item.id">
                    <td class="px-2">
                      <img :src="item.product.imageUrl" width="30" />
                    </td>
                    <td class="ellipsis px-2 align-middle">{{ item.product.title }}</td>
                    <td class="text-nowrap px-2 align-middle">{{ item.qty }} 隻</td>
                    <td
                      class="text-right text-nowrap px-2 align-middle mincart-total"
                    >{{item.total | currency}}</td>
                  </tr>
                </tbody>
              </table>
              <a href="#" class="GoCustomerCart btn btn-danger btn-block" @click.prevent="GoCustomerCart">前往購物車</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import $ from "jquery";
export default {
  name: 'Navbar',
  data() {
    return {
      ham: false,
      NavContent: true
    };
  },
  methods: {
    hamburger() {
      let vm = this;
      if (vm.ham == false) {
        $(".nav-content").slideDown("slow");
        this.ham = true;
      } else {
        this.ham = false;
        $(".nav-content").slideUp("slow");
      }
    },
    GoCustomerCart() {
      this.$router.push("/custom/customcart");
    },
    ...mapActions("CardModules", ["getCart"])
  },
  computed: {
    ...mapGetters("CardModules", ["cart", "cartlength"])
  },
  mounted() {
    this.getCart();
    let winwidth = window.innerWidth;
    if (winwidth >= 767) {
      $(".hamburger").hide();
      $(".nav-cart").hide();
      $(".nav-list-cart").show();
    } else {
      $(".nav-list-cart").hide();
      $(".nav-content").hide();
    }
  }
};
</script>
<style lang="scss" scoped>
.cart {
  position: relative;
  height: auto;
  &-check {
    border: none;
    background: transparent;
    color: #ffff;
    height: 100%;
    padding: 0 0.5rem;
    transition: all 1s;
    &:active,
    &:focus {
      outline: 0;
    }
  }
  &-num {
    background: #ff0000;
    position: absolute;
    left: 20px;
    top: -10px;
    letter-spacing: 0;
    display: inline-block;
    width: 18px;
    height: 18px;
    line-height: 16px;
    padding: 1px;
    border-radius: 50%;
    font-size: 12px;
    cursor: pointer;
  }
}
.dropdown-menu {
  left: -200% !important;

  width: 320px;
  @media (max-width: 992px) {
    left: -180% !important;
  }
  @media (max-width: 768px) {
    left: -170% !important;
  }
}
</style>

