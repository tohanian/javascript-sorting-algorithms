<template>
  <div class="home">
    <div class="sorting-options-wrapper">
      <SortOptions
        :showHeights="showHeights"
        :showColorScale="showColorScale"
        :sortTypeItems="sortTypeItems"
        :sortType="sortType"
        :sortInProcess="sortInProcess"
        :showChanges="showChanges"
        :numOfElementsSliderValue="numOfElementsSliderValue"
        @shuffle="onShuffle"
        @showHeights="onShowHeights"
        @showColorScale="onShowColorScale"
        @sortTypeSelect="onSortTypeSelect"
        @playButtonClick="onPlayButtonClick"
        @showChanges="onShowChanges"
        @numOfElementsSliderInput="onNumOfElementsSliderInput"
      />
    </div>
    <div class="sorting-vis-wrapper">
      <SortVis
        :collection="collection"
        :showHeights="showHeights"
        :showColorScale="showColorScale"
        :showChanges="showChanges"
      />
    </div>
    <div class="speed-slider-wrapper">
      <SpeedSlider :value="speedSliderValue" @input="onSpeedSliderInput" />
    </div>
  </div>
</template>

<script>
import { scaleLinear, scaleSequential } from 'd3-scale';
import { interpolateTurbo } from 'd3-scale-chromatic';
import SortVis from '../components/SortVis.vue';
import SortOptions from '../components/SortOptions.vue';
import SpeedSlider from '../components/SpeedSlider.vue';

export default {
  name: 'home',
  components: {
    SortVis,
    SortOptions,
    SpeedSlider,
  },
  data() {
    return {
      collection: [],
      sortType: 'insertionSort',
      sortTypeItems: [{
        text: 'Insertion Sort', value: 'insertionSort',
      }],

      // Visualization params
      showHeights: true,
      showColorScale: true,
      showChanges: false,
      speedSliderValue: 85,
      numOfElementsSliderValue: 4,

      // Sort states
      sortInProcess: false,
      outerLoopIndex: 0,
      outerLoopTimeout: undefined,
      innerLoopIndex: undefined,
      innerLoopTimeout: undefined,
    };
  },
  computed: {
    heightScale() {
      return scaleLinear().domain([0, this.numOfElements]).range([1, 100]);
    },
    colorScale() {
      return scaleSequential(interpolateTurbo).domain([0, this.numOfElements]);
    },
    sortSpeed() {
      return scaleLinear().domain([0, 100]).range([500, 1])(this.speedSliderValue);
    },
    numOfElements() {
      const numOfElementsOptions = [10, 25, 50, 60, 70, 80, 100, 150, 200];
      return numOfElementsOptions[this.numOfElementsSliderValue];
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
    onSortTypeSelect(sortType) {
      this.sortType = sortType;
    },
    onPlayButtonClick() {
      this.sortInProcess = !this.sortInProcess;

      if (this.sortInProcess) {
        this.startSorting();
      } else {
        this.stopSorting();
      }
    },
    stopSorting() {
      clearTimeout(this.innerLoopTimeout);
      clearTimeout(this.outerLoopTimeout);
      this.outerLoopIndex = this.innerLoopIndex + 1;
    },
    startSorting() {
      if (this.sortType && this[this.sortType]) {
        this[this.sortType]();
      }
    },
    insertionSort() {
      let valuesToSort = [...this.collection];

      const insertionSortOuterLoop = (outerLoopIndex) => {
        let i = outerLoopIndex;
        this.$set(this.collection, i, { ...this.collection[i], flag: 'insertItem' });


        this.outerLoopTimeout = setTimeout(() => {
          const temp = valuesToSort[i];

          const insertionSortInnerLoop = (innerLoopIndex) => {
            let j = innerLoopIndex;

            this.innerLoopTimeout = setTimeout(() => {
              if (j >= 0 && valuesToSort[j].value > temp.value) {
                valuesToSort[j + 1] = valuesToSort[j];

                this.collection = valuesToSort.map((item, index) => {
                  if (index === j) {
                    return temp;
                  }
                  return item;
                });

                j -= 1;
                this.innerLoopIndex = j;

                insertionSortInnerLoop(j);
              } else {
                valuesToSort = valuesToSort.map((item) => {
                  if (item.flag === 'lastInserted') {
                    return { ...item, flag: 'sortedItem' };
                  }
                  return item;
                });
                valuesToSort[j + 1] = { ...temp, flag: 'lastInserted' };

                this.collection = valuesToSort;

                i += 1;

                if (i < this.collection.length) {
                  this.outerLoopIndex = i;
                  insertionSortOuterLoop(i);
                } else {
                  setTimeout(() => {
                    this.collection = this.collection.map(item => ({
                      ...item,
                      flag: 'none',
                    }));
                    this.onSortComplete();
                  }, this.sortSpeed);
                }
              }
            }, this.sortSpeed);
          };

          insertionSortInnerLoop(i - 1);
        }, this.sortSpeed);
      };

      insertionSortOuterLoop(this.outerLoopIndex);
    },
    onSortComplete() {
      this.sortInProcess = false;
      this.resetSortState();
    },
    resetSortState() {
      this.outerLoopIndex = 0;
      this.innerLoopIndex = undefined;
      clearTimeout(this.outerLoopTimeout);
      clearTimeout(this.innerLoopTimeout);
    },
    onShowChanges() {
      this.showChanges = !this.showChanges;
    },
    onSpeedSliderInput(speedSliderValue) {
      this.speedSliderValue = speedSliderValue;
    },
    onNumOfElementsSliderInput(numOfElementsSliderValue) {
      this.numOfElementsSliderValue = numOfElementsSliderValue;
      this.collection = this.initializeCollection();
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
  .speed-slider-wrapper {
    width: 92%;
    margin: 10px auto;
    max-width: 400px;
  }
}
</style>
