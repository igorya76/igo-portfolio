import { useState } from "react";

export function useValue<T>(defValue: T) {
  const [value, set] = useState(defValue);
  return {
    value,
    set,
    reset: () => set(defValue),
    isValue: (val: T) => val === value,
  };
}
export function useRecord<
  T extends Record<string | number | symbol, any> | undefined
>(defValue?: T) {
  const [value, set] = useState(defValue);
  return {
    value,
    set,
    reset: () => set(defValue),
    update: (v: Partial<T>) => {
      if (!value) {
        set({ ...v } as any);
      } else {
        set({ ...value, ...v });
      }
    },
  };
}

export function useBoolean(defValue: boolean) {
  const [value, set] = useState(defValue);
  return {
    value,
    set,
    toggle: () => set((v) => !v),
    setTrue: () => set(true),
    setFalse: () => set(false),
    isTrue: () => value === true,
    isFalse: () => value === false,
    toggleTimeOut(ms: number) {
      this.toggle();
      setTimeout(() => {
        this.toggle();
      }, ms);
    },
  };
}
export function useNumber(defValue: number) {
  const [value, set] = useState(defValue);
  return {
    value,
    set,
    increment: () => set((s) => s + 1),
    decrement: () => set((s) => s - 1),
  };
}

export function useLocalStorageArray<T extends Record<string, any>>(
  key: string
) {
  return {
    get: () => window.localStorage.getItem(key) as any as T[],
    set: (obj: T) => window.localStorage.set(key, obj) as any as T,
  };
}

import { useEffect } from "react";

export function useArrayLocalStorage<
  T extends Record<string | number | symbol, any>
>(id: string, key_value: keyof T) {
  const [array, setArray] = useState<T[]>([]);
  const LOCALSTORAGEID = `${id as string}`;
  useEffect(() => {
    if (!id || id?.length == 0) return;
    let local = window.localStorage.getItem(LOCALSTORAGEID);
    if (!local) return;
    try {
      let localArray = JSON.parse(local) as T[];
      console.log({ localArray });
      if (localArray.length === 0) return;
      setArray(localArray);
    } catch (e) {}
  }, [id]);
  useEffect(() => {
    if (!id || id?.length == 0) return;
    if (array.length === 0) return;
    window.localStorage.setItem(LOCALSTORAGEID, JSON.stringify(array));
  }, [array]);

  return {
    list: array,
    set: (a: T[]) => {
      setArray(a);
    },
    add: (r: T) => {
      setArray((a) => [...a, r]);
    },
    update: (key: string, updates: Partial<T>) => {
      let original = array.find((a) => a[key_value] === key);
      let balance = array.filter((a) => a[key_value] != key);
      setArray([...balance, { ...original, ...updates } as T]);
    },
    delete: (key: string) => {
      let balance = array.filter((a) => a[key_value] != key);
      setArray(balance);
    },
  };
}
