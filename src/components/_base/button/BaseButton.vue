<script setup>
import { useSlots } from 'vue';

import BaseIcon from '@/components/_base/BaseIcon.vue';
import BaseLoadingSpinner from '@/components/_base/BaseLoadingSpinner.vue';

const props = defineProps({
  icon: {
    type: String,
    description: 'Icon name',
  },

  iconPosition: {
    type: String,
    default: 'leading',
    validator(value) {
      return ['leading', 'trailing'].includes(value);
    },
    description:
      'Defines icon position in button: leading - before the label, trailing - after the label',
  },

  tag: {
    type: String,
    default: 'button',
    description: 'Html tag with which the button should be rendered',
  },

  to: {
    type: Object,
    description: 'When link looks like button and we need to pass to prop',
  },

  type: {
    type: String,
    default: 'button',
    validator(value) {
      return ['button', 'submit', null].includes(value);
    },
    description: 'Type attribute for the button',
  },

  view: {
    type: String,
    default: 'primary',
    validator(value) {
      return [
        'primary',
        'primary-white',
        'primary-black',
        'secondary',
        'secondary-white',
        'secondary-black',
        'tertiary',
        'tertiary-white',
        'tertiary-black',
      ].includes(value);
    },
    description: 'Variant of the button, according to design system',
  },

  label: {
    type: String,
    default: null,
    description: 'Text to render in the button',
  },

  title: {
    type: String,
    default: null,
    description:
      'Text for a native button title (shown on long hover) and aria-label. Defaults to label',
  },

  size: {
    type: String,
    default: 'large',
    validator(value) {
      return ['large', 'medium', 'small'].includes(value);
    },
    description: 'Applies size to the button: large (default), medium, and small',
  },

  isFullWidth: {
    type: Boolean,
    default: false,
    description: 'If true, button takes all the available container width',
  },

  isActive: {
    type: Boolean,
    default: false,
    description: 'Applies active (pressed) state to the button, additional to native active state',
  },

  isHovered: {
    type: Boolean,
    default: false,
    description: 'Applies hover state to the button, additional to native hover',
  },

  isDisabled: {
    type: Boolean,
    default: null,
    description: 'Applies disabled state to the button, additional to native disabled attribute',
  },
  isLoading: {
    type: Boolean,
    default: null,
    description: 'Applies disabled state with loading indicator (spinner) to the button',
  },
});
const slots = useSlots();

function classSuffix() {
  if (!props.icon && !props.label && !slots.default) {
    // eslint-disable-next-line no-console
    return console.error('Please provide either icon or label for button');
  }

  if ((props.icon && !props.label) || slots.default) {
    return '-icon-only';
  }

  if (props.icon && props.label) {
    return `-icon-${props.iconPosition}`;
  }

  return '-label-only';
}
</script>

<template>
  <component
    :is="props.tag"
    class="button"
    :title="props.title || props.label"
    :aria-label="props.title || props.label"
    :disabled="props.isDisabled || props.isLoading"
    :type="props.type"
    :to="to"
    :class="[
      `button--view-${props.view}`,
      `button--size-${props.size}`,
      `button--size-${props.size}${classSuffix()}`,
      `button--icon-${props.iconPosition}`,
      {
        'button--state-full-width': props.isFullWidth,
        'button--state-active': props.isActive,
        'button--state-disabled': props.isDisabled,
        'button--state-hovered': props.isHovered,
        'button--state-loading': props.isLoading,
      },
    ]"
  >
    <slot>
      <BaseIcon
        v-if="props.icon"
        class="button__icon"
        :name="props.icon"
      />
      <span
        v-if="props.label"
        class="button__label"
      >
        {{ props.label }}
      </span>

      <BaseLoadingSpinner
        v-if="props.isLoading"
        class="button__loader"
      />
    </slot>
  </component>
</template>

<!-- <style src="@/assets/styles/design-tokens-variables/button.css" scoped /> -->
<style src="@/components/_base/button/button-primary.css" scoped />
<style src="@/components/_base/button/button-primary-white.css" scoped />
<style src="@/components/_base/button/button-primary-black.css" scoped />
<style src="@/components/_base/button/button-secondary.css" scoped />
<style src="@/components/_base/button/button-secondary-white.css" scoped />
<style src="@/components/_base/button/button-secondary-black.css" scoped />
<style src="@/components/_base/button/button-tertiary.css" scoped />
<style src="@/components/_base/button/button-tertiary-white.css" scoped />
<style src="@/components/_base/button/button-tertiary-black.css" scoped />

<style scoped>
.button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin: 0;
  padding: 0;
  font-family: var(--eui-sys-font-family-standard);
  text-align: center;
  cursor: pointer;
  outline: none;
  white-space: pre-line;
  appearance: none;
  box-sizing: border-box;

  &:focus-visible,
  &:focus {
    box-shadow: none;
  }
}

.button--icon-leading {
  text-align: left;
}

.button--state-full-width {
  width: 100%;
  justify-content: center;
}

.button__icon {
  fill: inherit;
}

.button--state-loading {
  .button__label {
    opacity: 0;
  }

  .button__icon {
    opacity: 0;
  }
}

.button--state-disabled {
  cursor: not-allowed;
}

.button__loader {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -12px 0 0 -12px;
}
</style>
