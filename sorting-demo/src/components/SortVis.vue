<template>
  <div class="sort-vis">
    <div
      class="sort-item"
      v-for="item in collection"
      :key="item.value"
      :style="{
        height: `${showHeights ? item.height : '100'}%`,
        background: getItemColor(item),
        border: getItemBorder(item),
        transition: getItemTransition(item),
      }"
    />
  </div>
</template>

<script>
export default {
  name: 'SortVis',
  data() {
    return {
      numOfItemsTransition: false,
    };
  },
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
  watch: {
    collection(val, oldVal) {
      if (val.length !== oldVal.length) {
        this.numOfItemsTransition = true;
        setTimeout(() => {
          this.numOfItemsTransition = false;
        }, 200);
      }
    },
  },
  methods: {
    getItemColor(item) {
      if (this.numOfItemsTransition) {
        return '#F4869D';
      }
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
    getItemBorder(item) {
      if (this.collection.length > 100) {
        return 'none';
      }
      return `1px solid ${this.getItemBorderColor(item)}`;
    },
    getItemTransition() {
      if (this.numOfItemsTransition) {
        return 'none';
      }
      return 'background-color 1.1s ease-out';
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
  }
}
</style>
