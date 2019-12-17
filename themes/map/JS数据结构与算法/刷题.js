const maxProductAfterCutting = length => {
  // 初始值就直接返回
  if (length < 2) return 0;
  if (length === 2) return 1;
  if (length === 3) return 2;

  // 直接赋值
  const product = [];
  product[0] = 0;
  product[1] = 1;
  product[2] = 2;
  product[3] = 3;

  // 求之后数组各项的最大值
  // 第一个for，自下而上
  for (let i = 4; i <= length; i++) {
    let max = 0;

    for (let j = 1; j <= i / 2; j++) {
      let product = product[j] * product[i - j];

      if (max < product) {
        max = product;
      }
      product[i] = max;
    }
  }

  max = product[length];

  return max;
};
