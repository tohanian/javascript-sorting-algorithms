<template>
  <div class="about">
    <div class="content">
      <h1>About</h1>
      <p>
        <!-- eslint-disable-next-line max-len -->
        JS Sorting showcases visualizations of several sorting algorithms implemented in JavaScript. The algorithms that are currently represented are:
      </p>
      <ul>
        <li>Insertion sort</li>
        <li>Bubble sort</li>
        <li>Selection sort, (more planned to be added)</li>
      </ul>
      <p>
        <!-- eslint-disable-next-line max-len -->
        This sorting demo is made in Vue.js and utilizes the D3 library. The full MIT-licensed project can be found at
        <a href="https://github.com/tohanian/javascript-sorting-algorithms">
          https://github.com/tohanian/javascript-sorting-algorithms
        </a>
        . Also included in the repo are
        <a href="https://github.com/tohanian/javascript-sorting-algorithms/blob/master/sortingAlgorithms.js">
          general JavaScript implementations
        </a>
         of each sorting algorithm.
      </p>
      <p>Happy sorting!</p>
    </div>
    <div class="back-wrapper">
      <router-link to="/">
        <div class="back-link">
          <span class="arrow">
            <img
              :src="require('../assets/triangle-16.png')"
              width="8px"
              :style="{ transform: 'rotate(-90deg)' }"
            />
          </span>
          Back to JS Sort
        </div>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about {
  margin: 0 auto;
  overflow-y: scroll;
  max-width: 560px;
  height: 100%;
  .content {
    margin: 32px;
    h1 {
      font-size: 32px;
      color: #31CB00;
      text-transform: lowercase;
      letter-spacing: .2em;
      margin-top: 12px;
      margin-bottom: 22px;
    }
    p, ul {
      font-family: 'Karla', sans-serif;
      font-weight: thin;
      line-height: 1.5em;
      margin-bottom: 1.1em;
    }
    ul {
      margin-left: 38px;
      list-style-type: square;
      margin-top: 24px;
      margin-bottom: 24px;
    }
  }
  .back-wrapper {
    margin: 32px;
    font-size: 16px;
    text-transform: lowercase;
    letter-spacing: .2em;
  }
}
</style>
