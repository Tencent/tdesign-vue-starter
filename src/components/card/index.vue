<template>
  <div :class="containerCls">
    <div :class="titleCls">
      <span :class="titleTextCls">
        {{ title }}
        <span v-if="describe" class="card-describe">{{ describe }}</span>
      </span>
      <span class="card-option">
        <slot name="option"></slot>
      </span>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
    <div v-if="size !== 'small'" class="card-spacer-bottom"></div>
  </div>
</template>
<script>
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
  },
  computed: {
    containerCls() {
      return ['card-container', { 'card-container-compact': this.compact }];
    },
    titleCls() {
      return [
        'card-title',
        {
          'card-title-small': this.size === 'small',
          'card-title-default': this.size !== 'small',
        },
      ];
    },
    titleTextCls() {
      return [
        {
          'card-title-text-small': this.size === 'small',
          'card-title-text-default': this.size !== 'small',
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
    display: flex;
    align-items: center;
    justify-content: center;
    // position: absolute;
    // top: 30px;
    // right: 32px;
  }

  &-container {
    padding: 24px 32px;
    margin: 16px 0;
    background: #fff;
    border-radius: @border-radius;
    width: 100%;
    display: flex;
    flex-direction: column;

    &-compact {
      padding: 16px 16px 0;
      margin-top: 24px;
      margin-bottom: 16px;
    }
  }

  &-title {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    line-height: 22px;
    font-family: PingFangSC-Regular;
    font-weight: 500;
    color: @text-color-primary;

    &-small {
      margin-bottom: 8px;
    }

    &-default {
      margin-bottom: 16px;
    }

    &-text {
      display: inline-flex;

      &-default {
        margin: @spacer 0;
      }
    }
  }

  &-describe {
    font-size: 14px;
    color: rgba(0, 0, 0, .6);
    line-height: 22px;
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
