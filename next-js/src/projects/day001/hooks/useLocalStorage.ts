import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // 初回読み込み
  useEffect(() => {
    const item = window.localStorage.getItem(key);
    if (item) setStoredValue(JSON.parse(item));
  }, [key]);

  // 値が更新されたら保存
  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue] as const;
}
