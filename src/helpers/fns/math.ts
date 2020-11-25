const getRandomInt = (min: number, max: number) : number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

let lastIncrementInt = 0;
const getUniqueKey = (prefix: string = '') : string => {
  return `${prefix}${(++lastIncrementInt)}`;
}

const getUniqueInt = () : number => {
  return (lastIncrementInt++);
}

let lastDecrementInt = 0;
const getUniqueDecrementInt = () : number => {
  return (--lastDecrementInt);
}

export {
  getRandomInt,
  getUniqueDecrementInt,
  getUniqueInt,
  getUniqueKey
}