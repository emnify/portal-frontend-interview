<script setup>
const props = defineProps({
  text: {
    type: String,
  },

  tag: {
    type: String,
    default: 'p',
    validator(value) {
      return ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'].includes(value);
    },
  },
  size: {
    type: String,
    default: 'large',
    validator(value) {
      return ['large', 'medium', 'small'].includes(value);
    },
  },
});
</script>
<template>
  <component
    :is="props.tag"
    class="headline"
    :class="`headline--size-${props.size}`"
  >
    <slot>
      {{ props.text }}
    </slot>
  </component>
</template>

<style scoped>
.headline {
  color: var(--eui-sys-layout-on-surface);
}

.headline--size-large {
  font-size: var(--eui-sys-typescale-headline-medium-font-size);
  font-weight: var(--eui-sys-typescale-headline-medium-font-weight);
  line-height: var(--eui-sys-typescale-headline-medium-line-height);
  letter-spacing: var(--eui-sys-typescale-headline-medium-letter-spacing);
  text-decoration: var(--eui-sys-typescale-headline-medium-text-decoration);

  @media (--viewport-desktop) {
    font-size: var(--eui-sys-typescale-headline-large-font-size);
    font-weight: var(--eui-sys-typescale-headline-large-font-weight);
    line-height: var(--eui-sys-typescale-headline-large-line-height);
    letter-spacing: var(--eui-sys-typescale-headline-large-letter-spacing);
    text-decoration: var(--eui-sys-typescale-headline-large-text-decoration);
  }
}

.headline--size-medium {
  font-size: var(--eui-sys-typescale-headline-small-font-size);
  font-weight: var(--eui-sys-typescale-headline-small-font-weight);
  line-height: var(--eui-sys-typescale-headline-small-line-height);
  letter-spacing: var(--eui-sys-typescale-headline-small-letter-spacing);
  text-decoration: var(--eui-sys-typescale-headline-small-text-decoration);

  @media (--viewport-desktop) {
    font-size: var(--eui-sys-typescale-headline-medium-font-size);
    font-weight: var(--eui-sys-typescale-headline-medium-font-weight);
    line-height: var(--eui-sys-typescale-headline-medium-line-height);
    letter-spacing: var(--eui-sys-typescale-headline-medium-letter-spacing);
    text-decoration: var(--eui-sys-typescale-headline-medium-text-decoration);
  }
}

.headline--size-small {
  font-size: var(--eui-sys-typescale-title-large-font-size);
  font-weight: var(--eui-sys-typescale-title-large-font-weight);
  line-height: var(--eui-sys-typescale-title-large-line-height);
  letter-spacing: var(--eui-sys-typescale-title-large-letter-spacing);
  text-decoration: var(--eui-sys-typescale-title-large-text-decoration);

  @media (--viewport-tablet) {
    font-size: var(--eui-sys-typescale-headline-small-font-size);
    font-weight: var(--eui-sys-typescale-headline-small-font-weight);
    line-height: var(--eui-sys-typescale-headline-small-line-height);
    letter-spacing: var(--eui-sys-typescale-headline-small-letter-spacing);
    text-decoration: var(--eui-sys-typescale-headline-small-text-decoration);
  }
}
</style>
