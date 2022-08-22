<template>
  <el-form-item class="modal-form-item" :label="label">
    <template v-if="edit">
      <slot name="edit">
        <el-input v-model="content" @input="handleInput" :type="type" size="mini"></el-input>
      </slot>
    </template>
    <template v-else>
      <slot name="value">
        {{ value ? value : 'не указано' }}
      </slot>
    </template>
  </el-form-item>
</template>
<script>
export default {
  props: {
    edit: {
      type: Boolean,
      required: true
    },
    value: {
      required: true
    },
    label: {
      required: true
    },
    type: {
      default: 'text'
    }
  },
  data() {
    return {
      content: this.value
    }
  },
  methods: {
    handleInput(){
      this.$emit('input', this.content)
    }
  }
}
</script>