<template>
  <div>
    <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="deleteName.price">刪除商品</span><span v-if="deleteName.percent">刪除優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{deleteName.title}} </strong> <span v-if="deleteName.price">商品</span><span v-if="deleteName.percent">優惠券</span>(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteit"
              >確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AminDeleteModal',
  props: {
    deleteName: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    deleteit() {
      this.$emit('deletethis');
    },
  },
};
</script>