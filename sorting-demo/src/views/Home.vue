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
        :numOfElements="numOfElements"
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
        :sortInProcess="sortInProcess"
      />
    </div>
    <div class="speed-slider-wrapper">
      <SpeedSlider :value="speedSliderValue" @input="onSpeedSliderInput" />
    </div>
    <div class="about-link-wrapper">
      <router-link to="/about">
        <div class="about-link">
          About <span class="arrow">&#9654;</span>
        </div>
      </router-link>
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
      sortTypeItems: [
        {
          text: 'Insertion Sort',
          value: 'insertionSort',
        },
        {
          text: 'Bubble Sort',
          value: 'bubbleSort',
        },
        {
          text: 'Selection Sort',
          value: 'selectionSort',
        },
      ],

      // Visualization params
      showHeights: true,
      showColorScale: true,
      showChanges: true,
      speedSliderValue: 50,
      numOfElementsSliderValue: 1,

      // Sort states
      sortInProcess: false,
      sortComplete: true,
      collectionShuffled: false,
      outerLoopIndex: 0,
      outerLoopTimeout: undefined,
      innerLoopIndex: 0,
      innerLoopTimeout: undefined,
    };
  },
  computed: {
    heightScale() {
      return scaleLinear()
        .domain([0, this.numOfElements])
        .range([1, 100]);
    },
    colorScale() {
      return scaleSequential(interpolateTurbo).domain([0, this.numOfElements]);
    },
    sortSpeed() {
      return scaleLinear()
        .domain([0, 100])
        .range([500, 0])(this.speedSliderValue);
    },
    numOfElements() {
      const numOfElementsOptions = [5, 10, 25, 50, 75, 100, 150, 200];
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
      if (sortType !== this.sortType) {
        this.sortType = sortType;
        this.resetSortState();
      }
    },
    onPlayButtonClick() {
      this.sortComplete = false;
      if (this.sortInProcess) {
        this.sortInProcess = false;
        this.stopSorting();
      } else if (this.isCollectionSorted()) {
        this.sortInProcess = true;
        this.shuffleThenStartSorting();
      } else {
        this.sortInProcess = true;
        this.startSorting();
      }
    },
    stopSorting() {
      clearTimeout(this.innerLoopTimeout);
      clearTimeout(this.outerLoopTimeout);
      if (this.sortType === 'insertionSort') {
        this.outerLoopIndex = this.innerLoopIndex + 1;
      } else if (this.sortType === 'bubbleSort') {
        this.outerLoopIndex = this.outerLoopIndex - 1;
      }
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
        this.$set(this.collection, i, {
          ...this.collection[i],
          flag: 'compareItem',
        });

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
                  if (item.flag === 'lastSorted') {
                    return { ...item, flag: 'sortedItem' };
                  }
                  return item;
                });
                valuesToSort[j + 1] = { ...temp, flag: 'lastSorted' };

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
      this.innerLoopIndex = 0;
      this.sortComplete = true;
      clearTimeout(this.outerLoopTimeout);
      clearTimeout(this.innerLoopTimeout);
      this.collection = this.initializeCollection();
    },
    onShowChanges() {
      this.showChanges = !this.showChanges;
    },
    onSpeedSliderInput(speedSliderValue) {
      this.speedSliderValue = speedSliderValue;
    },
    onNumOfElementsSliderInput(numOfElementsSliderValue) {
      this.numOfElementsSliderValue = numOfElementsSliderValue;
      this.resetSortState();
      this.collection = this.initializeCollection();
    },
    bubbleSort() {
      const valuesToSort = [...this.collection];
      const bubbleSortOuterLoop = (i) => {
        this.outerLoopTimeout = setTimeout(() => {
          const bubbleSortInnerLoop = (j) => {
            this.innerLoopTimeout = setTimeout(() => {
              if (
                valuesToSort[j + 1]
                && valuesToSort[j].value > valuesToSort[j + 1].value
              ) {
                const temp = valuesToSort[j];
                valuesToSort[j] = valuesToSort[j + 1];
                valuesToSort[j + 1] = temp;
              }

              this.collection = valuesToSort.map((item, index) => {
                if (index === j + 1) {
                  return { ...item, flag: 'compareItem' };
                }
                if (index === valuesToSort.length - i) {
                  return { ...item, flag: 'lastSorted' };
                }
                return item;
              });

              j += 1;

              if (j < valuesToSort.length - i - 1) {
                this.innerLoopIndex = j;
                bubbleSortInnerLoop(j);
              } else if (i < valuesToSort.length) {
                i += 1;
                this.innerLoopIndex = 0;
                this.outerLoopIndex = i;
                bubbleSortOuterLoop(i);
                this.collection = valuesToSort.map((item, index) => {
                  if (index === j) {
                    return { ...item, flag: 'compareItem' };
                  }
                  return item;
                });
              } else {
                setTimeout(() => {
                  this.collection = this.collection.map(item => ({
                    ...item,
                    flag: 'none',
                  }));
                  this.onSortComplete();
                }, this.sortSpeed);
              }
            }, this.sortSpeed);
          };
          bubbleSortInnerLoop(this.innerLoopIndex);
        }, this.sortSpeed);
      };

      bubbleSortOuterLoop(this.outerLoopIndex);
    },

    selectionSort() {
      const valuesToSort = [...this.collection];

      const selectionSortOuterLoop = (outerLoopIndex) => {
        this.outerLoopTimeout = setTimeout(() => {
          let i = outerLoopIndex;
          let min = i;

          this.innerLoopIndex = i + 1;

          const selectionSortInnerLoop = (innerLoopIndex) => {
            let j = Math.max(innerLoopIndex, this.innerLoopIndex);
            this.innerLoopIndex = j;

            this.innerLoopTimeout = setTimeout(() => {
              if (valuesToSort[j].value < valuesToSort[min].value) {
                min = j;
              }
              this.collection = valuesToSort.map((item, index) => {
                if (index < i - 1 || item.flag === 'scannedItem') {
                  return { ...item, flag: 'none' };
                }
                if (index === j) {
                  return { ...item, flag: 'scannedItem' };
                }
                if (index === min) {
                  return { ...item, flag: 'compareItem' };
                }
                if (index === i - 1) {
                  return { ...item, flag: 'lastSorted' };
                }
                return { ...item };
              });

              j += 1;
              this.innerLoopIndex = j;

              if (j < valuesToSort.length) {
                selectionSortInnerLoop(j);
              } else {
                if (min !== i) {
                  const temp = valuesToSort[i];
                  valuesToSort[i] = valuesToSort[min];
                  valuesToSort[min] = temp;
                }

                this.collection = valuesToSort.map((item, index) => {
                  if (index < i - 1 || item.flag === 'scannedItem') {
                    return { ...item, flag: 'none' };
                  }
                  if (index === i) {
                    return { ...item, flag: 'compareItem' };
                  }
                  return { ...item };
                });

                i += 1;
                this.outerLoopIndex = i;

                if (i < valuesToSort.length - 1) {
                  selectionSortOuterLoop(i);
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

          selectionSortInnerLoop(this.innerLoopIndex);
        }, this.sortSpeed);
      };

      selectionSortOuterLoop(this.outerLoopIndex);
    },
    isCollectionSorted() {
      const isSomeValueUnsorted = this.collection.some((item, index) => {
        if (index === 0) {
          return false;
        } if (this.collection[index - 1].value <= item.value) {
          return false;
        }
        return true;
      });
      return !isSomeValueUnsorted;
    },
    shuffleThenStartSorting() {
      this.collection = this.shuffleCollection(this.initializeCollection()).slice();
      setTimeout(() => {
        this.startSorting();
      }, 500);
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
    margin: 20px auto;
    flex-grow: 1;
    flex-basis: 100%;
  }
  .speed-slider-wrapper {
    width: 92%;
    margin: 0 auto;
    margin-top: 0;
    margin-bottom: 20px;
    max-width: 400px;
  }
  .about-link-wrapper {
    font-size: 14px;
    display: flex;
    justify-content: flex-end;
    @media screen and (max-width: 400px) {
      font-size: 11px;
    }
    .about-link {
      padding: 8px 12px;
      background: rgb(20, 20, 20);
      color: white;
      .arrow {
        font-size: 8px;
        position: relative;
        top: -1px;
      }
      &:hover {
        color: lightgrey;
      }
    }
  }
}
</style>
