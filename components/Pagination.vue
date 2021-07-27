<template lang="pug">
  div
    v-btn(text icon @click="onPrev" :disabled="value === 1")
      v-icon(v-text="'$prev'")
    span(v-if="showPages") {{ value }}
      span(v-if="showMax")  / {{ maxPage }}
    v-btn(text icon @click="onNext" :disabled="maxPage !== -1 && maxPage == value")
      v-icon(v-text="'$next'")
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    },
    maxPage: {
      type: Number,
      required: false,
      default: -1
    },
    showPages: {
      type: Boolean,
      default: true
    },
    showMax: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onPrev () {
      if (this.value === 1) {
        return;
      }
      this.$emit('prev');
    },
    onNext () {
      if (this.value === this.maxPage) {
        return;
      }
      this.$emit('next');
    }
  }
};
</script>
