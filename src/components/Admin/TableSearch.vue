<template>
  <div class="input-group mb-2 col-12">
    <span class="input-group-text" id="basic-addon">Поиск по ФИО</span>
    <input
        type="text"
        class="form-control"
        placeholder="ФИО"
        aria-label="ФИО"
        aria-describedby="basic-addon"
        v-model="query"
        @keypress="searchByPressEnter"
    />
    <el-button type="primary" @click="search">
      Искать
    </el-button>
    <el-button type="info" @click="clear">
      Сбросить
    </el-button>
  </div>
</template>
<script>
import {actionTypes} from '@/store/modules/admin'

export default {
  name: 'AdminPanelSearch',
  data(){
    return {
      query: ''
    }
  },
  methods: {
    search() {
      let searchString = this.query
      this.$store.dispatch(actionTypes.setSearchString, {searchString})
    },
    searchByPressEnter(e){
      if (e.key === "Enter") {
        this.search()
      }
    },
    clear(){
      this.$store.dispatch(actionTypes.setSearchString, {searchString: ''})
    }
  }
}
</script>
