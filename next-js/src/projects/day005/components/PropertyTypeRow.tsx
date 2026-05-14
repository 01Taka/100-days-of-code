"use client";

import { ToggleArrayIconButton } from "@/src/projects/day005/components/ToggleArrayIconButton";
import { PropertiesFormValues } from "@/src/projects/day005/types/005.schema";
import { Control, useFieldArray, UseFormRegister } from "react-hook-form";

interface PropertyTypeRowProps {
  index: number;
  register: UseFormRegister<PropertiesFormValues>;
  control: Control<PropertiesFormValues>;
}

export default function PropertyTypeRow({
  index,
  register,
  control,
}: PropertyTypeRowProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `properties.${index}.types` as const,
  });

  const options = [
    "INT",
    "FLOAT",
    "NUMBER",
    "STRING",
    "CHAR",
    "DATE",
    "DATETIME",
    "TIME",
    "BOOLEAN",
    "NULL",
    "UNDEFINED",
  ];

  return (
    <div className="">
      {fields.map((field, k) => (
        <div key={field.id} className="flex flex-row">
          <select
            {...register(`properties.${index}.types.${k}.type`)}
            className="bg-gray-800 p-1"
          >
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ToggleArrayIconButton
            name={`properties.${index}.types.${k}.isArray`}
            control={control}
          />
        </div>
      ))}
    </div>
  );
}
