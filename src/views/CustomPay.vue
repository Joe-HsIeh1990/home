<template>
  <div class="bg-white">
    <loading :active.sync="isLoading"></loading>
    <div class="py-5 container CustomPay">
      <h1 class="text-center mb-4 text-secondary">訂單付款</h1>
      <div class="row mb-5">
        <div class="col-sm-4">
          <div class="alert alert-success rounded-pill text-center" role="alert">1.填寫訂單<font-awesome-icon icon="check" class="ml-2" /></div>
        </div>
        <div class="col-sm-4">
          <div class="alert alert-success rounded-pill text-center" role="alert">2.確認付款</div>
        </div>
        <div class="col-sm-4">
          <div class="alert bg-five rounded-pill text-center" role="alert">3.訂單完成</div>
        </div>
      </div>
      <div class="CustomPay-message mb-5">
        <h2 class="mb-0 py-2 pl-3 h4 border bg-first">訂單訊息</h2>
        <div class="subscriber px-0">
          <div class="py-2 px-3 CustomPay-list border">
            <span class="mr-3 data">姓名:</span>
            <span>{{ order.user.name }}</span>
          </div>
          <div class="py-2 px-3 CustomPay-list border">
            <span class="mr-3 data">Email:</span>
            <span>{{ order.user.email }}</span>
          </div>
          <div class="py-2 px-3 CustomPay-list border">
            <span class="mr-3 data">手機號碼:</span>
            <span>{{ order.user.tel }}</span>
          </div>
          <div class="py-2 px-3 CustomPay-list border">
            <span class="mr-3 data">地址:</span>
            <span>{{ order.user.address }}</span>
          </div>
          <div class="py-2 px-3 CustomPay-list border">
            <span class="mr-3 data">留言備註:</span>
            <span>{{ order.message }}</span>
          </div>
        </div>
      </div>

      <div class="CustomPay-data mb-5 border">
        <h2 class="mb-0 py-2 pl-3 h4 bg-first">訂單資料</h2>
        <div class="subscriber">
          <div class="py-2 px-3 CustomPay-list border">
            <span class="mr-3 data">訂單成立時間:</span>
            <span>{{order.create_at | timecurrency }}</span>
          </div>
          <div class="py-2 px-3 CustomPay-list border">
            <span class="mr-3 data">訂單編號:</span>
            <span>{{orderId}}</span>
          </div>
          <div class="py-2 px-3 CustomPay-list border">
            <span class="mr-3 data">總金額:</span>
            <span class="total">{{ order.total | currency }}</span>
          </div>
        </div>
      </div>

      <div class="CustomPay-pay border mb-3">
        <h2 class="mb-0 py-2 pl-3 h4 border bg-danger text-white">信用卡資訊</h2>
        <div class="creditcard px-3 pt-3">
          <ValidationObserver v-slot="{ invalid }">
            <form @submit.prevent="payOrder">
              <div class="py-2 CustomPay-card d-flex align-items-center">
                <label for="card-num">信用卡卡號:</label>
                <ValidationProvider
                  name="信用卡ID"
                  rules="required|cardnum"
                  v-slot="{ errors , classes }"
                >
                  <div :class="classes">
                    <input
                      type="text"
                      class="form-lists"
                      id="card-num"
                      name="card-num"
                      placeholder="請輸入16位信用卡卡號"
                      v-model="pay.id"
                    />
                    <span class="ml-md-2">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
              <div class="py-2 CustomPay-card d-flex align-items-center">
                <label for="card-date">有效期限:</label>
                <ValidationProvider name="有效期限" rules="required|carddate" v-slot="{ errors , classes }">
                  <div :class="classes">
                    <input
                      type="text"
                      class="form-lists"
                      id="card-date"
                      name="card-date"
                      placeholder="例: 0320"
                      v-model="pay.date"
                    />
                    <span class="ml-md-2">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
              <div class="py-2 form-group CustomPay-card d-flex align-items-center">
                <label for="card-pay">背面安全碼:</label>
                <ValidationProvider name="背面安全碼" rules="required|pay" v-slot="{ errors , classes }">
                  <div :class="classes">
                    <input
                      type="text"
                      class="form-lists"
                      id="card-pay"
                      name="card-pay"
                      placeholder="例: 540"
                      v-model="pay.num"
                    />
                    <span class="ml-md-2">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
              <div class="text-right py-2 my-3">
                <button type="submit" class="btn btn-danger" :disabled="invalid">確認付款</button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
    <check />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { ValidationObserver } from "vee-validate";
import $ from "jquery";
import check from "../components/CheckModal";
export default {
  name: "CustomPay",
  components: {
    ValidationObserver,
    check
  },
  data() {
    return {
      orderId: "",
      leave: false,
      pay: {
        id: "",
        date: "",
        num: "",
      }
    };
  },
  methods: {
    payOrder() {
      const vm = this;
      this.$store.dispatch("OrderModules/payOrder", this.orderId).then(() => {
        vm.leave = true;
      });
    }
  },
  computed: {
    ...mapGetters(["isLoading"]),
    ...mapGetters("OrderModules", ["order"])
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.$store.dispatch("OrderModules/getOrder", this.orderId);
  },
  beforeRouteLeave(to, from, next) {
    const vm = this;
    if (vm.leave) {
      next();
    } else {
      $("#check").modal("show");
      $(".determin").on("click", () => {
        next();
      });
      $(".cancel").on("click", () => {
        next(false);
      });
    }
  }
};
</script>