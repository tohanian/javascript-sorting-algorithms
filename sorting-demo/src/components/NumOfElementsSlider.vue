<template>
  <div class="speed-slider" :class="{ disabled }">
    <div class="slider-label">
      <div class="slider-icon-wrapper high-icon">
        <svg class="slider-icon" width="100%" viewBox="0 0 100 50">
          <rect
            width="25"
            height="16"
            :fill="disabled ?'rgba(255, 210, 63, .5)' : '#FFD23F'"
            transform="translate(0, 34)"
          />
          <rect
            width="25"
            height="32"
            :fill="disabled ?'rgba(255, 210, 63, .5)' : '#FFD23F'"
            transform="translate(37, 18)"
          />
          <rect
            width="25"
            height="50"
            :fill="disabled ?'rgba(255, 210, 63, .5)' : '#FFD23F'"
            transform="translate(75, 0)"
          />
        </svg>
      </div>
      <div class="label-wrapper">
        <label for="items-slider">Items</label>
      </div>
      <div class="slider-icon-wrapper low-icon">
        <svg class="slider-icon" width="100%" viewBox="0 0 100 50">
          <rect
            width="19"
            height="10"
            :fill="disabled ?'rgba(255, 210, 63, .5)' : '#FFD23F'"
            transform="translate(0, 40)"
          />
          <rect
            width="19"
            height="20"
            :fill="disabled ?'rgba(255, 210, 63, .5)' : '#FFD23F'"
            transform="translate(20, 30)"
          />
          <rect
            width="19"
            height="30"
            :fill="disabled ?'rgba(255, 210, 63, .5)' : '#FFD23F'"
            transform="translate(40, 20)"
          />
          <rect
            width="19"
            height="40"
            :fill="disabled ?'rgba(255, 210, 63, .5)' : '#FFD23F'"
            transform="translate(60, 10)"
          />
          <rect
            width="19"
            height="50"
            :fill="disabled ?'rgba(255, 210, 63, .5)' : '#FFD23F'"
            transform="translate(80, 0)"
          />
        </svg>
      </div>
    </div>
    <div class="range-slider">
      <input
        class="range-slider-input"
        type="range"
        name="speed-slider"
        :value="value"
        step="1"
        min="0"
        max="8"
        :disabled="disabled"
        @change="onChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'NumOfItemsSlider',
  props: {
    value: {
      type: Number,
      default: 4,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onChange(e) {
      this.$emit('input', Number(e.target.value));
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/mixins.scss';

.speed-slider {
  @include ui-element;
   color: #FFD23F;
   text-align: center;
  .slider-label {
    display: flex;
    justify-content: space-between;
    align-content: center;
    .slider-icon-wrapper {
      width: 24px;
      &.low-icon {
        margin-right: -2px;
      }
      &.high-icon {
        margin-left: 4px;
      }
    }
    .label-wrapper {
      flex-grow: 1;
    }
  }
  .range-slider {
    margin-top: 8px;
    .range-slider-input {
      -webkit-appearance: none;
      width: 100%;
      height: 4px;
      border: 1px solid #FFD23F;
      background: linear-gradient(0.25turn, black, darken(#FFD23F, 35%));
      outline: none;
      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        background: black;
        border: 1px solid #FFD23F;
        cursor: pointer;
      }
    }
  }
  &.disabled {
    .range-slider {
      .range-slider-input {
        border: 1px solid rgba(255, 210, 63, .5);
        &::-webkit-slider-thumb {
          border: 1px solid rgba(255, 210, 63, .5);
          cursor: default;
        }
      }
    }
  }
}
</style>
