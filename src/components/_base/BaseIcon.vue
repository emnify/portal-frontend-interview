<script setup>
import { defineAsyncComponent, watch, shallowRef } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  countryFlag: {
    type: Boolean,
    default: false,
  },
});

function generateComponentName(_string) {
  return (
    'EuiIcon' +
    _string
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('')
  );
}

const icon = shallowRef(null);

watch(
  () => props.name,
  () => {
    icon.value = defineAsyncComponent(
      () => import(`@/components/icons/${generateComponentName(props.name)}.vue`),
    );
  },
  { immediate: true },
);
</script>

<template>
  <div
    :id="props.name"
    class="icon"
  >
    <component
      :is="icon"
      class="icon__image"
      :class="{ 'icon__image--customizable': !props.countryFlag }"
    />
  </div>
</template>

<style scoped>
.icon {
  position: relative;
  display: inline-block;
  width: 24px;
  min-width: 24px;
  height: 24px;
  vertical-align: top;
  fill: var(--eui-sys-layout-on-surface-subdued);
}

.icon__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.icon__image--customizable {
  fill: inherit;
}
</style>
