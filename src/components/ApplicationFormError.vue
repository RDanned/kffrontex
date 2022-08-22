<template>
  <p class="text-danger form-error">{{ error }}</p>
</template>
<script>
export default {
  props: {
    error: {
      required: true
    }
  }
}
</script>
