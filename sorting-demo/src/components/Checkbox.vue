<template>
  <div class="checkbox">
    <div class="checkbox-control" role="checkbox" :aria-checked="value" @click="$emit('click')">
      <div v-if="value" class="checkbox-tick">
        <div class="tick tick-left" />
        <div class="tick tick-right" />
      </div>
    </div>
    <div @click="$emit('click')">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    text: {
      type: String,
      required: false,
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/mixins.scss';

.checkbox {
  @include ui-element;
  display: flex;
  align-items: center;
  width: auto;
  margin: 12px 0;
  .checkbox-control {
    border: 1px solid #FFD23F;
    width: 16px;
    min-width: 16px;
    height: 16px;
    margin-right: 12px;
    cursor: pointer;
    position: relative;
    transition: background-color .2s ease-in-out;
    .checkbox-tick {
      height: 96%;
      width: 96%;
      position: absolute;
      .tick {
        height: 100%;
        width: 2px;
        background: #FFD23F;
        position: absolute;
        left: 7px;
        top: 1px;
        &.tick-left {
          transform: rotate(-45deg);
        }
        &.tick-right {
          transform: rotate(45deg);
        }
      }
    }
    &:hover {
      background: darken(#FFD23F, 50%);
    }
  }
}
</style>
