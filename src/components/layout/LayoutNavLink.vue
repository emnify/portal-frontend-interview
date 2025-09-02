<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import BaseIcon from '@/components/_base/BaseIcon.vue';
import BaseBodyText from '@/components/_base/typography/BaseBodyText.vue';
import BaseLabel from '@/components/_base/typography/BaseLabel.vue';
import BaseLink from '@/components/_base/BaseLink.vue';

const { t } = useI18n();
const route = useRoute();
const props = defineProps({
  navLink: {
    type: Object,
    required: true,
  },
});

const isCurrentRoute = computed(() =>
  route.matched.some(({ name }) => name === props.navLink.route.name),
);

const textComponent = computed(() => {
  return isCurrentRoute.value ? BaseLabel : BaseBodyText;
});
</script>
<template>
  <div
    class="layout-nav-link"
  >
    <BaseLink
      class="layout-nav-link__value"
      :to="props.navLink.route"
      :exact-path="props.navLink.exact"
      inherit-styles
    >
      <i
        aria-hidden="true"
        class="layout-nav-link__background"
      />

      <BaseIcon
        class="layout-nav-link__icon"
        :name="props.navLink.icon"
      />

      <div class="layout-nav-link__text-wrapper">
        <component
          :is="textComponent"
          class="layout-nav-link__text"
          :class="{ 'layout-nav-link__text--beta': props.navLink.beta }"
          size="medium"
          :text="t(props.navLink.text)"
        />
      </div>
    </BaseLink>
  </div>
</template>

<style scoped>
.layout-nav-link {
  box-sizing: border-box;
}

.layout-nav-link--dark {
  .layout-nav-link__value {
    fill: var(--eui-sys-layout-on-surface-subdued);

    &:hover {
      color: var(--eui-sys-layout-on-surface);
      fill: var(--eui-sys-layout-on-surface);

      .layout-nav-link__background {
        @media (--viewport-desktop) {
          background: var(--eui-sys-layout-surface-01);
        }
      }
    }

    &:focus {
      color: var(--eui-sys-layout-on-surface);
      fill: var(--eui-sys-layout-on-surface);

      .layout-nav-link__background {
        @media (--viewport-desktop) {
          box-shadow: 0 0 0 2px var(--eui-sys-layout-on-surface) inset;
        }
      }
    }
  }

  .router-link-active {
    color: var(--eui-sys-layout-on-surface);
    fill: var(--eui-sys-layout-on-surface);

    &:hover {
      color: var(--eui-sys-layout-on-surface);
      fill: var(--eui-sys-layout-on-surface);

      .layout-nav-link__background {
        background: var(--eui-sys-layout-surface-02);
      }
    }

    .layout-nav-link__background {
      background: var(--eui-sys-layout-surface-02);
    }
  }
}

.layout-nav-link__value {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 35px;
  padding: 7px 5px 7px 63px;
  text-align: left;
  fill: var(--eui-sys-layout-on-surface-subdued);
  box-sizing: border-box;

  @mixin text-ellipsis;

  &:hover {
    fill: var(--eui-sys-layout-on-surface);
    box-shadow: none;

    .layout-nav-link__background {
      @media (--viewport-desktop) {
        background: var(--eui-sys-layout-surface-01);
      }
    }

    .layout-nav-link__text {
      color: var(--eui-sys-layout-on-surface);
    }
  }

  &:focus-visible {
    box-shadow: none;

    .layout-nav-link__background {
      @media (--viewport-desktop) {
        box-shadow: 0 0 0 2px var(--eui-sys-brand-primary-01) inset;
      }
    }
  }
}

.layout-nav-link__text {
  display: inline-block;
  max-width: 180px;
  color: var(--eui-sys-layout-on-surface);

  @mixin text-ellipsis;
}

.layout-nav-link__background {
  position: absolute;
  top: 0;
  left: 0;
  width: 90%;
  border-radius: 0 8px 8px 0;
  height: 100%;
  background: transparent;
}

.router-link-active {
  fill: var(--eui-sys-brand-on-primary-02);

  &:hover {
    fill: var(--eui-sys-brand-on-primary-02);

    .layout-nav-link__background {
      background: var(--eui-sys-brand-primary-02);
    }

    .layout-nav-link__text {
      color: var(--eui-sys-brand-on-primary-02);
    }
  }

  .layout-nav-link__background {
    background: var(--eui-sys-brand-primary-02);
  }

  .layout-nav-link__text {
    color: var(--eui-sys-brand-on-primary-02);
  }
}

.layout-nav-link__icon {
  position: absolute;
  top: 50%;
  left: 17px;
  fill: inherit;
  transform: translateY(-50%);
}

.layout-nav-link__text-wrapper {
  position: relative;
  display: inline-flex;
}
</style>
