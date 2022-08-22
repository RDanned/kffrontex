<template>
  <transition name="modal" v-if="showModal && !disabled">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"> </slot>
          </div>

          <div class="modal-body">
            «Обязательно! Все поля должны быть заполнены согласно вашим
            документам (удостоверение личности или паспорту)»
          </div>

          <div class="modal-footer">
            <button
              class="btn btn-primary modal-default-button"
              @click.prevent="closeModal"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      showModal: false,
      disabled: true,
      errors: {}
    }
  },
  mounted() {
    setTimeout(() => {
      this.showModal = true
    }, 1000)
  },
  methods: {
    openModal: function() {
      this.showModal = true
      this.statuses = this.socialStatuses
    },
    closeModal: function() {
      this.showModal = false
    }
  }
}
</script>
