import { useState, useCallback, useEffect } from "react";
import { FunctionStructure } from "@/src/projects/day005/types/functions.schema";
import { useFunctionForm } from "./useFunctionForm"; // 元のhookをインポート
import { v7 as uuidv7 } from "uuid";

const STORAGE_KEY = "day005_functions_data";

export const useFunctionsManager = () => {
  // 1. ローカルストレージまたは初期値から状態を復元
  const [functions, setFunctions] = useState<FunctionStructure[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setFunctions(parsed);
      if (parsed.length > 0) setActiveId(parsed[0].id);
    }
    setIsMounted(true);
  }, []);

  // 現在編集中のID
  const [activeId, setActiveId] = useState<string | null>(() => {
    return functions.length > 0 ? functions[0].id : null;
  });

  // 2. アクティブなFunctionを取得
  const activeFunction = functions.find((f) => f.id === activeId);

  /**
   * 現在のフォーム内容をリストに反映し、ローカルストレージに保存する
   */
  const persistToStorage = useCallback((currentList: FunctionStructure[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentList));
  }, []);

  const saveOnSubmit = useCallback(
    (data: FunctionStructure) => {
      if (!data.id) return functions;

      let updatedList = functions;

      const index = functions.findIndex((func) => func.id === data.id);
      if (index !== -1) {
        updatedList[index] = data;
      } else {
        updatedList.push(data);
      }

      setFunctions(updatedList);
      persistToStorage(updatedList);
      setActiveId(null);
      return updatedList;
    },
    [functions],
  );

  // 3. フォームフックの呼び出し
  const formManager = useFunctionForm(activeFunction, saveOnSubmit);
  const { form } = formManager;

  const saveCurrentState = useCallback(() => {
    if (!activeId) return functions;

    const currentValues = form.getValues();
    const updatedList = functions.map((f) =>
      f.id === activeId ? { ...f, ...currentValues } : f,
    );

    setFunctions(updatedList);
    persistToStorage(updatedList);
    return updatedList;
  }, [activeId, form, functions, persistToStorage]);

  /**
   * 他のFunctionに切り替える
   * 切り替え前に現在のデータを自動保存する
   */
  const switchFunction = (nextId: string) => {
    if (nextId === activeId) return;

    // 現在の状態を保存してから切り替え
    const updatedList = saveCurrentState();
    const nextFunction = updatedList.find((f) => f.id === nextId);

    if (nextFunction) {
      setActiveId(nextId);
      // React Hook Formの状態を新しいデータでリセット
      form.reset(nextFunction);
    }
  };

  /**
   * 新しいFunctionを追加
   */
  const addNewFunction = () => {
    saveCurrentState(); // 現在のを保存

    const newFn: FunctionStructure = {
      id: uuidv7(),
      name: "New Function",
      role: "",
      args: [
        { id: uuidv7(), name: "", description: "", types: [{ type: "AUTO" }] },
      ],
      return: [
        { id: uuidv7(), name: "", description: "", types: [{ type: "AUTO" }] },
      ],
      examples: [],
      edgeCases: [],
      sideEffects: [],
      supplementary: [],
    };

    const newList = [...functions, newFn];
    setFunctions(newList);
    persistToStorage(newList);
    setActiveId(newFn.id);
    form.reset(newFn);
  };

  /**
   * Functionを削除
   */
  const deleteFunction = (id: string) => {
    const newList = functions.filter((f) => f.id !== id);
    setFunctions(newList);
    persistToStorage(newList);

    if (activeId === id) {
      const nextActive = newList[0]?.id || null;
      setActiveId(nextActive);
      if (nextActive) {
        form.reset(newList[0]);
      }
    }
  };

  return {
    functions,
    activeId,
    formManager, // register, control, errors, handleSubmit などが含まれる
    isMounted,
    switchFunction,
    saveCurrent: saveCurrentState,
    addNewFunction,
    deleteFunction,
  };
};
