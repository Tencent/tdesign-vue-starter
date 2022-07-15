<template>
  <div>
    <button @click="increase">点击增加</button>
    <br />
    <br />
    <button @click="reduce">点击减少</button>

    <h1>{{ number }}</h1>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api';

export default {
  setup() {
    const number = ref(0);
    const increase = () => {
      number.value += 1;
    };
    const reduce = () => {
      number.value -= 1;
    };
    return {
      number,
      increase,
      reduce,
    };
  },
};
</script>
