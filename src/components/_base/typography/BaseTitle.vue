<script setup>
const props = defineProps({
  text: {
    type: String,
  },

  tag: {
    type: String,
    default: 'p',
    validator(value) {
      return ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'].includes(value);
    },
  },
  size: {
    type: String,
    default: 'large',
    validator(value) {
      return ['small', 'large', 'medium'].includes(value);
    },
  },
});
</script>
<template>
  <component
    :is="props.tag"
    class="title"
    :class="`title--size-${props.size}`"
  >
    <slot>
      {{ props.text }}
    </slot>
  </component>
</template>

<style scoped>
.title {
  color: var(--eui-sys-layout-on-surface);
}

.title--size-large {
  font-size: var(--eui-sys-typescale-title-medium-font-size);
  font-weight: var(--eui-sys-typescale-title-medium-font-weight);
  line-height: var(--eui-sys-typescale-title-medium-line-height);
  letter-spacing: var(--eui-sys-typescale-title-medium-letter-spacing);
  text-decoration: var(--eui-sys-typescale-title-medium-text-decoration);

  @media (--viewport-tablet) {
    font-size: var(--eui-sys-typescale-title-large-font-size);
    font-weight: var(--eui-sys-typescale-title-large-font-weight);
    line-height: var(--eui-sys-typescale-title-large-line-height);
    letter-spacing: var(--eui-sys-typescale-title-large-letter-spacing);
    text-decoration: var(--eui-sys-typescale-title-large-text-decoration);
  }
}

.title--size-medium {
  font-size: var(--eui-sys-typescale-title-medium-font-size);
  font-weight: var(--eui-sys-typescale-title-medium-font-weight);
  line-height: var(--eui-sys-typescale-title-medium-line-height);
  letter-spacing: var(--eui-sys-typescale-title-medium-letter-spacing);
  text-decoration: var(--eui-sys-typescale-title-medium-text-decoration);
}

.title--size-small {
  font-size: var(--eui-sys-typescale-title-small-font-size);
  font-weight: var(--eui-sys-typescale-title-small-font-weight);
  line-height: var(--eui-sys-typescale-title-small-line-height);
  letter-spacing: var(--eui-sys-typescale-title-small-letter-spacing);
  text-decoration: var(--eui-sys-typescale-title-small-text-decoration);
}
</style>
