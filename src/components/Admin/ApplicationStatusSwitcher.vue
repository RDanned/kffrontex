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
        custom-class="rejection-modal"
        @close="onDialogClose"
    >
      <el-form :model="form" :rules="form_rules" ref="Form">
        <el-form-item class="rejection-radios" label="Причина отказа" prop="rejection_reason">
          <el-radio-group v-model="rejectionReasonType">
            <el-radio :label="1">Ваша заявка оформлена неправильно, пожалуйста повторите</el-radio>
            <el-radio :label="2">Проживающим в г.Усть-Каменогорске общежитие не предоставляется</el-radio>
            <el-radio class="other-reason" :label="3">
              Другое:
              <el-divider direction="vertical"/>
              <el-input
                  :disabled="rejectionReasonType !== 3"
                  :rows="2"
                  type="textarea"
                  v-model="rejectionReasonOther">
              </el-input>
            </el-radio>
          </el-radio-group>
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
import {actionTypes as adminActions} from "@/store/modules/admin";
import { Message } from 'element-ui';

export default {
  props: ['value', 'applicationId'],
  data(){
    return {
      status: null,
      statuses: [],
      // status rejection
      rejectionReasonType: null,
      rejectionReasons: {
        1: 'Ваша заявка оформлена неправильно, пожалуйста повторите',
        2: 'Проживающим в г.Усть-Каменогорске общежитие не предоставляется'
      },
      rejectionReasonOther: '',
      rejectionStatusId: 2,
      dialogVisible: false,
      form: {
        rejection_reason: '',
      },
      form_rules: {
        rejection_reason: [
          { required: true, message: 'Введите причину отказа', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.rejectionReasonType = 1
    this.status = this.value
    this.statuses = adminApi.getApplicationStatuses()
  },
  methods: {
    changeApplicationStatus(newStatus) {
      if (newStatus !== this.value) {
        this.$store.dispatch(adminActions.setApplicationStatus, {
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
      if(newStatus === this.rejectionStatusId) {
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
    },
    rejectionReasonType(val){
      if([1, 2].includes(val)){
        this.form.rejection_reason = this.rejectionReasons[val]
      } else {
        this.form.rejection_reason = ''
      }
    },
    rejectionReasonOther(val){
      this.form.rejection_reason = val
    }
  }
}
</script>