<template>
  <div class="admin-filter__item">
    <span>{{ $t(`admin.${filterName}`) }}</span>
    <div
      class="btn-group">
      <button
        class="btn btn-secondary dropdown-toggle text-truncate admin-filter__item-toggle"
        type="button"
        :id="`filter_${filterName}`"
        data-bs-toggle="dropdown"
        data-toggle="dropdown"
        aria-expanded="false"
      >
        {{ selectedFilter }}
      </button>
      <button
        @click="resetFilter"
        class="btn btn-secondary admin-filter__item-clear"
        type="button">
        <i class="el-icon-circle-close"></i>
      </button>
      <ul
          :class="['dropdown-menu', filterName]"
          :aria-labelledby="`filter_${filterName}`"
      >
        <li
            v-for="(item, index) in filterValues"
            :key="index"
            :data-filter-id="item.id"
            @click="selectFilter"
        >
          <a class="dropdown-item" href="#">
            {{ item.name_ru }}
          </a>
        </li>
      </ul>
    </div>
<!--    <button
      class="btn btn-secondary dropdown-toggle text-truncate"
      type="button"
      :id="`filter_${filterName}`"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {{ selectedFilter }}
    </button>-->

  </div>
</template>
<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/admin'

export default {
  name: 'AdminPanelFilterItem',
  props: {
    filterName: {
      type: String,
      required: true,
    },
    filterValues: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState({
      selectedFilter: function (state) {
        let selected = 'Не выбрано'

        if (!state.admin.filter) return 'Не выбрано'

        state.admin.filter.map((filter) => {
          if (filter.by == this.filterName)
            this.filterValues.map((value) => {
              if (value.id == filter.value) {
                selected = value.name_ru
              }
            })
        })

        return selected
      },
    }),
  },
  methods: {
    resetFilter(e){
      this.$store.dispatch(actionTypes.deleteFilter, {
        filter: {by: this.filterName},
      })
    },
    selectFilter(e) {
      let filter = e.currentTarget.dataset.filterId
      this.$store.dispatch(actionTypes.appendFilter, {
        filter: {by: this.filterName, value: filter},
      })
    },
  },
}
</script>
<style>
.dropdown-menu {
  position: relative;
  width: 100%;
  max-width: 55vw;
}

.dropdown-menu li a {
  word-wrap: break-word;
  white-space: normal;
}
</style>
