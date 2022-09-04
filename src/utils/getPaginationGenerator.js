const getPaginationGenerator = (
  currentPageNumber,
  totalPageNumber,
  offset = 2,
) => {
  const offsetNumber =
    currentPageNumber <= offset || currentPageNumber > totalPageNumber - offset
      ? offset
      : offset - 1;
  const numbersList = [];
  const numbersListWithDots = [];

  if (totalPageNumber <= 1 || totalPageNumber === undefined) return [1];

  numbersList.push(1);
  for (
    let i = currentPageNumber - offsetNumber;
    i <= currentPageNumber + offsetNumber;
    i++
  ) {
    if (i < totalPageNumber && i > 1) {
      numbersList.push(i);
    }
  }
  numbersList.push(totalPageNumber);

  numbersList.reduce((accumulator, currentValue) => {
    if (accumulator === 1) {
      numbersListWithDots.push(accumulator);
    }
    if (currentValue - accumulator !== 1) {
      numbersListWithDots.push('...');
    }
    numbersListWithDots.push(currentValue);

    return currentValue;
  });

  return numbersListWithDots;
};

export { getPaginationGenerator };
