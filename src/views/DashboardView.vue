<script setup>
import { useI18n } from 'vue-i18n';
import BaseBodyText from '@/components/_base/typography/BaseBodyText.vue';
import BaseHeadline from '@/components/_base/typography/BaseHeadline.vue';

const { t } = useI18n();
</script>

<template>
  <div class="dashboard">
    <BaseHeadline size="large" tag="h1" :text="t('dashboard.title')" />
    <BaseBodyText size="medium" :text="t('dashboard.welcome')" />
  </div>
</template>

<style scoped>
li {
  margin-bottom: 5px;
  margin-left: 15px;
  list-style-type: disc;
}
</style>
