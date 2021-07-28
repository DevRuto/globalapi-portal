<template lang="pug">
  div
    v-btn(text icon @click="onFirst" v-if="showFirst" :disabled="value === 1")
      v-icon mdi-page-first
    v-btn(text icon @click="onPrev" :disabled="value === 1")
      v-icon mdi-chevron-left
    span(v-if="showPages") {{ value }}
      span(v-if="showMax")  / {{ maxPage }}
    v-btn(text icon @click="onNext" :disabled="maxPage !== -1 && maxPage === value")
      v-icon mdi-chevron-right
    v-btn(text icon @click="onLast" v-if="showLast" :disabled="maxPage !== -1 && maxPage === value")
      v-icon mdi-page-last
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
    },
    showFirst: {
      type: Boolean,
      default: false
    },
    showLast: {
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
    },
    onFirst () {
      this.$emit('first');
    },
    onLast () {
      this.$emit('last');
    }
  }
};
</script>
