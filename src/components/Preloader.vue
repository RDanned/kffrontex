<template>
  <div class="preloader__wrapper">
    <div class="loading">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>
<script>
export default {
}
</script>
<style scoped>
.preloader__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
}

.loading {
  display: flex;
}
.loading .dot {
  position: relative;
  width: 2em;
  height: 2em;
  margin: 0.8em;
  border-radius: 50%;
}
.loading .dot::before {
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  background: inherit;
  border-radius: inherit;
  animation: wave 2s ease-out infinite;
}
.loading .dot:nth-child(1) {
  background: #ffffff;
}
.loading .dot:nth-child(1)::before {
  animation-delay: 0.2s;
}
.loading .dot:nth-child(2) {
  background: #89cff0;
}
.loading .dot:nth-child(2)::before {
  animation-delay: 0.4s;
}
.loading .dot:nth-child(3) {
  background: #4682b4;
}
.loading .dot:nth-child(3)::before {
  animation-delay: 0.6s;
}
.loading .dot:nth-child(4) {
  background: #0f52ba;
}
.loading .dot:nth-child(4)::before {
  animation-delay: 0.8s;
}
.loading .dot:nth-child(5) {
  background: var(--dark-blue);
}
.loading .dot:nth-child(5)::before {
  animation-delay: 1s;
}
@keyframes wave {
  50%,
  75% {
    transform: scale(2.5);
  }
  80%,
  100% {
    opacity: 0;
  }
}
</style>
