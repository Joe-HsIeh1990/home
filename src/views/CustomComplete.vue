<template>
  <div class="pt-8 container CustomComplete bg-white">
    <h1 class="text-center mb-4 text-secondary">付款成功</h1>
    <div class="row mb-7">
      <div class="col-sm-4">
        <div class="alert alert-success rounded-pill text-center" role="alert">
          1.填寫訂單<font-awesome-icon icon="check" class="ml-2" />
        </div>
      </div>
      <div class="col-sm-4">
        <div class="alert alert-success rounded-pill text-center" role="alert">
          2.確認付款<font-awesome-icon icon="check" class="ml-2" />
        </div>
      </div>
      <div class="col-sm-4">
        <div class="alert  alert-success rounded-pill text-center" role="alert">
          3.訂單完成<font-awesome-icon icon="check" class="ml-2" />
        </div>
      </div>
    </div>
    <div class="px-3 py-sm-5 py-4 CustomComplete-content mb-sm-8 mb-6">
      <h4 class="text-center mb-4">感謝您的訂購，歡迎您再次光臨!</h4>
      <div class="mx-auto CompleteOrders mb-1">
        <span class="mr-2">訂單完成時間:</span>
        <span class="info" v-if="order.id">{{order.paid_date | timecurrency}}</span>
      </div>
      <div class="mx-auto CompleteOrder mb-1">
        <span class="mr-2">您的訂單編號:</span>
        <span class="info" v-if="order.id">{{order.id}}</span>
      </div>
      <div class="mx-auto CompleteOrder mb-5">
        <span class="mr-2">您的訂單金額:</span>
        <span class="info" v-if="order.id">{{ order.total | currency }}</span>
      </div>
      <p class="mb-1 text-secondary">您的訂單將會在7個工作天內處理完成。</p>
      <p class="mb-1 text-secondary">如遇國定連假、寒暑假旺季則在7個工作天內處理完成。</p>
      <p class="mb-0 text-secondary">如有其它需求，請致電客服0800-000-000將有客服專員為您服務。</p>
    </div>
    <div class="text-center mb-2">
      <button type="button" class="btn btn-dark " @click="toProducts">繼續選購</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'CustomComplete',
  methods: {
    toProducts() {
      this.$router.push('/custom/products');
    },
  },
  computed: {
    ...mapGetters('OrderModules', ['order']),
  },
  created() {
    this.$store.dispatch('OrderModules/getOrder', this.$route.params.orderId);
  },
};
</script>