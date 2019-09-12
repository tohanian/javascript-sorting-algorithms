<template>
  <div class="sort-options">
    <div>
      <Button
        class="shuffle-button"
        @click="$emit('shuffle')"
      >
        Shuffle
      </Button>
    </div>
  </div>
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'SortOptions',
  components: { Button },
}
</script>
