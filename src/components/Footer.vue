<template>
  <footer>
    <footer class="foot">
      <div class="foot-container">
        <div class="foot-top d-flex justify-content-betweem">
          <ul class="top-content d-flex align-items-center list-unstyled">
            <router-link to="/" class="text-decoration-none">
              <li class="top-item">
                <a href="#">首頁</a>
              </li>
            </router-link>
            <router-link to="/custom/products" class="text-decoration-none">
              <li class="top-item">
                <a href="#">商品</a>
              </li>
            </router-link>
          </ul>
          <div class="top-img d-flex">
            <a href="#">
              <img
                src="https://raw.githubusercontent.com/hexschool/webLayoutTraining1st/master/week3/icon-fb.svg"
                alt
              />
            </a>
            <a href="#">
              <img
                src="https://raw.githubusercontent.com/hexschool/webLayoutTraining1st/master/week3/icon-ig.svg"
                alt
              />
            </a>
            <a href="#">
              <img
                src="https://raw.githubusercontent.com/hexschool/webLayoutTraining1st/master/week3/icon-line.svg"
                alt
              />
            </a>
          </div>
        </div>
        <div class="foot-main d-flex justify-ph-content-betweem">
          <div class="main-container">
            <div class="main-item d-flex align-items-center">
              <img
                src="https://raw.githubusercontent.com/hexschool/webLayoutTraining1st/master/week3/icon-phone.svg"
                alt
              />
              <h2 class="main-first">0800-000-000</h2>
            </div>
            <div class="main-item d-flex align-items-center">
              <img
                src="https://raw.githubusercontent.com/hexschool/webLayoutTraining1st/master/week3/icon-mail.svg"
                alt
              />
              <h2 class="main-sec">ring@business.com</h2>
            </div>
          </div>
        </div>
        <div class="foot-bottom d-flex flex-wrap justify-content-betweem align-items-center">
          <div class="bottom-item d-flex align-items-center">
            <p>Copyright © 2020 The lord of the rings rights reserved.</p>
          </div>
          <div class="bottom-item d-flex flex-ph-column">
            <a href="#">隱私權政策</a>
            <a href="#">服務條款</a>
          </div>
        </div>
        <div class="foot-operation pb-3">
          <p class="text-white">僅個人練習使用，不做任何商業用途,圖片等相關物件所有權皆為英國Games WorkShop所有。</p>
        </div>
      </div>
    </footer>
  </footer>
</template>

<script>
export default {
  name:'Footer'
};
</script>

<style>
</style>