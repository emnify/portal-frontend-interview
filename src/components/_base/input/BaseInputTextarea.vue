<script setup>
import { computed, nextTick, ref, watch } from 'vue';

import BaseSupportMessage from '@/components/_base/form/BaseSupportMessage.vue';
import BaseBodyText from '@/components/_base/typography/BaseBodyText.vue';

const BORDERS_SAFE_PADDING = 2;
const INITIAL_TEXTAREA_HEIGHT = '48px';

const props = defineProps({
  name: {
    type: String,
    required: true,
    description: 'Unique textarea identifier',
  },
  modelValue: {
    type: [String, Number],
    description: 'Textarea value',
  },
  label: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: '',
    description: 'Helper text below textarea',
  },
  errorMessage: {
    type: String,
    default: '',
    description: 'Error text shown when validation for the textarea failed',
  },
  maxLength: {
    type: Number,
    description: 'Max length of textarea',
  },
  onDarkBackground: {
    type: Boolean,
    default: false,
    description: 'Set true for usage on surface-02 background, default usage: on surface-01',
  },
  isDisabled: {
    type: Boolean,
    default: false,
    description: 'Applies disabled state to textarea',
  },
  isStripped: {
    type: Boolean,
    default: false,
    description: 'Show textarea without border and label',
  },
});

const emit = defineEmits(['update:modelValue', 'change', 'keydown']);
const textareaElement = ref(null);

const currentMessage = computed(() => props.errorMessage || props.message);
const currentValueLength = computed(() => props.modelValue?.length || 0);
const counterText = computed(() => `${currentValueLength.value}  /  ${props.maxLength}`);

function resizeTextArea(target) {
  textareaElement.value.style.height = INITIAL_TEXTAREA_HEIGHT; // reset height
  textareaElement.value.style.height = `${target.scrollHeight + BORDERS_SAFE_PADDING}px`;
}

function onInput({ target }) {
  emit('update:modelValue', target.value);
}

watch(
  () => props.modelValue,
  () => {
    nextTick(() => {
      resizeTextArea(textareaElement.value);
    });
  },
);
</script>

<template>
  <div class="input textarea">
    <label class="textarea__wrapper">
      <textarea
        ref="textareaElement"
        class="input__field textarea__field"
        :class="{
          'textarea__field--stripped': props.isStripped,
          'input__field--state-disabled': props.isDisabled,
          'input__field--state-error': props.errorMessage,
          'input__field--state-filled': props.modelValue,
          'input__field--on-dark-background': props.onDarkBackground,
        }"
        :name="props.name"
        :value="props.modelValue"
        :disabled="props.isDisabled"
        rows="1"
        :maxlength="props.maxLength"
        @change="emit('change', $event.target.value)"
        @input="onInput($event)"
        @keydown="emit('keydown', $event)"
      />
      <span
        v-if="props.label"
        class="input__label"
      >
        {{ props.label }}
      </span>
    </label>
    <BaseBodyText
      class="textarea__support-text"
      size="small"
    >
      <BaseSupportMessage
        v-if="currentMessage"
        class="textarea__message"
        :message="currentMessage"
        :is-error="Boolean(props.errorMessage)"
      />
      <BaseSupportMessage
        v-if="maxLength"
        class="textarea__counter"
        :message="counterText"
        :is-error="Boolean(props.errorMessage)"
      />
    </BaseBodyText>
  </div>
</template>
<style src="./input.css" scoped />

<style scoped>
.textarea {
  position: relative;
  display: block;
  width: 100%;
}

.textarea__field--stripped {
  margin-bottom: 0;
  border-color: transparent;

  &:hover {
    border-color: transparent;
    box-shadow: none;
  }

  &:focus:not([readonly]) {
    border-color: transparent;
    box-shadow: none;

    & ~ .input__label {
      display: none;
    }
  }

  &.input__field--filled {
    & ~ .input__label {
      display: none;
    }
  }

  & ~ .textarea__support-text {
    padding-left: var(--eui-comp-input-container-padding-large-left);
  }
}

.textarea__field {
  display: block;
  resize: none;
  overflow: hidden;
  appearance: none;
}

.textarea__support-text {
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(2, auto);
}

.textarea__counter {
  grid-column: 2;
}
</style>
