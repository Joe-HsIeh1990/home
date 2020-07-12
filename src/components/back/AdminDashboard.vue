<template>
  <div class="backtail">
    <div class="container-fluid px-0">
      <div class="d-flex flex-md-row flex-column" >
        <AdminNav class="col-md-2 px-0" />
        <main class="col-md-10">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>
<script>
import AdminNav from "./AdminNav";
export default {
  name: 'TitleCarousel',
  components: {
    AdminNav
  },
  data() {
    return {};
  }
};
</script>
<style>
.backtail{
  background-color: #fff;
  height: 100%;
}
</style>