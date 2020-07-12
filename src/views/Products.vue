<template>
  <div class="products">
    <loading :active.sync="isLoading"></loading>
    <header class="custom d-flex">
      <div class="m-auto text-white">
        <h1>Shop Store</h1>
      </div>
    </header>
    <div class="Introduction container-fluid">
      <ul class="Introduction-container list-unstyled row justify-content-between mb-0">
        <li class="col-12 col-md-4 col-lg-3">
          <div class="drop">
            <div class="drop-container" :class="{'active' : Btn_active}" @click.stop="dropmenu()">
              <h5 class="drop-title p-3 text-center">
                <span class="drop-plus" :class="{'active' : plus_icon}"></span>商品類型
              </h5>
            </div>
            <ul class="Introduction-list list-unstyled">
              <li
                class="Introduction-item border"
                v-for="boxitem in menu"
                :class="{ 'active' : boxitem.style , 'activeall' : boxitem.kind}"
                :key="boxitem.zoe"
                @click.stop="dropitem(boxitem.zoe) ;  boxitem.took && currentcontext(boxitem.special)"
              >
                <h5 class="Introduction-item-title p-3 text-center" :id="boxitem.name">
                  <span
                    class="Introduction-plus"
                    :class="{ 'active' : boxitem.style }"
                    :id="boxitem.zoe"
                  ></span>
                  {{ boxitem.name }}
                </h5>
                <ul class="Introduction-content list-unstyled" :id="boxitem.dropid">
                  <li
                    class="Introduction-content-list border"
                    :class="{'active': mind.kind}"
                    v-for="mind in boxitem.rol"
                    :key="mind.zoe"
                    @click.stop="currentcontext(mind.zoe)"
                  >
                    <h5 class="Introduction-content-title p-3 text-center">
                      <span class="Introduction-contnet-plus">{{ mind.name }}</span>
                    </h5>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </li>
        <li class="commodity d-flex flex-column col-12 col-md-8 col-lg-9 mt-2 mt-md-0">
          <div class="commodity-title text-center">
            <h5 class="py-3">商品列表</h5>
          </div>
          <ul
            class="commodity-content col-12 mx-auto row list-unstyled px-0 align-items-center border pt-2"
          >
            <li class=" commodity-list col-12 col-md-6 col-lg-3 mb-3" v-for="item in products" :key="item.id">
              <div class="card d-flex flex-row flex-md-column ">
                <div class="card-img" @mousemove.stop="HoverShow">
                  <img :src="item.imageUrl" class="card-img-top img-fluid" :data-num="item.id" alt />
                  <div
                    class="card-hover d-flex justify-content-around align-items-center"
                    v-if="item.is_enabled"
                    :data-num="item.id"
                  >
                    <a
                      href="`#/custom/detail/${item.id}`"
                      class="btn btn-outline-light"
                      @click.prevent="ToProductsDetaill(item.id)"
                      :data-num="item.id"
                    >more</a>
                    <a
                      href="#"
                      class="btn btn-outline-light"
                      :data-num="item.id"
                      @click.prevent="getCurrentProduct(item.id)"
                    >加入購物車</a>
                  </div>
                </div>
                <div class="card-body border">
                  <h5 class="card-title font-weight-bold">{{ item.title }}</h5>
                  <p class="card-text">{{ item.content }}</p>
                  <div class="d-flex justify-content-between mt-2">
                    <del>原價{{ item.origin_price }}!!</del>
                    <h3 class="h5 text-danger font-weight-bold">特價{{ item.price }}!!</h3>
                  </div>

                  <div class="card-text-btn mt-2">
                    <a
                      href="`#/custom/detail/${item.id}`"
                      class="btn btn-info p-1 mr-2"
                      @click.prevent="ToProductsDetaill(item.id)"
                    >more</a>
                    <a href="#" class="btn btn-primary p-1">加入購物車</a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <PaginationPhone
            :pages="pagination"
            @emitPages="GetProducts"
            class="page-phone align-self-center mx-auto my-3"
          ></PaginationPhone>
          <Pagination
            :pages="pagination"
            @emitPages="GetProducts"
            class="page-dash align-self-center mx-auto my-3"
          ></Pagination>
        </li>
      </ul>
    </div>
    <CardModal :theProduct="temproduct" />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import PaginationPhone from "../components/PaginationPhone";
import Pagination from "../components/Pagination";
import CardModal from "../components/CardModal";
import $ from "jquery";
export default {
  components: {
    Pagination,
    CardModal,
    PaginationPhone
  },
  data() {
    return {
      hover_btn: true,
      plus_icon: false,
      Btn_active: false,
      Btn_rwd: false,
      phoneCard: false,
      menu: [
        {
          name: "All",
          zoe: "all",
          special: "all",
          took: true,
          style: false,
          kind: false
        },
        {
          name: "魔戒-秩序陣營",
          zoe: "goodside",
          took: false,
          style: false,
          dropid: "order",
          rol: [
            {
              name: "夏爾",
              zoe: "theshire",
              kind: false
            },
            {
              name: "剛鐸",
              zoe: "Gondor",
              kind: false
            },
            {
              name: "洛汗",
              zoe: "Rohan",
              kind: false
            },
            {
              name: "瑞文戴爾",
              zoe: "Rivendell",
              kind: false
            },
            {
              name: "凱薩督姆",
              zoe: "Khazad-Dum",
              kind: false
            }
          ]
        },
        {
          name: "魔戒-混沌陣營",
          zoe: "evilside",
          took: false,
          style: false,
          dropid: "dark",
          rol: [
            {
              name: "艾辛格",
              zoe: "isengard",
              kind: false
            },
            {
              name: "魔多",
              zoe: "mordor",
              kind: false
            }
          ]
        },
        {
          name: "哈比人-秩序陣營",
          zoe: "hobbitgood",
          took: false,
          style: false,
          dropid: "orderhobbit",
          rol: [
            {
              name: "埃爾博",
              zoe: "LonelyMountain",
              kind: false
            },
            {
              name: "鐵丘陵矮人",
              zoe: "IronHills",
              kind: false
            },
            {
              name: "幽暗密林",
              zoe: "Mirkwood",
              style: false
            }
          ]
        },
        {
          name: "哈比人-混沌陣營",
          zoe: "hobbitevil",
          took: false,
          style: false,
          dropid: "darkhobbit",
          rol: [
            {
              name: "阿佐格軍團",
              zoe: "azog",
              kind: false
            }
          ]
        },
        {
          name: "遊戲相關內容",
          zoe: "some",
          took: false,
          style: false,
          dropid: "book",
          rol: [
            {
              name: "戰爭規則書",
              zoe: "book",
              kind: false
            }
          ]
        }
      ]
    };
  },
  methods: {
    getCurrentProduct(id) {
      this.$store.dispatch("ProductsModules/getCurrentProduct", id).then(() => {
        $("#productModal").modal("show");
      });
    },
    ToProductsDetaill(id) {
      this.$router.push(`/custom/detail/${id}`);
    },
    currentcontext(e) {
      this.$store.commit("ProductsModules/CURRENTCONTEXT", e);
      this.GetProducts();
      let vm = this;
      vm.menu.forEach(item => {
        if (e == item.special) {
          if (item.kind == false) {
            item.kind = true;
          }
        } else {
          item.kind = false;
        }
        for (let i in item.rol) {
          if (e == item.rol[i].zoe) {
            if (item.rol[i].kind == false) {
              item.rol[i].kind = true;
            } else {
              item.rol[i].kind = false;
            }
          } else if (e !== item.rol[i].zoe) {
            item.rol[i].kind = false;
          }
        }
      });
    },
    dropmenu() {
      let vm = this;
      if (vm.Btn_active == false) {
        vm.Btn_active = true;
        vm.plus_icon = true;
        $(".Introduction-list").slideDown("slow");
      } else {
        vm.Btn_active = false;
        vm.plus_icon = false;
        $(".Introduction-list").slideUp("slow");
      }
    },
    dropitem(e) {
      let vm = this;
      vm.menu.forEach(item => {
        if (e === item.zoe && e !== item.special) {
          if (item.style == false) {
            item.style = true;
            $(`#${item.dropid}`).slideDown("slow");
          } else {
            item.style = false;
            $(`#${item.dropid}`).slideUp("slow");
          }
        }
        // if (e == item.special) {
        //   if (item.kind == false) {
        //     item.kind = true;
        //   } else {
        //     item.kind = false;
        //   }
        // } else if (e !== item.special && e !== item.zoe) {
        //   item.kind = false;
        // }
      });
    },
    HoverShow(e) {
      let take = e.target.dataset.num;
      this.$store.commit("ProductsModules/HOVERLIST", take);
    },
    ...mapActions("ProductsModules", ["GetProducts"])
  },
  computed: {
    ...mapGetters(["isLoading"]),
    ...mapGetters("ProductsModules", [
      "products",
      "pagination",
      "temproduct",
      "contxt",
      "txt"
    ]),
    ...mapGetters("ProductsModules", ["cartItem"])
  },
  mounted() {
    $(".Introduction-list").hide();
    $(".Introduction-content").hide();
    $(".card-hover").hide();
    let ALLid = document.getElementById("All");
    let removeplus = document.getElementById("all");
    ALLid.removeChild(removeplus);
  },
  created() {
    this.GetProducts();
  }
};
</script>

<style>
</style>