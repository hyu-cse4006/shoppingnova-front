function boxMullerRandom(mean = 0, stdDev = 1) {
  const u1 = Math.random();
  const u2 = Math.random();

  // Box-Muller 공식
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return z0 * stdDev + mean; // 정규분포 값
}

export function precomputedNormal(mean = 0, stdDev = 1, size = 10000) {
  const values: number[] = [];
  for (let i = 0; i < size; i++) {
    values.push(boxMullerRandom(mean, stdDev));
  }

  return function () {
    const index = Math.floor(Math.random() * values.length);
    return values[index];
  };
}

export function gammaRandom(alpha = 2, beta = 1) {
  let x = 0;
  for (let i = 0; i < alpha; i++) {
    x -= Math.log(Math.random());
  }
  return x / beta;
}
export function betaRandom(alpha = 2, beta = 1) {
  const gamma = (x: number) => Math.pow(Math.random(), 1 / x);
  const x = gamma(alpha);
  const y = gamma(beta);
  return x / (x + y); // 0 ~ 1 사이 값 반환
}
