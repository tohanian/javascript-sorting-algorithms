<template>
  <div class="sort-vis">
    <div
      class="sort-item"
      v-for="item in collection"
      :key="item.value"
      :style="{
        height: `${showHeights ? item.height : '100'}%`,
        background: showColorScale ? item.colorScale : '#EE4266',
      }"
    />
  </div>
</template>

<script>
export default {
  name: 'SortVis',
  props: {
    collection: {
      type: Array,
      required: true,
    },
    showHeights: {
      type: Boolean,
      default: true,
    },
    showColorScale: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.sort-vis {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  .sort-item {
    flex-basis: 100%;
    margin: 0 1px;
  }
}
</style>
