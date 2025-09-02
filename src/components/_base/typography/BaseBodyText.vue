<script setup>
const props = defineProps({
  tag: {
    default: 'p',
    validator(value) {
      return ['p', 'span'].includes(value);
    },
  },
  text: {
    type: [String, Number],
  },
  size: {
    default: 'large',
    validator(value) {
      return ['x-small', 'small', 'medium', 'large'].includes(value);
    },
  },
});
</script>

<template>
  <component
    :is="tag"
    class="body-text"
    :class="`body-text--size-${props.size}`"
  >
    <slot>
      {{ props.text }}
    </slot>
  </component>
</template>

<style scoped>
.body-text {
  color: var(--eui-sys-layout-on-surface);
}

.body-text--size-x-small {
  font-size: var(--eui-sys-typescale-body-text-x-small-font-size);
  font-weight: var(--eui-sys-typescale-body-text-x-small-font-weight);
  line-height: var(--eui-sys-typescale-body-text-x-small-line-height);
  letter-spacing: var(--eui-sys-typescale-body-text-x-small-letter-spacing);
  text-decoration: var(--eui-sys-typescale-body-text-x-small-text-decoration);
}

.body-text--size-small {
  font-size: var(--eui-sys-typescale-body-text-small-font-size);
  font-weight: var(--eui-sys-typescale-body-text-small-font-weight);
  line-height: var(--eui-sys-typescale-body-text-small-line-height);
  letter-spacing: var(--eui-sys-typescale-body-text-small-letter-spacing);
  text-decoration: var(--eui-sys-typescale-body-text-small-text-decoration);
}

.body-text--size-medium {
  font-size: var(--eui-sys-typescale-body-text-medium-font-size);
  font-weight: var(--eui-sys-typescale-body-text-medium-font-weight);
  line-height: var(--eui-sys-typescale-body-text-medium-line-height);
  letter-spacing: var(--eui-sys-typescale-body-text-medium-letter-spacing);
  text-decoration: var(--eui-sys-typescale-body-text-medium-text-decoration);
}

.body-text--size-large {
  font-size: var(--eui-sys-typescale-body-text-large-font-size);
  font-weight: var(--eui-sys-typescale-body-text-large-font-weight);
  line-height: var(--eui-sys-typescale-body-text-large-line-height);
  letter-spacing: var(--eui-sys-typescale-body-text-large-letter-spacing);
  text-decoration: var(--eui-sys-typescale-body-text-large-text-decoration);
}
</style>
