"use client";

import FunctionForm from "@/src/projects/day005/components/functions/FunctionForm";
import { useFunctionForm } from "@/src/projects/day005/hooks/useFunctionForm";

interface PageProps {}

export default function Page({}: PageProps) {
  const { register, control } = useFunctionForm();
  return (
    <div className="">
      <h1>Page</h1>
      <FunctionForm
        fields={[
          { name: "Sample", type: "AUTO", description: "説明", id: "id" },
        ]}
        register={register}
        control={control}
        addProperty={() => {}}
        removeProperty={() => {}}
        onSaveProperty={() => {}}
      />
    </div>
  );
}
