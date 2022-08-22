import '@/assets/libs/bootstrap/js/bootstrap'
import {mapState} from 'vuex'
import {actionTypes as adminActions} from '@/store/modules/admin'
import {date_default_format, gender_formatter, get_country_name, get_region_name} from '@/helpers/formatters'
import {actionTypes as modalActions} from "@/store/modules/modal";

export default {
  data() {
    return {
      showModal: false,
      modalApplication: {},
      pageCount: 0,
      pagerCount: 11,
      multipleSelection: [],
      loading: false,
    }
  },
  computed: {
    ...mapState({
      category: state => state.admin.category,
      sorting: state => state.admin.sorting,
      data: state => state.admin.data,
      page: state => state.admin.page,
      filter: state => state.admin.filter,
      pageSize: state => Number(state.admin.pageSize),
      totalCount: state => state.admin.count,
      searchString: state => state.admin.searchString,
      needReload: state => state.admin.needReload
    }),
  },
  mounted() {
    this.$store.dispatch(adminActions.setCategory, {category: 'all'})
  },
  methods: {
    onPageSwitched(){
      //console.log('onPageSwitched')
      //this.getList()
    },
    onApplicationDelete(){
      this.$message('Заявление удалено')
      this.getList()
    },
    onApplicationRestore(){
      this.$message('Заявление востановлено')
      this.getList()
    },
    onSort({column, prop, order}) {
      let direction = order
      let by = column.sortBy
      this.$store.dispatch(adminActions.setSorting, {by, direction})
    },
    /*changePage(page) {
      this.$store.dispatch(adminActions.setPage, {page})
      this.getList()
    },*/
    dateFormatter(row, column, cellValue, index) {
      if(cellValue === null) return '-'
      return date_default_format(cellValue)
    },
    addressFormatter(row, column, cellValue, index){
      let address = ""
      if(row.country) address += get_country_name(row.country, this.$i18n.locale)
      if(row.country === 'KAZ') address += ', ' + get_region_name(row.region, this.$i18n.locale)
      if(get_region_name(row.region, this.$i18n.locale) !== row.city) address += `, ${row.city}`
      address += `, ул.${row.street} ${row.house}`
      if(row.flat) address += `, кв.${row.flat}`

      return address
    },
    genderFormatter(row, column, cellValue, index) {
      return gender_formatter(cellValue)
    },
    openModal: function (id) {
      let modalApplication = this.data.filter((app) => {
        return app.id === id
      })[0]
      this.$store.dispatch(modalActions.setApplicationDetail, {
        application: modalApplication,
      })
    },
    closeModal: function () {
      this.showModal = false
    },
    handleSelectionChange(selectedItems) {
      this.$store.dispatch(adminActions.setSelectedItems, selectedItems)
    },
    getList(){
      this.loading = true
      return this.$store.dispatch(adminActions.getDataByCategory).then(
        () => {
          this.$store.dispatch(adminActions.setPrintIds, {
            printIds: this.data.map((item) => item.id),
          })
          this.loading = false
        }
      )
    }
  },
  watch: {
    filter() {
      this.$store.dispatch(adminActions.setPage, {page: 1})
      this.getList()
    },
    pageSize() {
      this.$store.dispatch(adminActions.setPage, {page: 1})
      this.getList()
    },
    searchString() {
      this.$store.dispatch(adminActions.setPage, {page: 1})
      this.getList()
    },
    sorting: {
      deep: true,
      handler() {
        this.$store.dispatch(adminActions.setPage, {page: 1})
        this.getList()
      }
    },
    category(val){
      if(val){
        this.getList()
      }
    },
    needReload(val){
      if(val) {
        this.getList()
        this.$store.dispatch(adminActions.setNeedReload, {needReload: false})
      }
    },
    page(val){
      this.getList()
    }
  }
}
