<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide>
      <div class="header-list1">
        <div class="header-text">
          <h1 class="mb-2">遊戲規則書</h1>
          <p class="mb-2">了解各種族、單位相關規則，及各單位獨立故事</p>
          <router-link to="/custom/detail/-MB25NujDeWf9_ALejU4" class="text-decoration-none">
            <div class="d-flex justify-content-between">
              <a href="#" class="btn btn-outline-warning btn-block">More</a>
            </div>
          </router-link>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="header-list2">
        <div class="header-text">
          <h1 class="mb-2">歡迎來到AsStore</h1>
          <p class="mb-2">經典電影"魔戒"，縮小成模型大小後，在戰棋桌上進行一場史詩般的對決。</p>
          <router-link to="/custom/products" class="text-decoration-none">
            <div class="d-flex justify-content-between">
              <a href="#" class="btn btn-outline-warning btn-block">More</a>
            </div>
          </router-link>
        </div>
      </div>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
<script>
import { mapGetters } from "vuex";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: 'TitleCarousel',
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOption: {
        resistance: false,
        loop: true,
        autoplay: {
          delay: 6000,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  },
  computed:{
     ...mapGetters(["isLoading"]),
  }
};
</script>