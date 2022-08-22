<template>
  <div class="admin-filter">
    <div class="admin-filter-controls">
      <button class="btn btn-info toggle-filter" @click="toggleFilter">
        {{ showFilter ? 'Скрыть фильтр' : 'Показать фильтр' }}
      </button>
      <table-filter-reset @reset="clearDateFilter"/>
    </div>
    <div class="admin-filter-list" v-if="showFilter">
      <table-filter-item
          v-for="(item, index) in filterData"
          :key="index"
          :filter-name="index"
          :filter-values="item"
      />
      <div class="admin-filter__item">
        <span>По дате</span>
        <el-date-picker
            v-model="dateRange"
            @change="filterByDate"
            type="daterange"
            range-separator="по"
            start-placeholder="Начальная дата"
            end-placeholder="Конечная дата">
        </el-date-picker>
      </div>
    </div>
  </div>
</template>
<script>
import adminApi from '@/api/admin'
import TableFilterItem from '@/components/Admin/TableFilterItem'
import TableFilterReset from '@/components/Admin/TableFilterReset'
import {actionTypes} from '@/store/modules/admin'

export default {
  components: {
    TableFilterItem,
    TableFilterReset
  },
  data(){
    return {
      dateRange: null,
      filterData: {},
      showFilter: false,
    }
  },
  mounted() {
    adminApi.getFilterData().then((data) => {
      let study_place = data.study_places.map((item) => item)
      let payment_method = data.payment_methods.map((item) => item)
      let social_status = data.social_statuses.map((item) => item)

      this.filterData = {
        study_place,
        payment_method,
        social_status,
        status: adminApi.getApplicationStatuses(),
        settlement_status: adminApi.getSettlementStatuses(),
      }
    })
  },
  methods: {
    toggleFilter() {
      this.showFilter = !this.showFilter
    },
    filterByDate(){
      let filter = 'period'
      if(this.dateRange) {
        this.$store.dispatch(actionTypes.appendFilter, {
          filter: {by: filter, value: this.dateRange},
        })
      } else {
        this.$store.dispatch(actionTypes.deleteFilter, {
          filter: {by: filter},
        })
      }
    },
    clearDateFilter(){
      this.dateRange = null
    }
  },
}
</script>