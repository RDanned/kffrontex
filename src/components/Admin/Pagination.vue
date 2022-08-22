<template>
  <el-pagination
      class="table-pagination"
      :page-size="pageSize"
      :pager-count="pagerCount"
      @current-change="changePage"
      layout="prev, pager, next"
      background
      :total="totalCount">
  </el-pagination>
</template>
<script>
import {actionTypes as adminActions} from "@/store/modules/admin";

export default {
  props: ['pageSize', 'totalCount', 'pagerCount'],
  methods: {
    changePage(page) {
      this.$store.dispatch(adminActions.setPage, {page})
      this.$emit('page-switched')
    },
  }
}
</script>