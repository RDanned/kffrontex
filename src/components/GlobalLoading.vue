<template>
  <div></div>
</template>
<script>
import '@/assets/css/global_loading.css'
import {mapState} from 'vuex'

export default {
  data(){
    return {
      notification: null
    }
  },
  mounted() {

  },
  computed: {
    ...mapState({
      globalLoading: state => state.app.globalLoading
    })
  },
  watch: {
    globalLoading(val){
      if(val){
        this.notification = this.$notify({
          message: 'Загрузка',
          duration: 0,
          showClose: false,
          type: 'info',
          customClass: 'global-loading'
        })
      } else {
        if(this.notification) this.notification.close()
      }
    }
  }
}
</script>