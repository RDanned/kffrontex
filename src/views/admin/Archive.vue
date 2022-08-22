<template>
  <div class="admin-wrapper">
    <div class="admin-table-header">
      <div class="row">
        <table-panel />
      </div>
      <div class="row">
        <div class="col-12">
          <el-divider />
        </div>
      </div>
    </div>
    <div class="admin-table-wrapper">
      <el-table
          v-loading="loading"
          class="admin-table"
          @sort-change="onSort"
          :data="data"
          @selection-change="handleSelectionChange">
        <el-table-column
            prop="ordinal_number"
            sort-by="ordinal_number"
            label="#"
            width="60"
            sortable="custom">
        </el-table-column>
        <el-table-column
            prop="full_name"
            sort-by="full_name"
            label="ФИО"
            width="200"
            sortable="custom">
        </el-table-column>
        <el-table-column
            prop="gender"
            sort-by="gender"
            label="Пол"
            width="100"
            sortable="custom"
            :formatter="genderFormatter">
        </el-table-column>
        <el-table-column
            prop="study_place.name_ru"
            sort-by="study_place.id"
            label="Место обучения"
            width="150"
            sortable="custom">
        </el-table-column>
        <el-table-column
            prop="payment_method.name_ru"
            sort-by="payment_method.id"
            label="Способ оплаты"
            width="80"
            sortable="custom">
        </el-table-column>
        <el-table-column
            prop="date_insert"
            sort-by="date_insert"
            label="Дата подачи заявки"
            width="100"
            sortable="custom"
            :formatter="dateFormatter">
        </el-table-column>
        <el-table-column
            prop="social_status.name_ru"
            sort-by="social_status.id"
            label="Социальный статус"
            width="300"
            sortable="custom"
            class-name="social-status">
          <template #default="scope">
            {{scope.row.social_status ? scope.row.social_status.name_ru : '-'}}
          </template>
        </el-table-column>
        <el-table-column
            prop="status"
            sort-by="status"
            label="Статус заявки"
            width="180"
            sortable="custom">
          <template #default="scope">
            <application-status-switcher v-model="scope.row.status" :application-id="scope.row.id"/>
          </template>
        </el-table-column>
        <el-table-column
            prop="settlement_status"
            sort-by="settlement_status"
            label="Статус вселения"
            width="180"
            sortable="custom">
          <template #default="scope">
            <settlement-status-switcher v-model="scope.row.settlement_status" :application-id="scope.row.id"/>
          </template>
        </el-table-column>
        <el-table-column
            prop="checkin_date"
            sort-by="checkin_date"
            label="Дата вселения"
            width="100"
            sortable="custom"
            :formatter="dateFormatter">
        </el-table-column>
        <el-table-column
            prop="checkout_date"
            sort-by="checkout_date"
            label="Дата выселения"
            width="300"
            sortable="custom"
            :formatter="dateFormatter">
        </el-table-column>
        <el-table-column
            label="Операции"
            width="200"
            fixed="right">
          <template #default="scope">
            <button
                type="button"
                class="btn btn-warning mt-0 float-left"
                @click="openModal(scope.row.id)"
            >
              Ещё...
            </button>
            <delete-application-btn :show="!scope.row.deleted" :application-id="scope.row.id" @deleted="onApplicationDelete"/>
            <restore-application-btn :show="scope.row.deleted" :application-id="scope.row.id" @restored="onApplicationRestore"/>
            <copy-application-link-btn :application-id="scope.row.id"/>
          </template>
        </el-table-column>
      </el-table>
      <pagination
          :page-size="pageSize"
          :pager-count="pagerCount"
          @page-switched="onPageSwitched"
          :total-count="totalCount" />
      <admin-pagination-selector/>
      <list-item-detail-new/>
    </div>
  </div>
</template>
<script>
import '@/assets/libs/bootstrap/js/bootstrap'
import {actionTypes as adminActions} from '@/store/modules/admin'
import table from '@/mixins/table'
import AdminPanel from '@/components/AdminPanel'
import ListItemDetailNew from '@/components/ListItemDetailNew'
import AdminPaginationSelector from '@/components/AdminPaginationSelector'
import ApplicationStatusSwitcher from '@/components/Admin/ApplicationStatusSwitcher'
import SettlementStatusSwitcher from '@/components/Admin/SettlementStatusSwitcher'
import DeleteApplicationBtn from '@/components/Admin/DeleteApplicationBtn'
import RestoreApplicationBtn from '@/components/Admin/RestoreApplicationBtn'
import Pagination from '@/components/Admin/Pagination'
import TableSelectionActions from '@/components/Admin/TableSelectionActions'
import TablePanel from '@/components/Admin/TablePanel'
import CopyApplicationLinkBtn from '@/components/Admin/CopyApplicationLinkBtn'

export default {
  mixins: [table],
  components: {
    AdminPanel,
    ListItemDetailNew,
    AdminPaginationSelector,
    ApplicationStatusSwitcher,
    SettlementStatusSwitcher,
    DeleteApplicationBtn,
    RestoreApplicationBtn,
    Pagination,
    TableSelectionActions,
    TablePanel,
    CopyApplicationLinkBtn
  },
  mounted() {
    this.$store.dispatch(adminActions.setCategory, {category: 'archive'})
  },
}
</script>
