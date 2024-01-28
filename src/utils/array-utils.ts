export const duplicateArray = (arr: any[], times = 1) => {
  const result = [];
  for (let i = 0; i < times; i++) {
    result.push(...arr);
  }
  return result;
};
