<template>
  <div class="form-wrapper">
    <preloader v-if="isLoading" />
    <warning />

    <div class="container form-page">
      <language-switcher class="col-2" />
      <div class="row form-header">
        <h4 class="kafu-title col-md-10 col-12">
          {{ $t('kafu.title') }}
        </h4>
        <p class="form-description col-md-10 col-12">
          {{ $t('kafu.description') }}
        </p>
      </div>

      <div class="row form-banner">
        <div class="col-12">
          <h1 class="form-title">
            {{ $t('form.title') }}
          </h1>
        </div>
        <div class="col-md-3 col-12 form-contacts">
          <h6>{{ $t('kafu.contacts') }}</h6>
          <p class="mb-0">
            <a href="tel:87232500300">
              <i aria-hidden="true" class="fas fa-phone-alt mr-2"></i>
              8(7232)500-300
            </a>
            <br />
            <a href="tel:87232505030">
              <i aria-hidden="true" class="fas fa-phone-alt mr-2"></i>
              8(7232)50-50-30
            </a>
            <br />
            <a href="tel:77074400001">
              <i aria-hidden="true" class="fas fa-phone-alt mr-2"></i>
              +7-707-440-00-01
            </a>
            <br />
          </p>
        </div>
        <div class="col-md-6 col-12">
          <div>{{ $t('kafu.address') }}</div>
          <div>{{ $t('kafu.phone') }}</div>
        </div>
        <div class="col-md-3 col-12">
          <img :src="require('@/assets/img/kafu-logo.png')" class="logo" />
        </div>
      </div>

      <div
        v-if="isSuccess"
        class="col-12 bg-white rounded mt-4 pb-4 pt-4 border"
      >
        <div class="form-success">
          <font-awesome-icon icon="check" />
        </div>
        <div class="form-success__text">{{ $t('form.submitted') }}</div>
      </div>
      <div
        v-else-if="is_form_closed"
        class="col-12 bg-white rounded mt-4 pb-4 pt-4 border"
      >
        <div>
          <div class="form-success__text">{{ $t('form.closed') }}</div>
        </div>
      </div>
      <div
        v-else-if="isError"
        class="col-12 bg-white rounded mt-4 pb-4 pt-4 border"
      >
        <div>
          <div class="form-success__text">error</div>
        </div>
      </div>
      <form
        v-else
        class="row"
        @submit.prevent="submitApplication"
        method="POST"
        enctype="multipart/form-data"
      >
        <div class="col-12 bg-white rounded mt-4 border">
          <ul id="form-errors" class="form-errors" v-if="this.generalErrors">
            <li
              v-for="error in this.generalErrors"
              :key="error"
              class="form-error text-danger"
            >
              {{ error }}
            </li>
          </ul>
          <h3 class="mt-3">{{ $t('form.personal_data_title') }}</h3>
          <input name="lang" type="hidden" :value="$root.$i18n.locale" />
          <hr />

          <div class="form-row row-centered mt-2">
            <div class="form-group">
              <application-form-error
                  v-if="errors.last_name"
                  :error="errors.last_name"
              />
              <label for="last_name" class="form-label">
                {{ $t('form.last_name') }}<i style="color: red">*</i>
              </label>
              <input
                type="text"
                id="last_name"
                :placeholder="$t('form.last_name')"
                class="form-control"
                v-model="form.last_name"
              />
            </div>

            <div class="form-group">
              <application-form-error
                v-if="errors.first_name"
                :error="errors.first_name"
              />
              <label for="first_name" class="form-label">
                {{ $t('form.first_name') }}<i style="color: red">*</i>
              </label>
              <input
                type="text"
                id="first_name"
                :placeholder="$t('form.first_name')"
                :class="['form-control', {'is-invalid': errors.first_name}]"
                v-model="form.first_name"
              />
            </div>

            <div class="form-group">
              <label for="middle_name">{{ $t('form.middle_name') }}</label>
              <input
                type="text"
                id="middle_name"
                :placeholder="$t('form.personal_data_title')"
                class="form-control"
                v-model="form.middle_name"
              />
            </div>

            <div class="form-group">
              <application-form-error
                v-if="errors.gender"
                :error="errors.gender"
              />
              <label for="gender"
                >{{ $t('form.gender.title') }}<i style="color: red">*</i></label
              >
              <select
                name="gender"
                id="gender"
                :class="['form-control', {'is-invalid': errors.gender}]"
                v-model="form.gender"
              >
                <option value="" disabled selected>
                  --{{ $t('form.select_placeholder') }}--
                </option>
                <option value="female">
                  {{ $t('form.gender.female') }}
                </option>
                <option value="male">
                  {{ $t('form.gender.male') }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <application-form-error v-if="errors.iin" :error="errors.iin" />
              <label for="iin">{{ $t('form.iin') }}<i style="color: red">*</i></label>
              <masked-input
                type="text"
                id="iin"
                placeholder="1234567890"
                :class="['form-control', {'is-invalid': errors.iin}]"
                v-model="form.iin"
                mask="111111111111"
              />
            </div>
          </div>
        </div>

        <application-form-social-status
          :social-statuses="social_statuses"
          v-model="form.social_status"
        />

        <div
          class="col-md-12 mx-auto rounded bg-white mt-4 border"
          v-if="form.social_status"
        >
          <div class="form-row row-centered mt-2">
            <div class="form-group col-md-12 col-12">
              <application-form-error
                v-if="errors.social_status_doc"
                :error="errors.social_status_doc"
              />
              <label for="social_status_doc">
                {{ $t('form.social_status_doc') }}<i style="color: red">*</i>
              </label>
              <br />
              <button
                type="button"
                class="btn btn-info text-white"
                @click="startSocialDocSelect"
              >
                {{ $t('form.load_btn') }}
              </button>
              <div class="form-control mt-2" v-if="form.social_status_doc">
                {{ form.social_status_doc.name }}
              </div>
              <input
                ref="social_status_doc"
                style="display: none"
                type="file"
                id="social_status_doc"
                @change="onSocialDocPicked"
              />
            </div>
          </div>
        </div>

        <div class="col-md-12 mx-auto rounded bg-white mt-4 border">
          <div class="form-row row-centered mt-2">
            <div class="form-group col-md-12 col-12">
              <application-form-error
                v-if="errors.study_place"
                :error="errors.study_place"
              />
              <label for="study_place">{{ $t('form.study_place') }}<i style="color: red">*</i></label>
              <select
                id="study_place"
                :class="['form-control', {'is-invalid': errors.study_place}]"
                v-model="form.study_place"
              >
                <option disabled value="">
                  --{{ $t('form.select_placeholder') }}--
                </option>
                <option
                  v-for="study_place in study_places"
                  :key="study_place.id"
                  :value="study_place.id"
                >
                  {{ study_place[name_lang] }}
                </option>
              </select>
              <label for="study_place">{{ $t('form.course') }}</label>
              <select
                id="course"
                :class="['form-control']"
                v-model="form.course"
              >
                <option disabled value="" selected>
                  --{{ $t('form.select_placeholder') }}--
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div class="form-group col-md-12 col-12">
              <application-form-error
                v-if="errors.payment_method"
                :error="errors.payment_method"
              />
              <label for="payment_method">{{ $t('form.payment_method') }}<i style="color: red">*</i></label>
              <select
                id="payment_method"
                :class="['form-control', {'is-invalid': errors.payment_method}]"
                v-model="form.payment_method"
              >
                <option disabled value="">
                  --{{ $t('form.select_placeholder') }}--
                </option>
                <option
                  v-for="payment_method in payment_methods"
                  :key="payment_method.id"
                  :value="payment_method.id"
                >
                  {{ payment_method[name_lang] }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="col-md-12 mx-auto rounded bg-white mt-4 border">
          <h3 class="mt-3">{{ $t('form.contact_info_title') }}</h3>
          <div class="form-row row-centered mt-2">
            <div class="form-group col-md-12 col-12">
              <fieldset id="address">
                <legend>
                  {{ $t('form.address') }} <i style="color: red">*</i>
                </legend>
                <application-form-error
                  v-if="errors.address"
                  :error="errors.address"
                />
                <div class="input-group mb-3">
                  <span class="input-group-text">{{ $t('form.country') }}</span>
                  <country-select v-model="form.country"/>
                  <template v-if="is_kz_country">
                    <span class="input-group-text">{{ $t('form.region') }}</span>
                    <region-select v-model="form.region" :disabled="form.country !== 'KAZ'"/>
                  </template>
                </div>

                <template v-if="form.country || true">
                  <div class="input-group mb-3">
                    <span class="input-group-text">{{ $t('form.city') }}</span>
                    <input
                        type="text"
                        :aria-label="$t('form.city')"
                        id="city"
                        v-model="form.city"
                        :placeholder="$t('form.city_placeholder')"
                        :class="['form-control', {'is-invalid': errors.city || is_wrong_city}]"
                    />
                    <el-alert
                      :effect="is_wrong_city ? 'dark' : 'light'"
                      :title="$t('form.uk_rejection_message')"
                      type="error"
                      :closable="false"></el-alert>
                  </div>

                  <div class="input-group mb-3">
                    <span class="input-group-text">{{ $t('form.street') }}</span>
                    <input
                        type="text"
                        class="form-control"
                        :aria-label="$t('form.street')"
                        id="street"
                        v-model="form.street"
                        :placeholder="$t('form.street')"
                        :class="['form-control', {'is-invalid': errors.street}]"
                    />
                  </div>

                  <div class="input-group mb-3">
                    <span class="input-group-text">{{ $t('form.house') }}</span>
                    <input
                        type="text"
                        class="form-control"
                        :aria-label="$t('form.house')"
                        id="house"
                        v-model="form.house"
                        :placeholder="$t('form.house')"
                        :class="['form-control', {'is-invalid': errors.house}]"
                    />
                    <span class="input-group-text" v-if="is_kz_country"><el-checkbox v-model="form.is_house" name="ishouse" id="ishouse">
                      {{ $t('form.private_house') }}
                    </el-checkbox> </span>
                  </div>

                  <div class="input-group mb3" v-if="is_kz_country && !form.is_house">
                    <span class="input-group-text">{{ $t('form.flat') }}</span>
                    <input
                        type="text"
                        class="form-control"
                        :aria-label="$t('form.flat')"
                        id="flat"
                        v-model="form.flat"
                        :placeholder="$t('form.flat')"
                        :class="['form-control', {'is-invalid': errors.flat}]"
                    />
                  </div>

                </template>
              </fieldset>
            </div>
          </div>

          <div class="form-row row-centered mt-2">
            <div class="form-group col-md-12 col-12">
              <application-form-error
                v-if="errors.email"
                :error="errors.email"
              />
              <label for="email">
                {{ $t('form.email') }}
                <i style="color: rgb(255, 0, 0)">*</i></label
              >
              <input
                type="email"
                id="email"
                placeholder="email"
                :class="['form-control', {'is-invalid': errors.email}]"
                :masked="true"
                v-model="form.email"
              />
            </div>
          </div>

          <div class="form-row row-centered mt-2">
            <div class="form-group col-md-12 col-12">
              <application-form-error
                v-if="errors.phone"
                :error="errors.phone"
              />
              <label for="phone">
                {{ $t('form.phone') }}
                <i style="color: red">*</i>
              </label>
              <masked-input
                @input="form.phone = '8' + arguments[1]"
                type="tel"
                id="phone"
                mask="8 (111) 11-11-111"
                placeholder="8 (___) __-__-___"
                :class="['form-control', {'is-invalid': errors.phone}]"
              />
            </div>
          </div>
        </div>

        <div class="col-md-12 mx-auto rounded bg-white mt-4 border">
          <h3 class="mt-3">{{ $t('form.additional_info_title') }}</h3>
          <div class="form-row row-centered mt-2">
            <div class="form-group col-md-12 col-12">
              <label for="vac_doc">
                {{ $t('form.vac_doc') }}
              </label>
              <br />
              <button
                type="button"
                class="btn btn-info text-white"
                @click="startVacDocSelect"
              >
                {{ $t('form.load_btn') }}
              </button>
              <div class="form-control mt-2" v-if="form.vac_doc">
                {{ form.vac_doc.name }}
              </div>
              <input
                ref="vac_doc"
                style="display: none"
                type="file"
                id="vac_doc"
                @change="onVacDocPicked"
              />
            </div>
          </div>
        </div>
        <button
          class="btn btn-success mt-3 justify-content-center mx-auto"
          type="submit"
        >
          {{ $t('form.submit_btn') }}
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import '@/assets/css/form.css'
import formApi from '@/api/form'
import ApplicationFormSocialStatus from '@/components/ApplicationFormSocialStatus'
import ApplicationFormError from '@/components/ApplicationFormError'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import Warning from '@/components/Warning'
import Preloader from '@/components/Preloader'
import {mask} from 'vue-the-mask'
import MaskedInput from 'vue-masked-input'
import CountrySelect from '@/components/form/CountrySelect'
import RegionSelect from '@/components/form/RegionSelect'
import {get_region_name} from '@/helpers/formatters'
import moment from 'moment'

export default {
  components: {
    ApplicationFormSocialStatus,
    LanguageSwitcher,
    Warning,
    ApplicationFormError,
    Preloader,
    MaskedInput,
    CountrySelect,
    RegionSelect
  },
  directives: {mask},
  data: function () {

    return {
      is_form_closed: false,
      isLoading: false,
      isSubmitted: false,
      isSuccess: false,
      isError: false,

      payment_methods: [],
      social_statuses: [],
      study_places: [],

      errors: {},

      generalErrors: [],

      form: {
        last_name: '',
        first_name: '',
        middle_name: '',

        iin: '',
        gender: '',

        study_place: '',
        payment_method: '',
        social_status: '',
        social_status_doc: null,
        vac_doc: null,

        // address
        address: '',

        country: '',
        region: '',
        city: '',
        street: '',
        house: '',
        flat: '',
        is_house: false,

        email: '',
        phone: '',

        course: '',
        edu_level: '',
      },
    }
  },
  created: async function () {
    let formData = await formApi.getFormData()
    formData = formData.data
    this.payment_methods = formData.payment_methods
    this.social_statuses = formData.social_statuses
    this.study_places = formData.study_places
    this.is_form_closed = formData.is_form_closed
  },
  watch: {
    form: {
      handler: function (value) {
        if (this.isSubmitted) this.validate(value)
      },
      deep: true,
    },
    'form.region'(val){
      //Nur-Sultan, Almaty, Shymkent
      if(['01', '02', '17'].includes(val)) this.form.city = get_region_name(val, this.$i18n.locale)
      else this.form.city = ''
    },
    'form.is_house'(val){
      if(val) this.form.flat = ''
    }
  },
  computed: {
    name_lang: function () {
      return `name_${this.$root.$i18n.locale}`
    },
    is_kz_country: function (){
      return this.form.country === 'KAZ'
    },
    is_wrong_city: function (){
      return ['Усть-Каменогорск', 'Оскемен', 'Oskemen', 'Өскемен'].some(city => this.form.city.includes(city))
    }
  },
  methods: {
    validate: function (data) {
      if (!data.first_name)
        this.errors.first_name = this.$t('form.errors.first_name')
      else this.errors.first_name = ''

      if (!data.last_name)
          this.errors.last_name = this.$t('form.errors.last_name')
      else this.errors.last_name = ''

      if (!data.gender) this.errors.gender = this.$t('form.errors.gender')
      else this.errors.gender = ''

      if (!data.iin || data.iin.length < 12 || data.iin.includes('_'))
        this.errors.iin = this.$t('form.errors.iin')
      else this.errors.iin = ''

      if (!data.study_place)
        this.errors.study_place = this.$t('form.errors.study_place')
      else this.errors.study_place = ''

      if (!data.payment_method)
        this.errors.payment_method = this.$t('form.errors.payment_method')
      else this.errors.payment_method = ''

      // if (!data.address) this.errors.address = this.$t('form.errors.address')
      // else this.errors.address = ''

      if (!data.country) this.errors.country = true
      else this.errors.country = ''

      if (!data.region && this.is_kz_country) this.errors.region = true
      else this.errors.region = ''

      if (!data.city || this.is_wrong_city) this.errors.city = true
      else this.errors.city = ''

      if (!data.street) this.errors.street = true
      else this.errors.street = ''

      if (!data.house) this.errors.house = true
      else this.errors.house = ''

      if (!data.flat && this.is_kz_country && !data.is_house) this.errors.flat = true
      else this.errors.flat = ''

      if (
        !data.country ||
        (!data.region && this.is_kz_country) ||
        (!data.city || this.is_wrong_city) ||
        !data.street ||
        !data.house ||
        (!data.flat && this.is_kz_country && !data.is_house)
      )
        this.errors.address = this.$t('form.errors.address')
      else this.errors.address = ''

      if (!data.email) this.errors.email = this.$t('form.errors.email')
      else this.errors.email = ''

      if (data.phone.length !== 11 || data.phone.includes('_'))
        this.errors.phone = this.$t('form.errors.phone')
      else this.errors.phone = false

      if (data.social_status && !data.social_status_doc)
        this.errors.social_status_doc = this.$t('form.errors.social_status_doc')
      else this.errors.social_status_doc = ''

      for (const [, value] of Object.entries(this.errors))
        if (value) return false

      return true
    },

    startSocialDocSelect() {
      this.$refs.social_status_doc.click()
    },

    startVacDocSelect() {
      this.$refs.vac_doc.click()
    },

    onVacDocPicked(event) {
      const files = event.target.files
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.form.vac_doc = files[0]
    },

    onSocialDocPicked(event) {
      const files = event.target.files
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.form.social_status_doc = files[0]
    },
    submitApplication: function () {
      this.errors = {}
      this.generalErrors = []

      if (!this.validate(this.form)) {
        this.isSubmitted = true

        for (let key in this.errors) {
          if (
            this.errors[key] &&
            !['country', 'region', 'city', 'street', 'house', 'flat'].includes(
              this.errors[key]
            )
          ) {
            document.querySelector(`#${key}`).scrollIntoView()
            break
          }
        }

        return
      }

      console.log('submit')

      this.isLoading = true

      let sendData = new FormData()
      sendData.append('first_name', this.form.first_name)
      sendData.append('last_name', this.form.last_name)
      sendData.append('middle_name', this.form.middle_name)
      sendData.append('iin', this.form.iin)
      sendData.append('gender', this.form.gender)
      sendData.append('study_place', this.form.study_place)
      sendData.append('social_status', this.form.social_status)
      if (this.form.social_status)
        sendData.append('social_status_doc', this.form.social_status_doc)
      sendData.append('vac_doc', this.form.vac_doc)
      sendData.append('payment_method', this.form.payment_method)

      sendData.append('country', this.form.country)
      sendData.append('region', this.form.region)
      sendData.append('city', this.form.city)
      sendData.append('street', this.form.street)
      sendData.append('house', this.form.house)
      sendData.append('flat', this.form.flat)

      sendData.append('email', this.form.email)
      sendData.append('phone', this.form.phone)
      sendData.append('course', this.form.course)
      sendData.append('edu_level', this.form.edu_level)
      sendData.append('vac_doc', this.form.vac_doc)
      sendData.append('lang', this.$root.$i18n.locale)

      formApi
        .send(
          sendData
        )
        .then((response) => {
          response = response.data

          if (!response.success) {
            this.generalErrors = response.errors
            document.querySelector('#form-errors').scrollIntoView()
          } else {
            this.generalErrors = []
            this.isSuccess = true
          }

          this.isLoading = false
          this.isError = false
        })
        .catch(() => {
          //this.isSuccess = true
          this.isLoading = false
          this.isError = true
        })
    },
  },
}
</script>
