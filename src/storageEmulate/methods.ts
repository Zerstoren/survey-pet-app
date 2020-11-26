import localforage from "localforage";

localforage.config({
  driver      : localforage.LOCALSTORAGE, 
  name        : 'myApp',
  version     : 1.0,
  storeName   : 'keyvaluepairs', 
  description : 'some description'
});

interface IRecord {
  id: number,
  isNew: boolean,
}

interface IMapReplaceIds {
  [id: number]: number
}

type IReplaceIdsSetFunction<T> = (element: T, ids: Array<number>) => void;
type IReplaceIdsGetFunction<T> = (element: T) => Array<number>;
interface IReplaceIds<T> extends Array<[
  IReplaceIdsSetFunction<T>, 
  IReplaceIdsGetFunction<T>, 
  IMapReplaceIds
]> {}

type IGetSelectorFunction<T extends IRecord> = (item: T) => boolean;

const incrementId = async (storage: string) : Promise<number> => {
  let nextId: number | null = await localforage.getItem(storage);
  nextId = nextId ? nextId + 1 : 1
  await localforage.setItem(storage, nextId);
  return nextId;
}

const getStorageList = async <T>(storage: string) : Promise<Array<T>> => {
  let storageResult: Array<T> | null =  await localforage.getItem(storage);
  return (storageResult ? storageResult : []) as Array<T>;
}

const saveStorageList = async <T>(storage: string, items: Array<T>) => {
  return localforage.setItem(storage, items);
}

const updateObjectBeforeInsert = async <T extends IRecord>(storage: string, option: T) : Promise<IMapReplaceIds> => {
  let id = await incrementId(storage);
  let oldId = option.id
  option.isNew = false;
  option.id = id;
  return {[oldId]: id};
}

const replaceGeneratedIdsForNew = (oldIds: Array<number>, newIds: IMapReplaceIds) => {
  return oldIds.map(oldId => newIds[oldId]);
}

const insertOne = async <T extends IRecord>(
  storage: string,
  item: T,
  updateIds?: IReplaceIds<T>
) => {
  let storage_id = `${storage}_id`;

  let storageResult = await getStorageList<T>(storage);
  let ids: IMapReplaceIds = {};

  item = {...item};
    
  if (item.isNew) {
    ids = {
      ...ids,
      ...(await updateObjectBeforeInsert(storage_id, item))
    };

    updateIds && updateIds.forEach((element) => {
      const [fnSet, fnGet, newIds] = element;
      let idsMap = replaceGeneratedIdsForNew(fnGet(item), newIds);
      fnSet(item, idsMap);
    });
    
    storageResult.push(item);
  }
  await saveStorageList(storage, storageResult);
  return ids;
};

const insertMany = async <T extends IRecord>(
  storage: string,
  items: Array<T>,
  updateIds?: IReplaceIds<T>
) => {
  let storage_id = `${storage}_id`;

  let storageResult = await getStorageList<T>(storage);
  let ids: IMapReplaceIds = {};

  for (let i = 0; i < items.length; i++) {
    let item = {...items[i]};
      
    if (item.isNew) {
      ids = {
        ...ids,
        ...(await updateObjectBeforeInsert(storage_id, item))
      };

      updateIds && updateIds.forEach((element) => {
        const [fnSet, fnGet, newIds] = element;
        let idsMap = replaceGeneratedIdsForNew(fnGet(item), newIds);
        fnSet(item, idsMap);
      });
      
      storageResult.push(item);
    }
  };

  await saveStorageList(storage, storageResult);
  return ids;
};

const getOne = async <T extends IRecord>(storage: string, id: number) : Promise<T | null> => {
  let results = await getBySelector<T>(storage, (item) => item.id === id);
  return results && results.length ? results[0] : null;
}

const getBySelector = async <T extends IRecord>(storage: string, fn: IGetSelectorFunction<T>) : Promise<Array<T>>=> {
  let storageResult = await getStorageList<T>(storage);
  return storageResult.filter(fn);
}

export type {
  IRecord,
  IMapReplaceIds as IReplaceIds,
  IGetSelectorFunction
}

export {
  incrementId,
  getStorageList,
  saveStorageList,
  updateObjectBeforeInsert,
  replaceGeneratedIdsForNew,

  insertOne,
  insertMany,

  getOne,
  getBySelector,
}