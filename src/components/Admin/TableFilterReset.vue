<template>
  <button class="btn btn-primary admin-filter__reset" @click="resetFilter">
    Сбросить фильтр
  </button>
</template>
<script>
import {actionTypes} from '@/store/modules/admin'

export default {
  name: 'AdminPanelFilterReset',
  methods: {
    resetFilter: function () {
      this.$emit('reset')
      this.$store.dispatch(actionTypes.resetFilter)
    },
  },
}
</script>
