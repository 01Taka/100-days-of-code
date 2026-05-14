"use client";

import PropertyTypeRow from "@/src/projects/day005/components/PropertyTypeRow";
import { QuestionToggle } from "@/src/projects/day005/components/QuestionToggleButton";
import { PropertiesFormValues } from "@/src/projects/day005/types/005.schema";
import { Control, UseFormRegister } from "react-hook-form";

interface PropertyRowProps {
  index: number;
  register: UseFormRegister<PropertiesFormValues>;
  control: Control<PropertiesFormValues>;
}

export default function PropertyRow({
  index,
  register,
  control,
}: PropertyRowProps) {
  return (
    <div className=" border-l-2 px-3">
      <textarea
        {...register(`properties.${index}.description`)}
        placeholder="Description"
        className="w-full field-sizing-content min-h-[1em] resize-none border-b border-gray-300 focus:border-blue-500 focus:outline-none py-2"
        rows={1}
      />
      <div className="flex flex-row ">
        <div className="flex flex-row justify-start align-middle h-6">
          <input
            {...register(`properties.${index}.name`)}
            className="h-full bg-gray-800"
          />
          <QuestionToggle {...register(`properties.${index}.optional`)} />
          {/* <div className="h-full font-bold text-2xl pl-1 pr-4">:</div> */}
        </div>
        <PropertyTypeRow index={index} register={register} control={control} />
      </div>
    </div>
  );
}
