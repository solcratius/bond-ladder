// import { cleanNumbers } from './formatting';

export const arrayMatch = (a, b) => {
  if (a.length !== b.length) {
    return false;
  }
  const aSorted = a.sort(),
    bSorted = b.sort();

  return aSorted.map((val, i) => bSorted[i] === val).every(isSame => isSame);
};

// export const multiply = (arr1, arr2) => {
//   return arr1 * arr2;
// };

export const twoDigitDecimal = () => {
  // const decimal = value
};

export const sumArrayObjects = (data, prop) => {
  const result = data.reduce((prev, cur) => {
    return prev + cur[prop];
  }, 0);

  return Number.isNaN(result) ? 'N/A' : result;
};
