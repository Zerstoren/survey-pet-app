import ls from 'localforage';

const LS_NAME = 'surveys';

const getItemsFromStorage = () => {
  // return ls.getItem(LS_NAME);
  return Promise.reject('shit')
} 

export {
  getItemsFromStorage
}