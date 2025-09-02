<script setup>
const props = defineProps({
  text: {
    type: [String, Number],
  },

  size: {
    type: String,
    default: 'large',
    validator(value) {
      return ['large', 'medium', 'small'].includes(value);
    },
  },
  tag: {
    type: String,
    default: 'p',
    validator(value) {
      return ['p', 'span'].includes(value);
    },
  },
});
</script>

<template>
  <component
    :is="props.tag"
    class="label"
    :class="`label--size-${props.size}`"
  >
    <slot>
      {{ props.text }}
    </slot>
  </component>
</template>

<style scoped>
.label {
  color: var(--eui-sys-layout-on-surface);
}

.label--size-large {
  font-size: var(--eui-sys-typescale-label-large-font-size);
  font-weight: var(--eui-sys-typescale-label-large-font-weight);
  line-height: var(--eui-sys-typescale-label-large-line-height);
  letter-spacing: var(--eui-sys-typescale-label-large-letter-spacing);
  text-decoration: var(--eui-sys-typescale-label-large-text-decoration);
}

.label--size-medium {
  font-size: var(--eui-sys-typescale-label-medium-font-size);
  font-weight: var(--eui-sys-typescale-label-medium-font-weight);
  line-height: var(--eui-sys-typescale-label-medium-line-height);
  letter-spacing: var(--eui-sys-typescale-label-medium-letter-spacing);
  text-decoration: var(--eui-sys-typescale-label-medium-text-decoration);
}

.label--size-small {
  font-size: var(--eui-sys-typescale-label-small-font-size);
  font-weight: var(--eui-sys-typescale-label-small-font-weight);
  line-height: var(--eui-sys-typescale-label-small-line-height);
  letter-spacing: var(--eui-sys-typescale-label-small-letter-spacing);
  text-decoration: var(--eui-sys-typescale-label-small-text-decoration);
}
</style>
