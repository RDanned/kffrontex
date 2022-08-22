<template>
  <button
    v-if="show"
    class="trash-btn btn btn-warning mt-0 float-left"
    @click="deleteApplication"
  >
    <font-awesome-icon icon="trash" />
  </button>
</template>
<script>
import {actionTypes as adminActions} from '@/store/modules/admin'

export default {
  props: ['applicationId', 'show'],
  methods: {
    deleteApplication: function () {
      this.$store.dispatch(adminActions.softDeleteApplication, {
        applicationId: this.applicationId,
      })
      .then(() => this.$emit('deleted'))
    },
  }
}
</script>