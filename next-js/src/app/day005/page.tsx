"use client";

import Property from "@/src/projects/day005/components/Property";
import { usePropertyGroups } from "@/src/projects/day005/hooks/usePropertyGroups";
import { PropertiesFormValues } from "@/src/projects/day005/types/005.schema";
import { useCallback, useState } from "react";

export default function PropertyManager() {
  const { groupsList, saveGroup, addNewGroup } = usePropertyGroups();
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAdd = () => {
    const id = addNewGroup();
    setEditingId(id);
  };

  const handleSave = useCallback(
    (id: string, data: PropertiesFormValues) => {
      saveGroup(id, data);
      setEditingId(null);
    },
    [saveGroup],
  );

  return (
    <div className="flex flex-col gap-3">
      {groupsList.map((group) => (
        <Property
          key={group.id}
          isEditing={editingId === group.id}
          data={group}
          onUpdate={(data) => handleSave(group.id, data)}
          onEdit={() => {
            if (!editingId) {
              setEditingId(group.id);
            }
          }}
        />
      ))}
      <button onClick={handleAdd}>追加+</button>
    </div>
  );
}
