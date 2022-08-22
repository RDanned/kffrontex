<template>
  <el-tooltip v-model="show" :manual="true" effect="light" content="Ссылка скопирована!" placement="top">
    <button
        class="copy-link-btn btn btn-warning mt-0 float-left"
        @click="copyLink"
    >
      <font-awesome-icon icon="link" />
    </button>
  </el-tooltip>
</template>
<script>
export default {
  props: ['applicationId'],
  data(){
    return {
      show: false
    }
  },
  methods: {
    copyLink: function () {
      navigator.clipboard.writeText(`${window.location.protocol + "//" + window.location.host}/admin/applications/${this.applicationId}`)
          .then(() => {
            this.show = true
            setTimeout(() => {
              this.show = false
            }, 1000)
          })
    },
  }
}
</script>