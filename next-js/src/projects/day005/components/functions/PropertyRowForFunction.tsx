"use client";

import PropertyTypeRow from "@/src/projects/day005/components/functions/PropertyTypeRowForFunction";
import { QuestionToggle } from "@/src/projects/day005/components/QuestionToggleButton";
import { FunctionStructure } from "@/src/projects/day005/types/functions.schema";
import { Trash } from "lucide-react";
import { Control, UseFormRegister } from "react-hook-form";

interface PropertyRowProps {
  index: number;
  register: UseFormRegister<FunctionStructure>;
  type: "args" | "return";
  control: Control<FunctionStructure>;
  onRemove: () => void;
}

export default function PropertyRow({
  index,
  control,
  register,
  type,
  onRemove,
}: PropertyRowProps) {
  return (
    <div className=" border-l-2 border-gray-400 px-3 w-full">
      <textarea
        {...register(`${type}.${index}.description`)}
        placeholder="Description"
        className="w-full field-sizing-content resize-none focus:border-blue-500 focus:outline-none py-0"
        rows={1}
      />
      <div className="flex flex-row ">
        <div className="flex flex-row justify-start align-middle h-6">
          <input
            {...register(`${type}.${index}.name`)}
            className="h-full bg-gray-900"
          />
          <QuestionToggle {...register(`${type}.${index}.optional`)} />
        </div>
        <PropertyTypeRow
          type={type}
          index={index}
          register={register}
          control={control}
        />
      </div>
    </div>
  );
}
