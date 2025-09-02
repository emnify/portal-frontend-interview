<script setup>
const props = defineProps({
  view: {
    type: String,
    default: 'primary',
    validator(value) {
      return ['primary', 'primary-black'].includes(value);
    },
    description: 'Variant of the spinner',
  },
  size: {
    type: String,
    default: 'medium',
    validator(value) {
      return ['medium', 'large'].includes(value);
    },
    description: 'Size of the spinner',
  },
});
</script>
<template>
  <i :class="`loading-spinner loading-spinner--${props.view} loading-spinner--${props.size}`" />
</template>

<style scoped>
.loading-spinner {
  display: inline-block;
  border-style: solid;
  border-radius: 50%;
  animation: button-loader 1.1s infinite linear;
  box-sizing: border-box;
}

.loading-spinner--medium {
  width: 24px;
  height: 24px;
  border-width: 2px;
}

.loading-spinner--large {
  width: 48px;
  height: 48px;
  border-width: 4px;
}

.loading-spinner--primary {
  border-color: var(--eui-sys-brand-primary-01) var(--eui-sys-layout-on-surface-variant-subdued)
    var(--eui-sys-layout-on-surface-variant-subdued);
}

.loading-spinner--primary-black {
  border-color: var(--eui-sys-layout-surface-01) var(--eui-sys-layout-on-surface)
    var(--eui-sys-layout-on-surface);
}

@keyframes button-loader {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
