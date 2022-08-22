<template>
  <div class="upload-file-wrapper">
    <div class="upload-file-input-wrapper">
      <el-button
          type="info"
          @click="startFileSelect"
      >
        Загрузить
      </el-button>
      <input
          ref="hidden_input"
          type="file"
          id="hidden_input"
          @change="onFilePicked"
      />
    </div>
    <div class="upload-file-name">
      <span v-if="file">{{ file.name }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['value'],
  data() {
    return {
      file: null
    }
  },
  methods: {
    startFileSelect() {
      this.$refs.hidden_input.click()
    },
    onFilePicked(event) {
      const files = event.target.files
      const fileReader = new FileReader()
      fileReader.readAsDataURL(files[0])
      this.file = files[0]
      this.$emit('input', this.file)
    },
  }
}
</script>
<style>
.upload-file-input-wrapper input{
  display: none;
}
</style>