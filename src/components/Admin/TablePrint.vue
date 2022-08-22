<template>
  <el-button type="info" class="btn btn-info admin-print" @click="print">
    Распечатать отображенные записи
  </el-button>
</template>
<script>
import adminApi from '@/api/admin'
import {printFile} from '@/helpers/applicants'

export default {
  methods: {
    print: function () {
      let applicationsIds = this.$store.state.admin.printIds

      if(applicationsIds.length > 0)
      adminApi.getReport([applicationsIds]).then((response) => {
        printFile(response.data, 'Список заявителей.docx')
      })
    },
  },
}
</script>
