<template>
  <button class="button" :class="{ disabled }" :disabled="disabled" @click="$emit('click')">
    <div class="button-content">
      <div class="button-text">
        <slot />
      </div>
      <div class="hover-transition" />
    </div>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/mixins.scss';

.button {
  @include ui-element;
  padding: 6px 12px;
  background: none;
  border: 1px solid #FFD23F;
  border-radius: 0;
  outline: none;
  box-shadow: none;
  cursor: pointer;
  font-family: 'Space Mono', monospace;
  .button-content {
    position: relative;
    .button-text {
      z-index: 1;
      position: relative;
    }
    .hover-transition {
      height: 0;
      width: calc(100% + 24px);
      position: absolute;
      left: -12px;
      bottom: -6px;
      background: darken(#FFD23F, 50%);
      transition: height .2s ease;
    }
  }
  &:hover {
    .button-content {
      .hover-transition {
        height: calc(100% + 12px);
      }
    }
  }
  &:active {
    .button-content {
      .hover-transition {
        background: darken(#FFD23F, 52%);
      }
    }
  }
  &:disabled {
    color: rgba(255, 210, 63, .5);
    border-color: rgba(255, 210, 63, .5);
    cursor: default;
    &:hover {
      .button-content {
        .hover-transition {
          height: 0;
        }
      }
    }
  }
}
</style>
