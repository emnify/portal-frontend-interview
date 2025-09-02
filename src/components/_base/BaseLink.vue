<script setup>
import { computed } from 'vue';

const props = defineProps({
  to: {
    type: [String, Object],
  },
  replace: {
    type: Boolean,
    default: false,
  },
  exactPath: {
    type: Boolean,
    default: false,
  },
  exactActiveClass: {
    type: String,
    default: 'router-link-exact-path-active',
  },
  activeClass: {
    type: String,
    default: 'router-link-active',
  },
  externalLinkInSameTab: {
    type: Boolean,
    default: false,
  },
  inheritStyles: {
    type: Boolean,
    default: false,
    description:
      'If set to true, link styles would not be applied. Link will inherit styles from parent',
  },
  buttonLink: {
    type: Boolean,
    default: false,
    description: 'Set to true renders as button styles as link and emits event on click',
  },
  size: {
    default: 'large',
    validator(value) {
      return ['large', 'medium', 'small', 'x-small'].includes(value);
    },
  },
});

const emit = defineEmits(['link-click']);

const isExternalLink = computed(() => /^(http|mailto)/.test(props.to));
const target = computed(() => (props.externalLinkInSameTab ? '_self' : '_blank'));
const activeComponent = computed(() => {
  if (props.buttonLink) {
    return 'button';
  }
  if (isExternalLink.value) {
    return 'a';
  }

  return 'router-link';
});

const externalLinkProperties = computed(() => ({
  target: target.value,
  href: props.to,
}));

const routerLinkProperties = computed(() => ({
  to: props.to,
  ...props,
}));

const componentProperties = computed(() => {
  if (props.buttonLink) return { type: 'button' };

  return isExternalLink.value ? externalLinkProperties.value : routerLinkProperties.value;
});

const handleLinkClick = () => {
  if (props.buttonLink) {
    emit('link-click');
  }
};
</script>
<template>
  <component
    :is="activeComponent"
    v-bind="componentProperties"
    class="link"
    :class="[`link--size-${props.size}`, { 'link--inherit-styles': props.inheritStyles }]"
    @click="handleLinkClick"
  >
    <slot />
  </component>
</template>

<style scoped>
.link {
  color: var(--eui-sys-brand-secondary-01);
  text-underline-offset: 2px;
  cursor: pointer;

  &:focus-visible,
  &:hover {
    color: var(--eui-sys-brand-state-secondary-01-hover);
    text-decoration-color: var(--eui-sys-brand-state-secondary-01-hover);
  }
}

.link--size-large {
  font-size: var(--eui-sys-typescale-link-large-font-size);
  font-weight: var(--eui-sys-typescale-link-large-font-weight);
  line-height: var(--eui-sys-typescale-link-large-line-height);
  letter-spacing: var(--eui-sys-typescale-link-large-letter-spacing);
  text-decoration: var(--eui-sys-typescale-link-large-text-decoration);
}

.link--size-medium {
  font-size: var(--eui-sys-typescale-link-medium-font-size);
  font-weight: var(--eui-sys-typescale-link-medium-font-weight);
  line-height: var(--eui-sys-typescale-link-medium-line-height);
  letter-spacing: var(--eui-sys-typescale-link-medium-letter-spacing);
  text-decoration: var(--eui-sys-typescale-link-medium-text-decoration);
}

.link--size-small {
  font-size: var(--eui-sys-typescale-link-small-font-size);
  font-weight: var(--eui-sys-typescale-link-small-font-weight);
  line-height: var(--eui-sys-typescale-link-small-line-height);
  letter-spacing: var(--eui-sys-typescale-link-small-letter-spacing);
  text-decoration: var(--eui-sys-typescale-link-small-text-decoration);
}

.link--size-x-small {
  font-size: var(--eui-sys-typescale-link-x-small-font-size);
  font-weight: var(--eui-sys-typescale-link-x-small-font-weight);
  line-height: var(--eui-sys-typescale-link-x-small-line-height);
  letter-spacing: var(--eui-sys-typescale-link-x-small-letter-spacing);
  text-decoration: var(--eui-sys-typescale-link-x-small-text-decoration);
}

.link--inherit-styles {
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
  text-decoration: none;

  &:focus-visible {
    color: inherit;
  }

  &:hover {
    color: inherit;
  }
}
</style>
