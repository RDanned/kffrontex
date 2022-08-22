<template>
  <nav aria-label="Page navigation example">
    <p>Количество записей на 1 странице</p>
    <ul class="pagination" v-if="pageSizes">
      <li
        :class="['page-item', {active: pageSize == currentPageSize}]"
        v-for="(pageSize, index) in pageSizes"
        :key="index"
      >
        <a
          class="page-link"
          href="javascript:void(0);"
          :data-page-size="pageSize"
          @click="changePageSize"
          >{{ pageSize }}</a
        >
      </li>
    </ul>
  </nav>
</template>
<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/admin'

export default {
  data() {
    return {
      pageSizes: [10, 20, 50, 100],
    }
  },
  props: {
    category: {
      type: String,
    },
    pageCount: {
      type: Number,
    },
  },
  computed: {
    ...mapState({
      currentPageSize: (state) => state.admin.pageSize,
    }),
  },
  methods: {
    changePageSize: function (e) {
      let pageSize = e.currentTarget.dataset.pageSize
      this.$store.dispatch(actionTypes.setPageSize, {pageSize})
    },
  },
}
</script>
