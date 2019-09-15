<template>
  <div class="sort-vis">
    <div
      class="sort-item"
      v-for="item in collection"
      :key="item.value"
      :style="{
        height: `${showHeights ? item.height : '100'}%`,
        background: getItemColor(item),
        border: `1px solid ${getItemBorderColor(item)}`
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
    showChanges: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getItemColor(item) {
      const baseColor = this.showColorScale ? item.colorScale : '#EE4266';
      if (this.showChanges && item.flag === 'insertItem') {
        return 'white';
      }
      return baseColor;
    },
    getItemBorderColor(item) {
      let borderColor = 'black';
      if (this.showChanges) {
        if (item.flag === 'insertItem' || item.flag === 'lastInserted') {
          borderColor = 'white';
        }
      }
      return borderColor;
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
    transition: background-color 1.1s ease-out;
  }
}
</style>
