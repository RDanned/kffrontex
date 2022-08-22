<template>
  <button
    v-if="show"
    class="trash-btn btn btn-warning mt-0 float-left"
    @click="restoreApplication"
  >
    <font-awesome-icon icon="trash-restore" />
  </button>
</template>
<script>
import {actionTypes as adminActions} from '@/store/modules/admin'

export default {
  props: ['applicationId', 'show'],
  methods: {
    restoreApplication: function () {
      this.$store.dispatch(adminActions.restoreApplication, {
        applicationId: this.applicationId
      })
      .then(() => this.$emit('restored'))
    },
  }
}
</script>