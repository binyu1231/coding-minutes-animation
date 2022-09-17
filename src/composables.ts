import { ref } from 'vue'
import { linear } from './timingFunction'
interface Option {
  duration: number
  timingFunction: (n: number) => number
}

export function useInterpolation(option?: Partial<Option>) {
  const opt: Option = Object.assign({
    duration: 2000,
    timingFunction: linear
  }, option)
  
  const y = ref(opt.timingFunction(0))

  let startT = 0
  let lastX = 0
  let running = false

  function onTick(timestamp: number) {
    if (startT === 0) {
      startT = timestamp
      running = true
    }
      

    const x = Math.min((timestamp - startT) / opt.duration + lastX, 1)

    y.value = opt.timingFunction(x)

    if (running === false) {
      lastX = x
      startT = 0
      return 
    }
    
    if (x === 1) {
      startT = 0
      running = false
      lastX = 0
      return
    }
    requestAnimationFrame(onTick)
  }

  function start() {
    requestAnimationFrame(onTick)
  }

  function pause() {
    if (y.value === 1 || y.value === 0) return
    running = !running
    if (running) start()
  }

  return {
    y, start, pause
  }
}