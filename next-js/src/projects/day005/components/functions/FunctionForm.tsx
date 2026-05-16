import PropertyForm from "@/src/projects/day005/components/functions/PropertyFormForFunction";
import { FunctionStructure } from "@/src/projects/day005/types/functions.schema";
import { Control, FieldArrayWithId, UseFormRegister } from "react-hook-form";

type PropertyHandleType = "args" | "return";

interface FunctionFormProps {
  fields: FieldArrayWithId<FunctionStructure>[];
  control: Control<FunctionStructure>;
  register: UseFormRegister<FunctionStructure>;
  addProperty: (type: PropertyHandleType) => void;
  removeProperty: (type: PropertyHandleType, index: number) => void;
  onSaveProperty: (type: PropertyHandleType) => void;
}

export default function FunctionForm({
  fields,
  control,
  register,
  addProperty,
  removeProperty,
  onSaveProperty,
}: FunctionFormProps) {
  return (
    <div className="">
      <form>
        <input {...register("name")} placeholder="Function Name..." />

        <textarea
          {...register("role")}
          placeholder="Role"
          className="w-full field-sizing-content resize-none focus:border-blue-500 focus:outline-none py-0"
        />

        <PropertyForm
          type="args"
          fields={fields}
          control={control}
          register={register}
          addProperty={() => addProperty("args")}
          removeProperty={(index) => removeProperty("args", index)}
          onSubmit={() => onSaveProperty("args")}
        />
      </form>
    </div>
  );
}
