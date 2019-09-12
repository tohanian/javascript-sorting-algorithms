<template>
  <div class="sort-options">
    <div class="ui-row">
      <div class="ui-item">
        <Button
          class="shuffle-button"
          @click="$emit('shuffle')"
        >
          Shuffle
        </Button>
      </div>
      <div class="ui-item">
        <Checkbox text="Show heights" :value="showHeights" @click="$emit('showHeights')" />
      </div>
      <div class="ui-item">
        <Checkbox text="Show colors" :value="showColorScale" @click="$emit('showColorScale')" />
      </div>
    </div>
  </div>
</template>

<script>
import Button from './Button.vue';
import Checkbox from './Checkbox.vue';

export default {
  name: 'SortOptions',
  components: { Button, Checkbox },
  props: {
    showHeights: {
      type: Boolean,
      default: true,
    },
    showColorScale: {
      type: Boolean,
      default: true,
    }
  },
};
</script>

<style lang="scss" scoped>
.sort-options {
  .ui-row {
    display: flex;
    margin: 0 -12px;
    align-items: center;
    .ui-item {
      margin: 0 12px;
    }
  }
}
</style>
