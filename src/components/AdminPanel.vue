<template>
  <div class="admin-panel row">
    <admin-panel-search />
    <div class="admin-filter col-10 col-xl-9 col-xxl-8">
      <div class="admin-filter-controls">
        <button class="btn btn-info toggle-filter" @click="toggleFilter">
          {{ showFilter ? 'Скрыть фильтр' : 'Показать фильтр' }}
        </button>
        <admin-panel-filter-reset />
      </div>
      <div class="admin-filter-list" v-if="showFilter">
        <admin-panel-filter-item
          v-for="(item, index) in filterData"
          :key="index"
          :filter-name="index"
          :filter-values="item"
        />
      </div>
    </div>
    <admin-panel-print />
    <!--    <router-link :to="{name: 'print'}">Распечатать (2 вариант)</router-link>-->
  </div>
</template>

<script>
//import formApi from '@/api/form'
import adminApi from '@/api/admin'
import AdminPanelSearch from '@/components/AdminPanelSearch'
import AdminPanelFilterItem from '@/components/AdminPanelFilterItem'
import AdminPanelFilterReset from '@/components/AdminPanelFilterReset'
import AdminPanelPrint from '@/components/AdminPanelPrint'

// depreciated
export default {
  components: {
    AdminPanelSearch,
    AdminPanelFilterItem,
    AdminPanelFilterReset,
    AdminPanelPrint,
  },
  data: function () {
    return {
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
    /*formApi.getFormData().then((response) => {
      let study_place = response.data.study_places.map((item) => item)
      let payment_method = response.data.payment_methods.map((item) => item)

      this.filterData = {
        study_place,
        payment_method,
        application_status: adminApi.getApplicationStatuses(),
        settlement_status: adminApi.getSettlementStatuses(),
      }
    })*/
  },
  methods: {
    toggleFilter() {
      this.showFilter = !this.showFilter
    },
  },
}
</script>

<style scoped>
.admin-panel {
  margin-top: 25px;
  margin-bottom: 25px;
}

.toggle-filter {
  min-width: 150px;
  width: fit-content;
  height: 40px;
}
</style>
