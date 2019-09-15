<template>
  <div class="sort-vis">
    <div
      class="sort-item"
      v-for="item in collection"
      :key="item.value"
      :style="{
        height: `${showHeights ? item.height : '100'}%`,
        background: getItemColor(item),
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
  methods: {
    getItemColor(item) {
      // if (item.flag === 'insertItem') {
      //   return '#ff00cc';
      // } else if (item.flag === 'lastInserted') {
      //   return 'white';
      // }
      return this.showColorScale ? item.colorScale : '#EE4266';
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
