import PropertyRow from "@/src/projects/day005/components/PropertyRow";
import { usePropertyForm } from "@/src/projects/day005/hooks/usePropertyForm";
import { PropertiesFormValues } from "@/src/projects/day005/types/005.schema";

interface PropertyFormProps {
  initialData?: PropertiesFormValues;
  onSubmit: (data: PropertiesFormValues) => void;
}

export default function PropertyForm({
  initialData,
  onSubmit,
}: PropertyFormProps) {
  const { form, fields, addProperty, removeProperty, handleSubmit } =
    usePropertyForm(initialData);

  return (
    <div className="w-full p-3 bg-[#1e1e1e]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center w-full space-y-3"
      >
        <input
          {...form.register("name")}
          placeholder="Interface Name..."
          className="border-b border-gray-600"
        />
        {fields.map((field, index) => (
          <PropertyRow
            key={field.id}
            index={index}
            register={form.register}
            control={form.control}
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
            onClick={() => console.log("data submit")}
            className="w-full max-w-32 py-2 bg-green-600 text-white rounded"
          >
            閉じる
          </button>
        </div>
      </form>
    </div>
  );
}
