<template>
  <div class="home">
    <div class="sorting-options-wrapper">
      <SortOptions
        @shuffle="onShuffle"
      />
    </div>
    <div class="sorting-vis-wrapper">
      <SortVis :collection="collection" />
    </div>
  </div>
</template>

<script>
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
    };
  },
  created() {
    this.collection = this.initializeCollection();
  },
  methods: {
    initializeCollection() {
      const collection = [];
      for (let i = 0; i < this.numOfElements; i += 1) {
        collection.push({ value: i, flag: 'none' });
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
