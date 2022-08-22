<template>
  <div class="application-detail" v-loading="loading">
    <template v-if="!isExists && loaded">
      <not-found404 text="Заявление не найдено"/>
    </template>
    <item-detail v-else />
  </div>
</template>
<script>
import table from '@/mixins/table'
import applicationApi from '@/api/application'
import ItemDetail from '@/components/Admin/ItemDetail'
import {actionTypes as modalActions} from '@/store/modules/modal'
import NotFound404 from '@/components/NotFound404'
import {mapState} from 'vuex'

export default {
  mixins: [table],
  components: {
    NotFound404,
    ItemDetail
  },
  data(){
    return {
      loaded: false,
      loading: true
    }
  },
  computed: {
    ...mapState({
      isExists: state => Boolean(state.modal.applicationDetail)
    })
  },
  mounted() {
    applicationApi.getApplication(this.$route.params.id)
        .then(response => {
          this.$store.dispatch(modalActions.setApplicationDetail, {
            application: response.data,
          })
          this.loading = false
          this.loaded = true
        })
        .catch(response => {
          this.loading = false
          this.loaded = true
          console.log('error')
          console.log(response)
        })
  }
}
</script>