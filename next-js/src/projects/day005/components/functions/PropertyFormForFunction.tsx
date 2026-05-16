import PropertyRow from "@/src/projects/day005/components/functions/PropertyRowForFunction";
import { FunctionStructure } from "@/src/projects/day005/types/functions.schema";
import { Control, FieldArrayWithId, UseFormRegister } from "react-hook-form";

interface PropertyFormProps {
  fields: FieldArrayWithId<FunctionStructure>[];
  register: UseFormRegister<FunctionStructure>;
  control: Control<FunctionStructure>;
  type: "args" | "return";
  addProperty: () => void;
  removeProperty: (index: number) => void;
  onSubmit: () => void;
}

export default function PropertyForm({
  fields,
  register,
  control,
  type,
  addProperty,
  removeProperty,
  onSubmit,
}: PropertyFormProps) {
  return (
    <div className="w-full p-3 bg-[#1e1e1e]">
      <div className="flex flex-col justify-center w-full space-y-3">
        {fields.map((field, index) => (
          <PropertyRow
            key={field.id}
            type={type}
            index={index}
            register={register}
            control={control}
            onRemove={() => removeProperty(index)}
          />
        ))}
        <div className="flex flex-row justify-end w-full gap-2">
          <button
            type="button"
            onClick={addProperty}
            className="w-full max-w-32 py-2 bg-blue-950 text-white rounded"
          >
            + 追加
          </button>

          <button
            type="submit"
            onClick={() => onSubmit()}
            className="w-full max-w-32 py-2 bg-green-600 text-white rounded"
          >
            決定
          </button>
        </div>
      </div>
    </div>
  );
}
