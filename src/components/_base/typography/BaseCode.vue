<script setup>
import BaseLabel from '@/components/_base/typography/BaseLabel.vue';

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <BaseLabel class="code">
    <code class="code__content">
      {{ props.text }}
    </code>
  </BaseLabel>
</template>

<style scoped>
.code__content {
  padding: 2px;
  color: var(--eui-sys-brand-secondary-01);
  word-break: break-all;
  background-color: var(--eui-sys-brand-primary-02);
}
</style>
