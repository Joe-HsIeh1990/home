<template>
  <div class="container mt-3">
    <swiper class="swiper-cont" :options="swiperOption">
      <swiper-slide class="swiper-card" v-for="item in filterscard" :key="item.id">
        <div class="card" @click.prevent="ToProductsDetaill(item.id)">
          <img :src="item.imageUrl" class="card-img-top img-fluid" alt />
          <div class="card-body border">
            <h5 class="card-title font-weight-bold">{{ item.title }}</h5>
            <p class="card-text">{{ item.content }}</p>
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import $ from "jquery";
export default {
  name: 'AminDeleteModal',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    filterscard: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      swiperOption: {
        autoHeight: true,
        setWrapperSize: true,
        spaceBetween: 10,
        speed: 600,
        autoplay: {
          delay: 5000
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        breakpoints: {
          480: {
            slidesPerView: 2,
            slidesPerGroup: 2
          },
          767: {
            slidesPerView: 3,
            slidesPerGroup: 3
          },
          992: {
            slidesPerView: 4,
            slidesPerGroup: 4
          }
        }
      }
    };
  },
  methods: {
    ToProductsDetaill(id) {
      this.$router.push(`/custom/detail/${id}`);
      $("html,body").animate({
        scrollTop: 0
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.swiper {
  &-pagination {
    position: unset;
  }
  &-card {
    cursor: pointer;
  }
}
.card {
  width: 100% !important;

  img {
    width: 100% !important;
  }
  &-body {
    width: 100% !important;
  }
}
</style>