<template>
  <div class="bg-black">
    <Navbar />
    <header class="header">
      <TitleCarousel />
      <div class="arr d-flex justify-content-center">
        <div
          class="arr-box d-flex flex-column animate__animated animate__bounce animate__infinite animate__slower"
          data-down="title"
          @click="scrolldown"
        >
          <div class="arr-item1 mx-auto mt-1" data-down="title">
            <div class="arr-inside mx-auto mt-1" data-down="title"></div>
          </div>
          <i class="fas fa-chevron-down mx-auto mt-1" data-down="title"></i>
        </div>
      </div>
    </header>
    <div class="new new-container1 py-4 px-0 mt-md-5" id="hobbit">
      <div class="new-content d-flex flex-wrap pb-2">
        <div class="col-md-6 col-12 new-photo new-list px-0"></div>
        <div
          class="new-list new-text col-md-6 col-12 d-flex justify-content-center align-items-center"
        >
          <div class="new-txt d-flex col-12 flex-column justify-content-center px-0 p-md-3">
            <h3 class="font-weight-bold my-2 px-0 text-info">哈比人歷險記</h3>
            <p class="text-white">主角比爾博被巫師甘道夫挑上，激發出他冒險的慾望，與十三個矮人組成探險隊，前往有一條惡龍守護的孤山，展開了尋寶之旅。</p>
            <p class="text-white">這次我們將整個電影縮小成戰棋，使用手上的戰旗陪著比爾博·巴金斯一起經歷這宏偉的史詩戰役。</p>
            <div class="d-flex my-2">
              <router-link to="/custom/detail/-MBCOOtjfBn77TK34Kgb">
                <div>
                  <a href="#" class="btn btn-info">了解更多</a>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="arr d-flex justify-content-center">
        <div
          class="arr-box d-flex flex-column animate__animated animate__bounce animate__infinite animate__slower"
          data-down="hobbit"
          @click="scrolldown"
        >
          <div class="arr-item1 mx-auto mt-1" data-down="hobbit">
            <div class="arr-inside mx-auto mt-1" data-down="hobbit"></div>
          </div>
          <i class="fas fa-chevron-down mx-auto mt-1" data-down="hobbit"></i>
        </div>
      </div>
    </div>
    <div class="new new-container2 py-4 px-0 " id="ring">
      <div class="new-content d-flex flex-wrap flex-row-reverse">
        <div class="col-md-6 col-12 new-photo2 new-list px-0"></div>
        <div
          class="new-list new-text col-md-6 col-12 d-flex justify-content-center align-items-center"
        >
          <div class="new-txt d-flex col-12 flex-column justify-content-center px-0 p-md-3">
            <h3 class="font-weight-bold my-2 px-0 text-warning">魔戒</h3>
            <p class="text-white">主角哈比人佛羅多·巴金斯以及魔戒遠征隊所執行的毀掉至尊魔戒任務，以及消滅至尊魔戒的製造者黑暗魔君索倫。</p>
            <p class="text-white">這次我們將整個電影縮小成戰棋，使用手上的戰旗陪著佛羅多·巴金斯一起經歷這宏偉的史詩戰役。</p>
            <router-link to="/custom/detail/-MBC8q0vvrIus-EemlMr">
              <div class="d-flex my-2">
                <a href="#" class="btn btn-warning">了解更多</a>
              </div>
            </router-link>
            <div></div>
          </div>
        </div>
      </div>
      <div class="arr d-flex justify-content-center">
        <div
          class="arr-box d-flex flex-column animate__animated animate__bounce animate__infinite animate__slower"
          data-down="ring"
          @click="scrolldown"
        >
          <div class="arr-item1 mx-auto mt-1" data-down="ring">
            <div class="arr-inside mx-auto mt-1" data-down="ring"></div>
          </div>
          <i class="fas fa-chevron-down mx-auto mt-1" data-down="ring"></i>
        </div>
      </div>
    </div>
    <section class="section pt-5 mt-5">
      <div class="section-title">
        <h2 class="text-white mx-auto border-bottom pb-5 font-weight-bold">熱銷商品</h2>
      </div>
      <CardCarousel :filterscard="filterscarousel" />
    </section>
    <div class="gotop rounded-circle py-1 px-2" @click="gotoper">
      <font-awesome-icon icon="arrow-up" class="goicon" size="2x" :style="{ color: 'white' }" />
    </div>
    <Footer />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import "animate.css/animate.min.css";
import $ from "jquery";
import CardCarousel from "../components/CardCarousel";
import TitleCarousel from "../components/TitleCarousel";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default {
  components: {
    Navbar,
    Footer,
    TitleCarousel,
    CardCarousel
  },
  data() {
    return {};
  },
  methods: {
    scrolldown(e) {
      let target = e.target.dataset.down;
      let hobbit = $("#hobbit").offset().top;
      let section = $(".section").offset().top;
      let ring = $("#ring").offset().top;
      if (target === "hobbit") {
        $("html,body").animate({
          scrollTop: ring
        });
      } else if (target === "ring") {
        $("html,body").animate({
          scrollTop: section
        });
      } else if (target === "title") {
        $("html,body").animate({
          scrollTop: hobbit
        });
      }
    },
    gotoper(e) {
      $("html,body").animate({
        scrollTop: 0
      });
      e.preventDefault();
    },
    ...mapActions("HomeModules", ["CarouselProducts"])
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
    ...mapGetters("HomeModules", ["carouselproducts"])
  },
  mounted() {
    $(window).scroll(function() {
      let h = $(window).scrollTop();
      if (h > 568) {
        $(".gotop").fadeIn();
      } else {
        $(".gotop").fadeOut();
      }
    });
  },
  created() {
    this.CarouselProducts();
  }
};
</script>

<style>
</style>