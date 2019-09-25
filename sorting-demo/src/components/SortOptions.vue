<template>
  <div class="sort-options">
    <div class="ui-row main-controls">
      <div class="ui-item sort-type-select-wrapper">
        <Select
          placeholder="Sort Type"
          :items="sortTypeItems"
          :value="sortType"
          :disabled="sortInProcess"
          @input="(sortType) => $emit('sortTypeSelect', sortType)"
        />
      </div>
      <div class="ui-item num-of-elements-wrapper hide-mobile">
        <NumOfElementsSlider
          :disabled="sortInProcess"
          :value="numOfElementsSliderValue"
          :numOfElements="numOfElements"
          @input="onNumOfElementsInput"
        />
      </div>
      <div class="ui-item shuffle-button-wrapper hide-mobile">
        <Button
          class="shuffle-button"
          :disabled="sortInProcess"
          @click="$emit('shuffle')"
        >
          Shuffle
        </Button>
      </div>
      <div class="ui-item play-button-wrapper">
        <PlayButton
          :sortInProcess="sortInProcess"
          @click="$emit('playButtonClick')"
        />
      </div>
    </div>
    <div class="ui-row display-mobile">
      <div class="ui-item num-of-elements-wrapper">
        <NumOfElementsSlider
          :disabled="sortInProcess"
          :value="numOfElementsSliderValue"
          :numOfElements="numOfElements"
          @input="onNumOfElementsInput"
        />
      </div>
      <div class="ui-item shuffle-button-wrapper">
        <Button
          class="shuffle-button"
          :disabled="sortInProcess"
          @click="$emit('shuffle')"
        >
          Shuffle
        </Button>
      </div>
    </div>
    <div class="ui-row visual-options">
      <div class="ui-item show-heights">
        <Checkbox text="Show heights" :value="showHeights" @click="$emit('showHeights')" />
      </div>
      <div class="ui-item show-colors">
        <Checkbox text="Show colors" :value="showColorScale" @click="$emit('showColorScale')" />
      </div>
      <div class="ui-item show-changes">
        <Checkbox text="Highlight changes" :value="showChanges" @click="$emit('showChanges')" />
      </div>
    </div>
  </div>
</template>

<script>
import Button from './Button.vue';
import Checkbox from './Checkbox.vue';
import Select from './Select.vue';
import PlayButton from './PlayButton.vue';
import NumOfElementsSlider from './NumOfElementsSlider.vue';

export default {
  name: 'SortOptions',
  components: {
    Button, Checkbox, Select, PlayButton, NumOfElementsSlider,
  },
  props: {
    showHeights: {
      type: Boolean,
      default: true,
    },
    showColorScale: {
      type: Boolean,
      default: true,
    },
    sortTypeItems: {
      type: Array,
      default: () => [],
    },
    sortType: {
      type: String,
      default: null,
    },
    sortInProcess: {
      type: Boolean,
      default: false,
    },
    showChanges: {
      type: Boolean,
      default: false,
    },
    numOfElementsSliderValue: {
      type: Number,
      default: 4,
    },
    numOfElements: {
      type: Number,
    },
  },
  methods: {
    onNumOfElementsInput(numOfElements) {
      this.$emit('numOfElementsSliderInput', numOfElements);
    },
  },
};
</script>

<style lang="scss" scoped>
.sort-options {
  .ui-row {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: flex-start;
    .ui-item {
      margin: 0 12px;
    }
    .num-of-elements-wrapper {
      flex-grow: 1;
      max-width: 260px;
    }
    .play-button-wrapper {
      flex-grow: 1;
    text-align: right;
    }
  }
  .main-controls {
    margin-bottom: 8px;
  }
  .visual-options {
    .ui-item {
      width: 33%;
    }
    .show-heights {
      width: 30%
    }
    .show-colors {
      width: 30%;
    }
    .show-changes {
      width: 40%;
    }
  }
  .display-mobile {
    display: none;
    margin-top: 14px;
    margin-bottom: 8px;
    justify-content: space-between;
  }
  @media only screen and (max-width: 650px) {
    .display-mobile {
      display: flex;
    }
    .hide-mobile {
      display: none;
    }
  }
  @media only screen and (min-width: 950px) {
    flex-grow: 0;
    .play-button-wrapper {
      text-align: left;
    }
  }
}
</style>
