<template>
  <el-select
      v-model="country"
      filterable
      clearable
      @change="onChange"
      :placeholder="`--${$t('form.select_placeholder')}--`">
    <el-option
        v-for="item in countries[$root.$i18n.locale]"
        :key="item.code"
        :label="item.name"
        :value="item.code">
    </el-option>
  </el-select>
</template>
<script>
import countries_lang from '@/lang/countries'

export default {
  props: ['value'],
  data() {
    return {
      countries: countries_lang,
      country: this.value
    }
  },
  methods: {
    onChange(val){
      this.$emit('input', this.country)
    }
  }

}
</script>