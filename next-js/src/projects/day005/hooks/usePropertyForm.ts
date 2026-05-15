import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v7 as uuidv7 } from "uuid";
import {
  PropertiesFormSchema,
  PropertiesFormValues,
} from "@/src/projects/day005/types/005.schema";

export const usePropertyForm = (initialData?: PropertiesFormValues) => {
  const id = uuidv7();
  const form = useForm<PropertiesFormValues>({
    resolver: zodResolver(PropertiesFormSchema),
    defaultValues: initialData || {
      name: "",
      properties: [
        {
          id,
          name: "",
          description: "",
          types: [{ type: "AUTO", isArray: false }],
          optional: false,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "properties",
  });

  const addProperty = () => {
    const id = uuidv7();
    append({
      id,
      name: "",
      description: "",
      types: [{ type: "AUTO" }],
      optional: false,
    });
  };

  return {
    form,
    fields,
    addProperty,
    removeProperty: remove,
    handleSubmit: form.handleSubmit,
  };
};
