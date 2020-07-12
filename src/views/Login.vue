<template>
  <div class="login container-fluid d-flex justify-content-center align-items-center ">
    <loading :active.sync="isLoading"></loading>
    <div class="container d-flex justify-content-center align-items-center ">
      <form class="signin col-12 col-md-4 col-8 p-3 my-5 border border-dark rounded" @submit.prevent="signin">
        <div class="sigin-logo mb-3">
          <h4>管理員登入</h4>
        </div>
        <div class="form-group">
          <label for="Email1">Email</label>
          <input
            v-model="user.username"
            type="email"
            class="form-control"
            id="Email1"
            aria-describedby="emailHelp"
            placeholder="請輸入 Email"
          />
        </div>
        <div class="form-group">
          <label for="Password">Password</label>
          <input
            v-model="user.password"
            type="password"
            class="form-control"
            id="Password"
            placeholder="請輸入 Password"
          />
        </div>
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="remember" />
          <label class="form-check-label" for="remember">記住我</label>
        </div>
        <div>
          <button type="submit" class="btn btn-dark btn-lg btn-block">確認</button>
        </div>
        <div class="mt-3 pt-2  mx-auto container-md row justify-content-around ">
          <a href="#" class="col-3"><img src="../assets/images/iconfinder_3_939757.png" class="img-fluid" alt=""></a>
          <a href="#" class="col-3"><img src="../assets/images/iconfinder_25_social_2609558.png" class="img-fluid" alt=""></a>
          <a href="#" class="col-3"><img src="../assets/images/iconfinder_Google_1298745.png" class="img-fluid" alt=""></a>
          <a href="#" class="col-3"><img src="../assets/images/iconfinder_line_1807543.png" class="img-fluid" alt=""></a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    signin() {
      let vm = this;
      vm.$store.dispatch("AdminMemberModules/signin", vm.user).then(() => {
        vm.user.username = "";
        vm.user.password = "";
      });
    }
  },
  computed:{
    ...mapGetters(["isLoading"]),
  }
};
</script>
