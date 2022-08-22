<template>
  <el-button type="info" class="btn btn-info admin-print" @click="print">
    Распечатать все записи
  </el-button>
</template>
<script>
import adminApi from '@/api/admin'
import {mapState} from 'vuex'
import {printFile} from '@/helpers/applicants'

export default {
  computed: {
    ...mapState({
      category: state => state.admin.category,
      page: state => state.admin.page,
      pageSize: state => state.admin.pageSize,
      searchString: state => state.admin.searchString,
      filter: state => state.admin.filter
    })
  },
  methods: {
    print: function () {
      let applicationsIds = this.$store.state.admin.printIds
      if(applicationsIds.length > 0)
      adminApi.getReportAll({
        category: this.category,
        searchString: this.searchString,
        filters: this.filter
      }).then((response) => {
        printFile(response.data, 'Список заявителей.docx')
      })
    },
  },
}
</script>
