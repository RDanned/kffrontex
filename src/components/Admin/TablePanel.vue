<template>
  <div class="row">
    <table-search />
    <div class="col-xl-7 col-8">
      <table-filter />
    </div>
    <div class="col-xl-5 col-4">
      <div class="row">
        <div class="col-12">
          <table-print />
          <table-print-all />
        </div>
        <div class="col-12">
<!--          <table-selection-actions />-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TablePrint from '@/components/Admin/TablePrint'
import TablePrintAll from '@/components/Admin/TablePrintAll'
import TableFilter from '@/components/Admin/TableFilter'
import TableSearch from '@/components/Admin/TableSearch'
import TableSelectionActions from '@/components/Admin/TableSelectionActions'

export default {
  components: {
    TableSearch,
    TableFilter,
    TablePrint,
    TablePrintAll,
    TableSelectionActions
  },
}
</script>
