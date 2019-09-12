<template>
  <div class="home">
    <div class="sorting-options-wrapper">
      <SortOptions
        :showHeights="showHeights"
        :showColorScale="showColorScale"
        @shuffle="onShuffle"
        @showHeights="onShowHeights"
        @showColorScale="onShowColorScale"
      />
    </div>
    <div class="sorting-vis-wrapper">
      <SortVis
        :collection="collection"
        :showHeights="showHeights"
        :showColorScale="showColorScale"
      />
    </div>
  </div>
</template>

<script>
import { scaleLinear, scaleSequential } from 'd3-scale';
import { interpolateTurbo } from 'd3-scale-chromatic';
import SortVis from '../components/SortVis.vue';
import SortOptions from '../components/SortOptions.vue';

export default {
  name: 'home',
  components: {
    SortVis,
    SortOptions,
  },
  data() {
    return {
      collection: [],
      numOfElements: 25,
      showHeights: true,
      showColorScale: true,
    };
  },
  computed: {
    heightScale() {
      return scaleLinear().domain([0, this.numOfElements]).range([1, 100]);
    },
    colorScale() {
      return scaleSequential(interpolateTurbo).domain([0, this.numOfElements]);
    },
  },
  created() {
    this.collection = this.initializeCollection();
  },
  methods: {
    initializeCollection() {
      const collection = [];
      for (let i = 0; i < this.numOfElements; i += 1) {
        collection.push({
          value: i,
          flag: 'none',
          height: this.heightScale(i),
          colorScale: this.colorScale(i),
        });
      }
      return collection;
    },
    onShuffle() {
      this.collection = this.shuffleCollection(this.collection).slice();
    },
    shuffleCollection(collection) {
      for (let i = collection.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [collection[i], collection[j]] = [collection[j], collection[i]];
      }
      return collection;
    },
    onShowHeights() {
      this.showHeights = !this.showHeights;
    },
    onShowColorScale() {
      this.showColorScale = !this.showColorScale;
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .sorting-options-wrapper {
    width: 92%;
    margin: 20px auto;
    margin-bottom: 0;
  }
  .sorting-vis-wrapper {
    width: 92%;
    height: 100%;
    margin: 20px auto;
  }
}
</style>
