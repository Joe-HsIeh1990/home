<template>
  <nav class="dropdown">
    <button
      class="btn btn-secondary dropdown-toggle"
      type="button"
      id="dropdownMenuButton"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >頁面</button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item" v-for=" page in pages.total_pages" :pages="page" :key="page" :class="{active : pages.current_page === page}" @click.prevent="getPages(page)" href="#">{{ page }}</a>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'paginationPhone',
  props: {
    pages: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    getPages(page) {
      this.$store.dispatch("ProductsModules/GetProducts", page);
    }
  }
};
</script>

<style>
</style>