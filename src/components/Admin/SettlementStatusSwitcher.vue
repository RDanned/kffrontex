<template>
  <div>
    <el-select
        v-model="status"
        size="small"
        @change="onStatusChange">
      <el-option
          v-for="item in statuses"
          :key="item.id"
          :label="item.name_ru"
          :value="item.id">
      </el-option>
    </el-select>
    <el-dialog
      :visible.sync="dialogVisible"
      append-to-body
      :show-close="false"
      :close-on-click-modal="false"
      @close="onDialogClose"
      >
      <el-form :model="form" :rules="form_rules" ref="Form">
        <el-form-item label="Дата вселения" prop="checkin_date">
          <el-date-picker
              v-model="form.checkin_date"
              type="date"
              placeholder="Выберите дату"
              :picker-options="{firstDayOfWeek: 1}">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="Номер комнаты" prop="room">
          <el-input v-model="form.room"></el-input>
        </el-form-item>
        <el-form-item label="Номер приказа" prop="checkin_order">
          <el-input v-model="form.checkin_order"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onDialogSubmit">Сохранить</el-button>
          <el-button @click="onDialogCancel">Отмена</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import adminApi from '@/api/admin'
import {actionTypes as adminActions} from '@/store/modules/admin'

export default {
  props: ['value', 'applicationId'],
  data(){
    return {
      status: null,
      statuses: [],
      // status id of checking in
      checkInStatus: 1,
      dialogVisible: false,
      form: {
        room: '',
        checkin_order: '',
        checkin_date: '',
      },
      form_rules: {
        room: [
          { required: true, message: 'Введите номер комнаты', trigger: 'blur' }
        ],
        checkin_order: [
          { required: true, message: 'Введите номер приказа', trigger: 'blur' }
        ],
        checkin_date: [
          { required: true, message: 'Введите дату вселения', trigger: 'blur' }
        ],
      }
    }
  },
  mounted() {
    this.status = this.value
    this.statuses = adminApi.getSettlementStatuses()
  },
  methods: {
    changeApplicationStatus(newStatus) {
      if (newStatus !== this.value){
        this.$store.dispatch(adminActions.setSettlementStatus, {
          applicationId: this.applicationId,
          status: Number(newStatus),
          data: this.form
        })
        .then(() => {
          this.$message({
            message: 'Статус заявки обновлен',
            type: 'success'
          })
          //this.$store.dispatch(adminActions.setNeedReload, {needReload: true})
        })
      }
    },
    onStatusChange(newStatus){
      if(newStatus === this.checkInStatus) {
        this.dialogVisible = true
      } else {
        this.changeApplicationStatus(newStatus)
      }
    },
    onDialogSubmit(){
      this.$refs.Form.validate((valid) => {
        if(valid){
          this.changeApplicationStatus(this.status)
          this.dialogVisible = false
        } else {
          return false
        }
      })
    },
    onDialogCancel(){
      this.dialogVisible = false
    },
    onDialogClose(){
      this.$refs.Form.resetFields()
      this.status = this.value
    }
  },
  watch: {
    value(val){
      this.status = val
    }
  }
}
</script>