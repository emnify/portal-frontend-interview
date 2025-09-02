<script setup>
import { useI18n } from 'vue-i18n';
import BaseHeadline from '@/components/_base/typography/BaseHeadline.vue';

const { t } = useI18n();
</script>

<template>
  <div class="users">
    <BaseHeadline size="large" tag="h1" :text="t('users.title')" />
  </div>
</template>

<style scoped></style>
