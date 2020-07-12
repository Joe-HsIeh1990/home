<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination mb-0">
      <li class="page-item" :class="{disabled: !pages.has_pre}">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="getPages(pages.current_page-1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for=" page in pages.total_pages"
        :pages="page"
        :key="page"
        :class="{active : pages.current_page === page}"
      >
        <a class="page-link" href="#" @click.prevent="getPages(page)">{{page}}</a>
      </li>
      <li class="page-item" :class="{disabled: !pages.has_next}">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="getPages(pages.current_page+1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    pages: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    getPages(page) {
      this.$emit("emitPages", page);
    }
  }
};
</script>
