<template>
  <button
    ref="playButton"
    class="play-button"
    :class="{ 'playing': isPlaying }"
    @click="goToNextState"
  >
    <svg ref="iconSvg" width="100%" height="100%" viewBox="0 0 36 36" >
      <defs>
        <path
          ref="pauseIcon"
          id="pause-icon"
          data-state="playing"
          d="M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26"
        />
        <path
          ref="playIcon"
          id="play-icon"
          data-state="paused"
          d="M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28"
        />
      </defs>
      <use xlink:href="#play-icon" />
    </svg>
  </button>
</template>

<script>
import { select } from 'd3-selection';
// eslint-disable-next-line
import { transition } from 'd3-transition';

export default {
  name: 'PlayButton',
  data() {
    return {
      states: {
        playing: {
          nextState: 'paused',
          iconRef: 'pauseIcon',
        },
        paused: {
          nextState: 'playing',
          iconRef: 'playIcon',
        },
      },
      animationDuration: 325,
      state: {},
    };
  },
  computed: {
    isPlaying() {
      return this.state.iconRef === 'pauseIcon';
    },
  },
  mounted() {
    this.state = this.states.paused;
    this.replaceUseEl();
  },
  methods: {
    replaceUseEl() {
      select(this.$refs.playButton.querySelector('use')).remove();

      select(this.$refs.iconSvg).append('path')
        .attr('class', 'js-icon')
        .attr('d', this.stateIconPath());
    },

    goToNextState() {
      this.setState(this.state.nextState);

      select(this.$refs.playButton.querySelector('.js-icon'))
        .transition()
        .duration(this.animationDuration)
        .attr('d', this.stateIconPath());
    },

    setState(stateName) {
      this.state = this.states[stateName];
    },

    stateIconPath() {
      return this.$refs[this.state.iconRef].getAttribute('d');
    },
  },
};
</script>

<style lang="scss" scoped>
.play-button::v-deep {
  cursor: pointer;
  background: none;
  outline: none;
  border: 1px solid #31CB00;
  width: 34px;
  height: 34px;
  padding: 0;
  .js-icon {
    fill: #31CB00;
  }
  &:hover {
    border: 1px solid lighten(#31CB00, 5%);
    .js-icon {
      fill: lighten(#31CB00, 5%);
    }
  }
  &.playing {
    border: 1px solid #ED1C24;
    .js-icon {
      fill: #ED1C24;
    }
    &:hover {
    border: 1px solid lighten(#ED1C24, 5%);
    .js-icon {
      fill: lighten(#ED1C24, 5%);
    }
  }
  }
}
</style>
