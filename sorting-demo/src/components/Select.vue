<template>
  <div class="select">
    <Button
      class="select-button"
      ref="selectButton"
      @click="onOpenSelect"
    >
      <div class="select-button-content">
        <div class="select-button-text">
          {{ valueText || placeholder }}
        </div>
        <div class="select-icon">
          &#9662;
        </div>
      </div>
    </Button>
    <transition
      name="menu-open"
      @enter="onMenuOpen"
      @afterEnter="afterOpen"
      @leave="onMenuClose"
    >
      <div
        v-if="menuOpen"
        v-closable="{
          exclude: ['selectButton'],
          handler: 'onClose'
        }"
        class="select-menu"
      >
        <ul class="select-menu-items">
          <li
            v-for="item in items"
            :key="item.value"
            class="select-item"
            @click="onItemClick(item)"
          >
            {{ item.text }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue';
import Button from './Button.vue';

let handleOutsideClick;

Vue.directive('closable', {
  bind(el, binding, vnode) {
    handleOutsideClick = (e) => {
      e.stopPropagation();
      const { handler, exclude } = binding.value;
      let clickedOnExcludedEl = false;
      exclude.forEach((refName) => {
        if (!clickedOnExcludedEl) {
          const excludedEl = vnode.context.$refs[refName];
          clickedOnExcludedEl = excludedEl.$el.contains(e.target);
        }
      });
      if (!el.contains(e.target) && !clickedOnExcludedEl) {
        vnode.context[handler]();
      }
    };
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
  },
  unbind() {
    document.removeEventListener('click', handleOutsideClick);
    document.removeEventListener('touchstart', handleOutsideClick);
  },
});

export default {
  name: 'Select',
  components: { Button },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      menuOpen: false,
    };
  },
  computed: {
    valueText() {
      const selectedItem = this.items.find(item => item.value === this.value);
      if (selectedItem) {
        return selectedItem.text;
      }
      return null;
    },
  },
  methods: {
    onOpenSelect() {
      this.menuOpen = !this.menuOpen;
    },
    onMenuOpen(element) {
      const { width } = getComputedStyle(element);

      element.style.width = width;
      element.style.position = 'absolute';
      element.style.visibility = 'hidden';
      element.style.height = 'auto';

      const { height } = getComputedStyle(element);

      element.style.width = null;
      element.style.position = null;
      element.style.visibility = null;
      element.style.height = 0;

      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterOpen(element) {
      element.style.height = 'auto';
    },
    onMenuClose(element) {
      const { height } = getComputedStyle(element);
      element.style.height = height;

      setTimeout(() => {
        element.style.height = 0;
      });
    },
    onClose() {
      this.menuOpen = false;
    },
    onItemClick(item) {
      this.$emit('input', item.value);
      this.menuOpen = false;
    },
  },

};
</script>

<style lang="scss" scoped>
.select {
  .button.select-button {
    padding: 0;
    position: relative;
    .select-button-content {
      display: flex;
      .select-button-text {
        padding: 6px 6px 6px 12px;
      }
      .select-icon {
        padding: 6px 6px 6px 8px;
        border-left: 1px solid #FFD23F;
        text-align: center;
      }
    }
  }
  .select-menu {
    background: rgb(19, 19, 19);
    border: 1px solid #FFD23F;
    position: absolute;
    z-index: 2;
    .select-menu-items {
      .select-item {
        padding: 6px 12px;
        cursor: pointer;
        transition: .1 opacity ease-in-out;
        font-size: 14px;
        text-transform: lowercase;
        letter-spacing: .2em;
        &:hover {
          background: rgb(121, 121, 121);
        }
      }
    }
  }

  .menu-open-enter-active,
  .menu-open-leave-active {
    transition: height .16s ease-in-out;
    overflow: hidden;
  }

  .menu-open-enter,
  .menu-open-leave-to {
    height: 0;
  }
}

.select::v-deep {
  .button.select-button {
    .button-content {
      .hover-transition {
        width: 100%;
        left: 0;
        bottom: 0;
      }
    }
  }
  &:hover {
    .button.select-button {
      .button-content {
        .hover-transition {
          height: 100%;
        }
      }
    }
  }
}
</style>
