<script setup>
import BaseIcon from '@/components/_base/BaseIcon.vue';

const props = defineProps({
  icon: {
    type: String,
    required: true,
    description: 'Icon name',
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
    default: 'black',
    validator(value) {
      return ['black', 'white'].includes(value);
    },
    description: 'Variant of the icon button, according to design system',
  },
  title: {
    type: String,
    default: null,
    description: 'Text for a native button title (shown on long hover) and aria-label',
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
});
</script>

<template>
  <component
    :is="props.tag"
    class="icon-button"
    :title="props.title"
    :aria-label="props.title"
    :disabled="props.isDisabled"
    :type="props.type"
    :to="to"
    :class="[
      `icon-button--view-${props.view}`,
      {
        'icon-button--state-active': props.isActive,
        'icon-button--state-disabled': props.isDisabled,
        'icon-button--state-hovered': props.isHovered,
      },
    ]"
  >
    <BaseIcon
      class="icon-button__icon"
      :name="props.icon"
    />
  </component>
</template>

<style src="@/assets/styles/design-tokens-variables/icon-button.css" scoped />
<style src="@/components/_base/icon-button/icon-button-black.css" scoped />
<style src="@/components/_base/icon-button/icon-button-white.css" scoped />

<style scoped>
.icon-button {
  position: relative;
  display: flex;
  background-color: transparent;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  appearance: none;

  &:focus-visible,
  &:focus {
    box-shadow: none;
  }
}

.icon-button[disabled],
.icon-button--state-disabled {
  cursor: not-allowed;
}
</style>
