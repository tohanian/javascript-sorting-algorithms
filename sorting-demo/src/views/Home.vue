<template>
  <div class="home">
    <div class="sorting-vis-wrapper">
      <SortVis :collection="collection" />
    </div>
  </div>
</template>

<script>
import SortVis from '../components/SortVis.vue';

export default {
  name: 'home',
  components: {
    SortVis,
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
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .sorting-vis-wrapper {
    width: 92%;
    height: 100%;
    margin: 20px auto;
  }
}
</style>
