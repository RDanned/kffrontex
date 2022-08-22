<template>
  <div class="container-fluid mt-2">
    <div class="row">
      <global-loading />
      <div class="col-2"><admin-menu /></div>
      <div class="col-10">
        <router-view name="default" />
<!--        <list-item-detail />-->
        <list-item-evict />
      </div>
    </div>
  </div>
</template>
<script>
import '@/assets/css/admin.css'
import AdminMenu from '@/components/AdminMenu'
import ListItemDetail from '@/components/ListItemDetail'
import ListItemEvict from '@/components/ListItemEvict'
import GlobalLoading from '@/components/GlobalLoading'
import axios from 'axios'
import {getItem} from '@/helpers/persistanceStorage'
import {actionTypes as appActions} from '@/store/modules/app'

export default {
  components: {ListItemEvict, AdminMenu, ListItemDetail, GlobalLoading},
  mounted() {
    axios.interceptors.request.use((config) => {
      this.$store.dispatch(appActions.setGlobalLoading, {loading: true})
      return config
    })
    axios.interceptors.response.use((response) => {
      this.$store.dispatch(appActions.setGlobalLoading, {loading: false})
      return response
    })
  },
}
</script>
