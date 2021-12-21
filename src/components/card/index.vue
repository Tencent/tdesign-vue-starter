<template>
  <div :class="containerCls">
    <div v-if="title || $slots.title || $slots.option || subtitle || describe" :class="titleCls">
      <div :class="titleTextCls">
        {{ title }}
        <span v-if="describe" class="card-describe">{{ describe }}</span>
        <span v-if="subtitle" class="card-subtitle">{{ subtitle }}</span>
      </div>
      <div class="card-option">
        <slot name="option" />
      </div>
    </div>
    <div class="card-content">
      <slot />
    </div>
    <div v-if="size !== 'small'" class="card-spacer__bottom"></div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Card',
  props: {
    title: String,
    subtitle: {
      type: String,
      default: '',
    },
    compact: {
      type: Boolean,
      default: false,
    },
    describe: String,
    size: {
      type: String,
      default: 'default',
    },
    border: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    containerCls() {
      return ['card-container', { 'card-container--compact': this.compact, 'card-container--border': this.border }];
    },
    titleCls() {
      return [
        'card-title',
        {
          'card-title--small': this.size === 'small',
          'card-title--default': this.size !== 'small',
        },
      ];
    },
    titleTextCls() {
      return [
        {
          'card-title__text--small': this.size === 'small',
          'card-title__text--default': this.size !== 'small',
        },
      ];
    },
  },
});
</script>
<style lang="less">
@import '@/style/variables';

.t-col-lg-6 + .t-col-lg-6 {
  @media (max-width: @screen-md-max) {
    .card-container {
      margin-top: 16px;
    }
  }
}

.card {
  &-option {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-container {
    padding: 24px 32px;
    background: @bg-color-container;
    border-radius: @border-radius;
    width: 100%;
    display: flex;
    flex-direction: column;

    &-compact {
      padding: 16px 16px 0;
      margin-top: 24px;
      margin-bottom: 16px;
    }

    &--border {
      border: solid 1px @component-border;
    }
  }

  &-title {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    line-height: 24px;
    font-weight: 500;
    color: @text-color-primary;

    &--small {
      margin-bottom: 8px;
    }

    &--default {
      margin-bottom: 24px;
    }

    &__text {
      display: inline-flex;

      &--default {
        margin: @spacer 0;
        color: @text-color-primary;
      }
    }

    &-text-small {
      display: inline-block;
      width: 100%;
    }
  }

  &-describe {
    font-size: 14px;
    color: @brand-color;
    color: @text-color-placeholder;
    line-height: 22px;
    margin-left: 4px;
  }

  &-subtitle {
    font-size: 14px;
    color: @brand-color;
    color: @text-color-secondary;
    line-height: 22px;
    margin-left: 4px;
  }

  &-content {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex: 1;
  }

  &-spacer-bottom {
    height: @spacer;
  }
}
</style>
