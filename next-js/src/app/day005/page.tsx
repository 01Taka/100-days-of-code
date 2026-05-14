"use client";

import PropertyRow from "@/src/projects/day005/components/PropertyRow";
import { usePropertyForm } from "@/src/projects/day005/hooks/usePropertyForm";
import { PropertiesFormValues } from "@/src/projects/day005/types/005.schema";
import { useFieldArray, Control } from "react-hook-form";

export default function PropertyManager() {
  const { form, fields, addProperty, removeProperty, handleSubmit } =
    usePropertyForm();

  const onSubmit = (data: PropertiesFormValues) => {
    console.log("保存するデータ:", data);
  };

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, index) => (
          <PropertyRow
            key={field.id}
            index={index}
            register={form.register}
            control={form.control}
          />
        ))}

        <button
          type="button"
          onClick={addProperty}
          className="w-full py-2 bg-blue-500 text-white rounded"
        >
          + プロパティを追加
        </button>

        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white rounded"
        >
          全データを保存
        </button>
      </form>
    </div>
  );
}

// プロパティ内の types 配列を扱うためのコンポーネント
function TypesFieldArray({ nestIndex, control, register }: any) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `properties.${nestIndex}.types`,
  });

  return (
    <div className="mt-4 pl-4 border-l-2">
      <p className="text-sm font-bold">Types:</p>
      {fields.map((field, k) => (
        <div key={field.id} className="flex gap-2 mt-2">
          <select
            {...register(`properties.${nestIndex}.types.${k}.type`)}
            className="border p-1"
          >
            <option value="STRING">STRING</option>
            <option value="INT">INT</option>
            <option value="BOOLEAN">BOOLEAN</option>
            <option value="DATE">DATE</option>
          </select>

          <label className="flex items-center gap-1 text-sm">
            <input
              type="checkbox"
              {...register(`properties.${nestIndex}.types.${k}.isArray`)}
            />
            Array
          </label>

          <button
            type="button"
            onClick={() => remove(k)}
            className="text-xs text-red-400"
          >
            削除
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ type: "STRING", isArray: false })}
        className="text-sm text-blue-500 mt-2"
      >
        + 型を追加
      </button>
    </div>
  );
}
