"use client";

import PropertyTypeRow from "@/src/projects/day005/components/PropertyTypeRow";
import { QuestionToggle } from "@/src/projects/day005/components/QuestionToggleButton";
import { PropertiesFormValues } from "@/src/projects/day005/types/005.schema";
import { Trash } from "lucide-react";
import { Control, UseFormRegister } from "react-hook-form";

interface PropertyRowProps {
  index: number;
  register: UseFormRegister<PropertiesFormValues>;
  control: Control<PropertiesFormValues>;
  onRemove: () => void;
}

export default function PropertyRow({
  index,
  control,
  register,
  onRemove,
}: PropertyRowProps) {
  return (
    <div className=" border-l-2 border-gray-400 px-3 w-full">
      <div className="flex flex-row justify-between">
        <textarea
          {...register(`properties.${index}.description`)}
          placeholder="Description"
          className="w-full field-sizing-content resize-none focus:border-blue-500 focus:outline-none py-0"
          rows={1}
        />
        <Trash className="text-red-500" onClick={onRemove} />
      </div>
      <div className="flex flex-row ">
        <div className="flex flex-row justify-start align-middle h-6">
          <input
            {...register(`properties.${index}.name`)}
            className="h-full bg-gray-900"
          />
          <QuestionToggle {...register(`properties.${index}.optional`)} />
        </div>
        <PropertyTypeRow index={index} register={register} control={control} />
      </div>
    </div>
  );
}
