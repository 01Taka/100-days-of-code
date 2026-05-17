"use client";

import { FunctionStructure } from "@/src/projects/day005/types/functions.schema";
import { Control, useFieldArray, UseFormRegister } from "react-hook-form";

interface PropertyTypeRowProps {
  index: number;
  register: UseFormRegister<FunctionStructure>;
  control: Control<FunctionStructure>;
  type: "args" | "return";
}

export default function PropertyTypeRow({
  index,
  register,
  control,
  type,
}: PropertyTypeRowProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${type}.${index}.types` as const,
  });

  const options = [
    "AUTO",
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
            {...register(`${type}.${index}.types.${k}.type`)}
            className="bg-gray-900 p-1"
          >
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
