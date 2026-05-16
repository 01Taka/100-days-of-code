import {
  PropertiesFormValues,
  PropertyGroup,
} from "@/src/projects/day005/types/005.schema";
import { useState, useEffect, useCallback, useMemo } from "react";
import { v7 as uuidv7 } from "uuid";

const STORAGE_KEY = "property_groups_data";

// 保存されるデータの型定義: { [id: string]: PropertyGroup }
type PropertyGroupsMap = Record<string, PropertyGroup>;

export const usePropertyGroups = () => {
  const [groups, setGroups] = useState<PropertyGroupsMap>({});

  // 1. 初期ロード
  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        setGroups(parsed);
      } catch (error) {
        console.error("Failed to parse localStorage data:", error);
        setGroups({});
      }
    }
  }, []);

  const addNewGroup = useCallback(() => {
    const id = uuidv7();
    setGroups((prev) => {
      const newData: PropertyGroup = {
        id,
        name: "",
        properties: [
          {
            id: uuidv7(),
            name: "",
            types: [{ type: "AUTO" }],
            description: "",
          },
        ],
      };
      return { ...prev, [newData.id]: newData };
    });
    return id;
  }, []);

  /**
   * 特定のID（id）のデータを削除する
   */
  const deleteGroup = useCallback((id: string) => {
    setGroups((prev) => {
      const { [id]: _, ...next } = prev;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  /**
   * 特定のID（id）のデータを完全に上書き（保存/更新）する
   */
  const saveGroup = useCallback(
    (id: string, data: PropertiesFormValues) => {
      if (!data) return;
      if ((data.properties?.length ?? 0) > 0) {
        setGroups((prev) => {
          const next = {
            ...prev,
            [id]: { id, ...data }, // idをキーとして保存（既存があれば上書き）
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
          return next;
        });
      } else {
        deleteGroup(id);
      }
    },
    [deleteGroup],
  );

  const groupsList = useMemo(() => {
    return Object.values(groups);
  }, [groups]);

  return {
    groups, // 全体データ
    groupsList,
    addNewGroup,
    saveGroup, // 上書き・保存関数
    deleteGroup, // 削除関数
  };
};
