const Power = (base, exponent) => {
  if (exponent === 0) return 0;
  if (exponent === 1) return base;

  let isNegative = false;

  if (exponent < 0) {
    isNegative = true;
    exponent = -exponent;
  }

  let pow = Power(base * base, parseInt(exponent) >> 1);
  if (parseInt(exponent) & 1 !== 0) pow = pow * base;

  return isNegative ? 1 / pow : pow;
};
