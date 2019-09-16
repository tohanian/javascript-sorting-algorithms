<template>
  <div class="speed-slider">
    <div class="slider-label">
      <div>
        <label for="speed-slider">Sort Speed</label>
      </div>
      <div class="slider-icon-wrapper">
        <svg class="slider-icon" width="100%" viewBox="0 0 100 50">
          <polygon points="0 50, 100 50, 100 0" fill="#FFD23F" />
        </svg>
      </div>
    </div>
    <div class="range-slider">
      <input
        class="range-slider-input"
        type="range"
        name="speed-slider"
        :value="value"
        @input="onInput"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpeedSlider',
  props: {
    value: {
      type: Number,
      default: 50,
    },
  },
  methods: {
    onInput(e) {
      this.$emit('input', Number(e.target.value));
    },
  },
};
</script>

<style lang="scss" scoped>
.speed-slider {
  color: #FFD23F;
  .slider-label {
    display: flex;
    justify-content: space-between;
    align-content: center;
    .slider-icon-wrapper {
      width: 24px;
    }
  }
  .range-slider {
    margin-top: 2px;
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
      }
    }
  }
}
</style>
