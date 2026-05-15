import PropertyDisplay from "@/src/projects/day005/components/PropertyDisplay";
import PropertyForm from "@/src/projects/day005/components/PropertyForm";
import { PropertiesFormValues } from "@/src/projects/day005/types/005.schema";

interface PropertyProps {
  isEditing: boolean;
  data: PropertiesFormValues;
  onUpdate: (data: PropertiesFormValues) => void;
  onEdit: () => void;
}

export default function Property({
  isEditing,
  data,
  onUpdate,
  onEdit,
}: PropertyProps) {
  return (
    <div className="flex justify-center w-full">
      <div className="flex max-w-6xl min-w-3xl">
        {isEditing ? (
          <PropertyForm initialData={data} onSubmit={onUpdate} />
        ) : (
          <button className="w-full text-start" onClick={onEdit}>
            <PropertyDisplay
              name={data.name}
              properties={data.properties}
              mode="list"
            />
          </button>
        )}
      </div>
    </div>
  );
}
