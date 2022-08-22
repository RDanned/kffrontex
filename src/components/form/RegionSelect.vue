<template>
  <el-select
      v-model="region"
      :disabled="disabled"
      filterable
      clearable
      @change="onChange"
      :placeholder="`--${$t('form.select_placeholder')}--`">
    <el-option
        v-for="item in regions[$root.$i18n.locale]"
        :key="item.code"
        :label="item.name"
        :value="item.code">
    </el-option>
  </el-select>
</template>
<script>
import regions_lang from '@/lang/regions'

export default {
  props: ['value', 'disabled'],
  data() {
    return {
      regions: regions_lang,
      region: this.value
    }
  },
  methods: {
    onChange(val){
      this.$emit('input', this.region)
    }
  }

}
</script>