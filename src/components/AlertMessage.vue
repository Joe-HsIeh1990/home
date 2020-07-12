<template>
  <div class="message-alert">
    <div class="alert alert-dismissible"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages" :key="i">
      {{ item.message }}
      <button type="button" class="close" @click="REMOVEMESSAGE(i)" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: 'AlertMessage',
  methods: {
    ...mapMutations('AlertModules', ['REMOVEMESSAGE']), 
  },
  computed: {
    ...mapGetters('AlertModules', ['messages']),
  },
};
</script>

<style lang="scss" scope>
.message-alert {
  position: fixed;
  max-width: 265px;
  top: 60px;
  right: 20px;
  z-index: 1100;
  .close{
    outline: 0;
    &:focus{
      outline: 0;
    }
  }
}
</style>