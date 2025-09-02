<script setup>
import { computed, nextTick, onMounted, ref, useSlots } from 'vue';

import { isNil } from '@/utils/functions/is-nil';

import BaseSupportMessage from '@/components/_base/form/BaseSupportMessage.vue';

/**
 * Design system input component without usage-specific logic
 * for portal form input use GlobalInput.vue
 *
 * BaseInput.vue can be used when design system input is used
 * as part of some other component and requires additional logic
 */

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: false,
    description: 'Input value',
  },
  type: {
    type: String,
    default: () => 'text',
    description: 'Input type',
  },
  name: {
    type: String,
    required: true,
    description: 'Unique input identifier',
  },
  minlength: {
    type: String,
    description: 'Unique input identifier',
  },
  maxlength: {
    type: String,
    description: 'Unique input identifier',
  },
  label: {
    type: String,
    default: '',
    description: 'Input label',
  },
  placeholder: {
    type: String,
    default: '',
    description: 'Input placeholder, shown on focus before entering the value',
  },
  message: {
    type: String,
    default: '',
    description: 'Helper text below input',
  },
  errorMessage: {
    type: String,
    default: '',
    description: 'Error text shown when validation for the input failed',
  },
  isDisabled: {
    type: Boolean,
    default: false,
    description: 'Applies disabled state to input',
  },
  onDarkBackground: {
    type: Boolean,
    default: false,
    description: 'Set true for usage on surface-02 background, default usage: on surface-01',
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
  autofocus: {
    type: Boolean,
    default: false,
    description: 'Set focus to input when it is mounted',
  },
  readonly: {
    type: Boolean,
    default: null,
    description: 'Set readonly attribute to input',
  },
});

const emit = defineEmits(['input', 'update:modelValue', 'change', 'blur', 'enter-press']);
const inputElement = ref(null);

const slots = useSlots();
const hasIcon = computed(() => !!slots.icon);

const currentMessage = computed(() => props.errorMessage || props.message);

const isInputFilled = computed(() => {
  return !isNil(props.modelValue) && props.modelValue !== '';
});

function onInput(event) {
  emit('input', event.target.value);
  emit('update:modelValue', event.target.value);
}

onMounted(async () => {
  if (props.autofocus) {
    await nextTick();
    inputElement.value.focus();
  }
});
</script>
<template>
  <div class="input">
    <label class="input__wrapper">
      <input
        ref="inputElement"
        :value="props.modelValue"
        :name="props.name"
        class="input__field"
        :class="{
          'input__field--state-disabled': props.isDisabled,
          'input__field--state-error': props.errorMessage,
          'input__field--state-filled': isInputFilled,
          'input__field--on-dark-background': props.onDarkBackground,
          'input__field--icon-trailing': hasIcon,
        }"
        :placeholder="props.placeholder"
        :aria-placeholder="props.placeholder"
        :autocomplete="props.autocomplete"
        :type="props.type"
        :disabled="props.isDisabled"
        :readonly="props.readonly"
        :minlength="props.minlength"
        :maxlength="props.maxlength"
        @input="onInput"
        @change="emit('change', $event.target.value)"
        @blur="emit('blur', props.errorMessage ? null : $event.target.value)"
        @keydown.enter.prevent="
          emit('enter-press', props.errorMessage ? null : $event.target.value)
        "
      />
      <span
        v-if="props.label"
        class="input__label"
      >
        {{ props.label }}
      </span>
      <span
        v-if="hasIcon"
        class="input__icon"
      >
        <slot name="icon" />
      </span>
    </label>
    <BaseSupportMessage
      v-if="currentMessage"
      class="input__message"
      :message="currentMessage"
      :is-error="Boolean(props.errorMessage)"
    />
  </div>
</template>

<style src="./input.css" scoped />
