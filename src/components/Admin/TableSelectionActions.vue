<template>
  <div class="row">
    <div class="table-actions-title">
      Действия с выбранными записями
    </div>
    <div class="table-actions-wrapper">
      <el-button :disabled="enableButtons">Отправить в корзину</el-button>
      <el-button :disabled="enableButtons">Изменить статус заявки</el-button>
      <el-button :disabled="enableButtons">Изменить статус вселения</el-button>
      <el-button :disabled="enableButtons">Распечать выбраные записи</el-button>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'

export default {
  data(){
    return {

    }
  },
  computed: {
    ...mapState({
      selectedItems: state => state.admin.selectedItems,
      enableButtons: state => Boolean(state.admin.selectedItems())
    })
  },
  methods: {
    toBasket(){

    },
    changeApplicationStatus(){

    },
    changeSettlementStatus(){

    }
  }
}
</script>