<template>
  <div
    class="modal fade"
    id="check"
    tabindex="-1"
    role="dialog"
    aria-labelledby="checkCenterTitle"
    aria-hidden="true"
    data-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body leave-modal">
          <p>您的訂單尚未付款，確定要離開此頁?</p>
          <div class="text-right">
            <button type="button" class="mr-2 btn btn-danger determin" data-dismiss="modal">確定</button>
            <button type="button" class="cancel btn btn-dark" data-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CheckModal'
};
</script>
