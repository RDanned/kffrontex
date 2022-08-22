<template>
  <div>
    <div class="row"><h1>Настройки</h1></div>
    <template v-if="Object.keys(settings).length > 0">
      <div class="row">
        <table class="col-12 table table-striped table-bordered">
          <tbody>
          <tr>
            <td>
              Дата заселения:
              <tooltip content="Данная дата будет выведена в заявлении о выдаче места общежития"/>
            </td>
            <td>
              <el-date-picker type="date" v-model="settings['arrival_date'].value"/>
              <el-divider direction="vertical"/>
              <el-button @click="updateArrivalDate">Сохранить</el-button>
            </td>
          </tr>
          <tr>
            <td>
              Период приёма заявок
            </td>
            <td>
              <el-date-picker
                  v-model="settings['application_period'].value"
                  type="daterange"
                  range-separator="по"
                  start-placeholder="Начальная дата"
                  end-placeholder="Конечная дата">
              </el-date-picker>
              <el-divider direction="vertical"/>
              <el-button @click="updateApplicationPeriod">Сохранить</el-button>
            </td>
          </tr>
          <tr>
            <td>Закрыть приём заявок:</td>
            <td><el-checkbox @change="updateFormStatus" v-model="settings['is_form_closed'].value"></el-checkbox></td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="row">
        <div class="col-12" style="display: flex">
          <el-button type="info" @click="resetOrdinalNumber">Сбросить порядковый номер записей</el-button>
          <el-alert
              v-if="settings['ordinal_number'].value.need && !settings['ordinal_number'].value.updated"
              title="Порядковый номер следующей записи будет начат с нуля"
              type="success"
              show-icon>
          </el-alert>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import settingsApi from '@/api/settings'
import Tooltip from '@/components/utils/Tooltip'

export default {
  components: {
    Tooltip
  },
  data() {
    return {
      settings: {},
    }
  },
  mounted() {
    this.getSettings()
  },
  methods: {
    getSettings(){
      settingsApi.getSettings().then((settings) => {
        let newSettings = {}
        settings.map((setting) => {
          if(setting.name === 'application_period') setting.value = [setting.value.date_from, setting.value.date_to]
          newSettings[setting.name] = setting
        })
        this.settings = newSettings
      })
    },
    updateFormStatus(){
      settingsApi.updateSettings([this.settings['is_form_closed']]).then(() => this.$message('Настройки обновлены'))
    },
    updateArrivalDate(){
      settingsApi.updateSettings([this.settings['arrival_date']]).then(() => this.$message('Настройки обновлены'))
    },
    updateApplicationPeriod(){
      let setting = {...this.settings['application_period']}
      setting.value = {
        date_from: this.settings['application_period'].value[0],
        date_to: this.settings['application_period'].value[1]
      }
      settingsApi.updateSettings([setting]).then(() => this.$message('Настройки обновлены'))
    },
    save() {
      settingsApi.updateSettings(this.settings)
    },
    resetOrdinalNumber(){
      settingsApi.resetOrdinalNumber().then(() => this.getSettings())
    }
  },
  watch: {
    settings: {
      handler: function (val) {
      },
      deep: true,
    },
  },
}
</script>
