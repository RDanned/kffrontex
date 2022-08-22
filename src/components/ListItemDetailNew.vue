<template>
  <transition name="modal" v-if="application">
    <el-dialog
        :visible.sync="dialogVisible"
        :before-close="closeDetail"
        title="Информация о заявителе">
        <item-detail />
<!--      <el-container class="modal-container">
        <el-header>
          <el-row>
            <el-col>
              #{{ editApplication.id }}
              <el-divider direction="vertical"></el-divider>
              {{ `${editApplication.full_name}` }}
              <el-divider></el-divider>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <el-form :label-position="labelPosition">
            <div class="statuses-container">
              <div class="status-wrapper">
                <div class="status-title">Статус заявления</div>
                <div class="status-switcher">
                  <application-status-switcher v-model="application.settlement_status" :application-id="application.id"/>
                </div>
              </div>
              <div class="status-wrapper">
                <div class="status-title">Статус вселения</div>
                <div class="status-switcher">
                  <settlement-status-switcher v-model="application.settlement_status" :application-id="application.id"/>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-4 d-flex">
                <list-item-field label="Дата подачи заявления" v-model="applyDate" :edit="false"/>
              </div>
              <div class="col-4">
                <list-item-field label="Дата вселения" v-model="checkinDate" :edit="isEdit">
                  <template v-slot:value>
                    {{checkinDate}}
                  </template>
                  <template v-slot:edit>
                    <el-date-picker type="date" v-model="editApplication.checkin_date"/>
                  </template>
                </list-item-field>
              </div>
              <div class="col-4">
                <list-item-field label="Дата выселения" v-model="checkoutDate" :edit="isEdit">
                  <template v-slot:value>
                    {{checkoutDate}}
                  </template>
                  <template v-slot:edit>
                    <el-date-picker type="date" v-model="editApplication.checkout_date"/>
                  </template>
                </list-item-field>
              </div>
            </div>
            <list-item-field label="Язык заявления" v-model="application.lang" :edit="isEdit">
              <template v-slot:value>
                {{applicationLanguage}}
              </template>
              <template v-slot:edit>
                <el-select v-model="editApplication.lang">
                  <el-option value="ru" label="Русский"></el-option>
                  <el-option value="kz" label="Казахский"></el-option>
                  <el-option value="en" label="Английский"></el-option>
                </el-select>
              </template>
            </list-item-field>
            <list-item-field label="Имя" v-model="editApplication.first_name" :edit="isEdit" />
            <list-item-field label="Фамилия" v-model="editApplication.last_name" :edit="isEdit" />
            <list-item-field label="Отчество" v-model="editApplication.middle_name" :edit="isEdit" />
            <list-item-field label="Пол" :value="$tc(`form.gender.${application.gender}`)" :edit="isEdit">
              <template v-slot:edit>
                <el-select
                  name="gender"
                  id="gender"
                  v-model="editApplication.gender"
                >
                  <el-option value="male" label="Мужской"></el-option>
                  <el-option value="female" label="Женский"></el-option>
                </el-select>
              </template>
            </list-item-field>
            <list-item-field label="ИИН" v-model="editApplication.iin" :edit="isEdit" />
            <list-item-field label="Контактный телефон" v-model="editApplication.phone" :edit="isEdit" />
            <list-item-field label="Email" v-model="editApplication.email" :edit="isEdit" type="email"/>
            <list-item-field label="Адрес прописки" :value="editApplication.country" :edit="isEdit">
              <template v-slot:edit>
                <ul class="address-list">
                  <li>Страна: <country-select v-model="editApplication.country"/></li>
                  <li>Регион: <region-select v-model="editApplication.region"/></li>
                  <li>Город: <el-input v-model="editApplication.city" size="mini"></el-input></li>
                  <li>Улица: <el-input v-model="editApplication.street" size="mini"></el-input></li>
                  <li>Дом: <el-input v-model="editApplication.house" size="mini"></el-input></li>
                  <li>Квартира: <el-input v-model="editApplication.flat" size="mini"></el-input></li>
                </ul>
              </template>
              <template v-slot:value>
                <ul>
                  <li>Страна: {{ getCountry(application.country) }}</li>
                  <li>Регион: {{ getRegion(application.region) }}</li>
                  <li>Город: {{ application.city }}</li>
                  <li>Улица: {{ application.street }}</li>
                  <li>Дом: {{ application.house }}</li>
                  <li>Квартира: {{ application.flat }}</li>
                </ul>
              </template>
            </list-item-field>
            <list-item-field label="Место обучения" :value="application.study_place.name_ru" :edit="isEdit">
              <template v-slot:edit>
                <el-select
                  name="study_place"
                  id="study_place"
                  v-model="editApplication.study_place.id"
                >
                  <el-option
                    :value="item.id"
                    v-for="item in study_places"
                    :key="item.id"
                    :label="item.name_ru"
                  />
                </el-select>
              </template>
            </list-item-field>
            <list-item-field label="Форма оплаты" :value="application.payment_method.name_ru" :edit="isEdit">
              <template v-slot:edit>
                <el-select
                    name="payment_method"
                    id="payment_method"
                    v-model="editApplication.payment_method.id"
                >
                  <el-option
                      :value="item.id"
                      v-for="item in payment_methods"
                      :key="item.id"
                      :label="item.name_ru"
                  />
                </el-select>
              </template>
            </list-item-field>
            <list-item-field label="Курс" v-model="editApplication.course" :edit="isEdit" />
            <list-item-field label="Уровень обучения" v-model="editApplication.edu_level" :edit="false">
              <template v-slot:value>
                {{edu_level[$root.$i18n.locale][editApplication.edu_level]}}
                <tooltip content="Меняется автоматически при изменении места обучения" />
              </template>
            </list-item-field>
            <list-item-field
              label="Социальное положение"
              :value="application.social_status ? application.social_status.name_ru : 'Не указано'"
              :edit="isEdit"
            >
              <template v-slot:edit>
                <application-form-social-status
                  :social-statuses="social_statuses"
                  v-model="editApplication.social_status.id"
                />
              </template>
            </list-item-field>
            <list-item-field label="Подтверждение социального положения" :value="false" :edit="isEdit">
              <template v-slot:edit>
                <upload-file v-model="social_status_doc"/>
              </template>
              <template v-slot:value>
                <a
                  :href="application.social_status_doc"
                  @click.prevent="downloadDoc"
                  target="_blank"
                >
                  Скачать документ
                </a>
              </template>
            </list-item-field>
            <list-item-field label="Паспорт вакцинации" :value="false" :edit="isEdit">
              <template v-slot:edit>
                <upload-file v-model="vac_doc"/>
              </template>
              <template v-slot:value>
                <a
                  :href="application.vac_doc"
                  @click.prevent="downloadDoc"
                  target="_blank"
                >
                  Скачать документ
                </a>
              </template>
            </list-item-field>
            <list-item-field label="Причина отказа" v-model="editApplication.rejection_reason" :edit="isEdit" type="textarea"/>
            <list-item-field label="Приказ вселения" v-model="editApplication.checkin_order" :edit="isEdit"/>
          </el-form>
        </el-main>
        <el-footer>
          <button
              class="btn btn-secondary "
              @click="toggleEdit"
              v-if="!isEdit"
          >
            Редактировать
          </button>

          <button
              class="btn btn-secondary"
              @click="updateApplication"
              v-if="isEdit"
          >
            Сохранить
          </button>
          <button
              class="btn btn-secondary"
              @click="toggleEdit"
              v-if="isEdit"
          >
            Отмена
          </button>

          <button
              class="btn btn-secondary"
              @click="printApplication"
          >
            Получить справку
          </button>
          <button
              class="btn btn-primary"
              @click="closeDetail"
          >
            Закрыть
          </button>
        </el-footer>
      </el-container>-->
    </el-dialog>
  </transition>
</template>
<script>
import '@/assets/css/modal.css'
import host from '@/../config/host'
import axios from 'axios'
import {mapState} from 'vuex'
import adminApi from '@/api/admin'
import formApi from '@/api/form'
import edu_level from '@/lang/edu_level'
import {date_default_format, get_country_name, get_region_name} from '@/helpers/formatters'
import applicationApi from '@/api/application'
import ApplicationFormSocialStatus from '@/components/ApplicationFormSocialStatus'
import UploadFile from '@/components/form/UploadFile'
import ListItemField from '@/components/ListItemField'
import {actionTypes as adminActions} from '@/store/modules/admin'
import {actionTypes as modalActions} from '@/store/modules/modal'
import CountrySelect from '@/components/form/CountrySelect'
import RegionSelect from '@/components/form/RegionSelect'
import SettlementStatusSwitcher from '@/components/Admin/SettlementStatusSwitcher'
import ApplicationStatusSwitcher from '@/components/Admin/ApplicationStatusSwitcher'
import Tooltip from '@/components/utils/Tooltip'
import ItemDetail from '@/components/Admin/ItemDetail'

export default {
  name: 'ListItemDetail',
  components: {
    ApplicationFormSocialStatus,
    ListItemField,
    UploadFile,
    CountrySelect,
    RegionSelect,
    SettlementStatusSwitcher,
    ApplicationStatusSwitcher,
    Tooltip,
    ItemDetail
  },
  data() {
    return {
      host: host,
      isEdit: false,
      labelPosition: 'top',
      dialogVisible: false,
      editApplication: {},
      study_places: [],
      payment_methods: [],
      social_statuses: [],
      social_status_doc: null,
      vac_doc: null,
      edu_level: edu_level
    }
  },
  computed: {
    ...mapState({
      application: function (state) {
        this.editApplication = {...state.modal.applicationDetail}

        if (!this.editApplication.social_status)
          this.editApplication.social_status = {id: 0}

        if(state.modal.applicationDetail)
          this.dialogVisible = true
        else
          this.dialogVisible = false

        return state.modal.applicationDetail
      },
    }),
    applyDate: function () {
      return date_default_format(this.application.date_insert)
    },
    checkinDate: function () {
      return this.application.checkin_date ? date_default_format(this.application.checkin_date) : '-'
    },
    checkoutDate: function () {
      return this.application.checkout_date ? date_default_format(this.application.checkout_date) : '-'
    },
    applicationLanguage(){
      if(this.application.lang === 'kz') return 'Казахский'
      if(this.application.lang === 'en') return 'Английский'
      return 'Русский'
    }
  },
  mounted() {
    formApi.getFormData().then((response) => {
      let data = response.data
      this.study_places = data.study_places
      this.payment_methods = data.payment_methods
      this.social_statuses = data.social_statuses
    })
  },
  methods: {
    getCountry(countryCode){
      return get_country_name(countryCode, this.$root.$i18n.locale)
    },
    getRegion(regionCode){
      return get_region_name(regionCode, this.$root.$i18n.locale)
    },
    closeDetail: function () {
      this.isEdit = false
      this.dialogVisible = false
      this.$store.dispatch(modalActions.resetApplicationDetail)
    },
    printApplication: function () {
      let id = this.application.id
      adminApi.getApplication(id).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute(
          'download',
          `заявление общежитие ${this.application.full_name}.docx`
        )
        document.body.appendChild(link)
        link.click()
        link.remove()
      })
    },
    toggleEdit: function () {
      this.isEdit = !this.isEdit
      this.editApplication = this.application
      this.vac_doc = null
      this.social_status_doc = null
    },
    updateApplication: function () {
      this.$store
        .dispatch(adminActions.updateApplication, {
          application: this.editApplication,
        })
        .then(() => {
          this.$store.dispatch(modalActions.setApplicationDetail, {
            application: this.editApplication,
          })

          if(this.social_status_doc) this.uploadFile('social_status_doc', this.social_status_doc)
          if(this.vac_doc) this.uploadFile('vac_doc', this.vac_doc)

          this.isEdit = false
        })
        .then(() => {
          //??
          this.$parent.getList()
        })
        .catch(() => (this.isEdit = false))
    },
    downloadDoc(e) {
      let link = e.currentTarget.href
      const FileDownload = require('js-file-download')
      axios
        .get(link, {
          responseType: 'blob',
        })
        .then((response) => {
          let filename = link.substring(link.lastIndexOf('/') + 1)
          FileDownload(response.data, filename)
        })
    },
    uploadFile(type, file){
      let sendData = new FormData()
      sendData.append('doc_type', type)
      sendData.append('file', file)
      applicationApi.uploadFile(this.application.id, sendData)
    },
  },
  watch: {
    'editApplication.social_status.id'(newStatusId){
      let newStatus = this.social_statuses.find((status) => status.id == newStatusId)
      for(let prop in newStatus){
        if(prop !== 'id') this.editApplication.social_status[prop] = newStatus[prop]
      }
    }
  }
}
</script>
