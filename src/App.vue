<script setup lang="ts">
import { ref } from 'vue'
import * as funcs from './timingFunction'
import { useInterpolation } from './composables'

const { y, start, pause } = useInterpolation({
  duration: 5000,
  timingFunction: funcs.createTimingFunction([.29,1.48,.64,.2])
})

</script>

<template>
  <div class="line">
    <div 
      class="dot" 
      :style="{ transform: `translate(${200 * y}px)`}"></div>
  </div>

  <div class="button" @click="start">Move {{ y.toFixed(4) }}</div>
  <div class="button" @click="pause">Pause</div>
</template>

<style scoped>
.line {
  width: 200px;
  border-bottom: 2px solid black;
  position: relative;
}

.dot {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-top: -5px;
  margin-left: -6px;
  background: black;
}

.button {
  margin-top: 20px;
  cursor: pointer;
}
</style>
