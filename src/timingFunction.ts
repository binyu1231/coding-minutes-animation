export function linear(x: number) {
  return x;
}

export function sin(x: number) {
  return Math.sin(Math.PI * 0.5 * x);
}

export function easeOutElastic(n: number) {
  return n === 0
    ? 0
    : n === 1
    ? 1
    : 2 ** (-10 * n) * Math.sin((n * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1;
}

export function createTimingFunction([p0, p1, p2, p3]: [
  number,
  number,
  number,
  number
]) {
  const y1 = (x1: number, x2: number) => 3 * (x1 - x2) + 1;
  const y2 = (x1: number, x2: number) => 3 * x2 - 6 * x1;
  const y3 = (x1: number) => 3 * x1;

  const calcBezier = (t: number, x1: number, x2: number) =>
    ((y1(x1, x2) * t + y2(x1, x2)) * t + y3(x1)) * t;
  const getSlope = (t: number, x1: number, x2: number) =>
    3 * y1(x1, x2) * t * t + 2 * y2(x1, x2) * t + y3(x1);

  const getTforX = (x: number) => {
    let aGuessT = x;

    for (let i = 0; i < 4; ++i) {
      const currentSlope = getSlope(aGuessT, p0, p2);
      if (currentSlope === 0) return aGuessT;
      const currentX = calcBezier(aGuessT, p0, p2) - x;
      aGuessT -= currentX / currentSlope;
    }

    return aGuessT;
  };

  return (x: number) =>
    p0 === p1 && p2 === p3 ? x : calcBezier(getTforX(x), p1, p3);
}
