<template>
  <div :class="containerCls">
    <div :class="titleCls">
      <div :class="titleTextCls">
        {{ title }}
        <span v-if="describe" class="card-describe">{{ describe }}</span>
      </div>
      <div class="card-option">
        <slot name="option"></slot>
      </div>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
    <div v-if="size !== 'small'" class="card-spacer__bottom"></div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'card',
  props: {
    title: String,
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
};
</script>
<style lang="less" scoped>
@import url('@/style/index.less');

.t-col > .card-container {
  margin: 0;
}

.card {

  &-option {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &-container {
    padding: 24px 32px;
    margin: 16px 0;
    background: @bg-color-container;
    border-radius: @border-radius;
    width: 100%;
    display: flex;
    flex-direction: column;

    &.main-color {
      background: @brand-color;
    }

    &--compact {
      padding: 16px 16px 0;
      margin-top: 24px;
      margin-bottom: 16px;
    }

    &--border {
      border: 1px solid #ebebeb;
    }
  }

  &-title {
    display: flex;
    justify-content: space-between;
    font-family: PingFangSC-Regular;
    font-weight: 500;
    color: @text-color-primary;

    &--small {
      font-size: 14px;
      line-height: 22px;
      margin-bottom: 8px;
    }

    &--default {
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 24px;
    }

    &__text {
      display: inline-flex;

      &--default {
        margin: @spacer 0;
      }
    }
  }

  &-describe {
    font-size: 14px;
    color: @text-color-secondary;
    line-height: 22px;
  }

  &-content {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex: 1;
  }

  &-spacer__bottom {
    height: @spacer;
  }
}
</style>
