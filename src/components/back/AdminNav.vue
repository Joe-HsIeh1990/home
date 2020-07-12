<template>
  <div>
    <nav class="navback d-flex justify-content-center bg-dark sidebar">
      <div class="d-flex d-md-block align-items-center justify-content-between col-12">
        <h6
          class="sidebar-heading d-flex justify-content-md-between align-items-md-center px-3 mt-4 mb-4 text-center"
        >
          <div class="mx-md-auto mb-md-3 mr-3">
            <p>管理員</p>
          </div>
        </h6>
        <ul
          class="navback-content d-flex flex-md-column flex-row mb-0 mb-md-3 justify-content-between align-items-center list-unstyled"
        >
          <li class="nav-item text-center mr-3 mr-md-0 mb-md-5">
            <router-link to="/admin/adminproduct" class="text-decoration-none text-white mb-0">產品列表</router-link>
          </li>
          <li class="nav-item text-center mb-0 mr-3 mr-md-0 mb-md-5">
            <router-link to="/admin/adminorder" class="text-decoration-none text-white">訂單列表</router-link>
          </li>
          <li class="nav-item text-center mb-0 mr-3 mr-md-0 mb-md-5">
            <router-link to="/admin/admincoupones" class="text-decoration-none text-white">優惠卷</router-link>
          </li>
        </ul>
        <div class="d-flex justify-content-center align-content-center">
          <button class="m-auto brn btn-danger" @click="signout()">登出</button>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'AdminNav',
  methods: {
    signout() {
      this.$store.dispatch("AdminMemberModules/signout");
    }
  }
};
</script>