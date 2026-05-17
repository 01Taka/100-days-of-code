import PropertyRow from "@/src/projects/day005/components/functions/PropertyRowForFunction";
import { FunctionStructure } from "@/src/projects/day005/types/functions.schema";
import { Control, useFieldArray, UseFormRegister } from "react-hook-form";
import { v7 as uuidv7 } from "uuid";

interface PropertyFormProps {
  register: UseFormRegister<FunctionStructure>;
  control: Control<FunctionStructure>;
  type: "args" | "return";
  onSubmit: () => void;
}

export default function PropertyForm({
  register,
  control,
  type,
  onSubmit,
}: PropertyFormProps) {
  const { append, remove, fields } = useFieldArray({
    control,
    name: `${type}`,
  });

  return (
    <div className="w-full">
      <div className="flex flex-row items-end w-full">
        {/* リスト部分: 余白を詰め、スクロール時も考慮 */}
        <div className="space-y-2 mb-4">
          {fields.map((field, index) => (
            <PropertyRow
              key={field.id}
              type={type}
              index={index}
              register={register}
              control={control}
              onRemove={() => remove(index)}
            />
          ))}
          {fields.length === 0 && (
            <div className="text-[13px] text-zinc-600 italic py-4 border border-dashed border-zinc-800 rounded-lg text-center">
              No {type === "args" ? "arguments" : "return values"} defined
            </div>
          )}
        </div>

        {/* アクションボタン: コンパクトかつ機能的 */}
        <div className="flex flex-row items-center justify-end w-full gap-2 border-zinc-900 pt-4">
          <button
            type="button"
            onClick={() =>
              append({
                id: uuidv7(),
                name: "",
                description: "",
                types: [{ type: "AUTO" }],
              })
            }
            className="text-[11px] font-bold uppercase px-3 py-1.5 bg-zinc-800 text-zinc-300 rounded hover:bg-zinc-700 hover:text-white transition-all border border-zinc-700"
          >
            + Add Field
          </button>
        </div>
      </div>
    </div>
  );
}
