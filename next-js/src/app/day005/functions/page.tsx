"use client";

import FunctionDisplay from "@/src/projects/day005/components/functions/FunctionDisplay";
import FunctionForm from "@/src/projects/day005/components/functions/FunctionForm";
import { useFunctionsManager } from "@/src/projects/day005/hooks/useFunctionsManager";
import { copyFunctionToClipboard } from "@/src/projects/day005/utils/functions.utils";

interface PageProps {}

export default function Page({}: PageProps) {
  const {
    functions,
    formManager,
    activeId,
    addNewFunction,
    deleteFunction,
    switchFunction,
  } = useFunctionsManager();

  return (
    <div className="flex flex-col">
      {functions.map((func) =>
        func.id === activeId ? (
          <FunctionForm
            key={func.id}
            register={formManager.register}
            control={formManager.control}
            handleSubmit={formManager.handleSubmit}
            handleCopyToClipboard={() =>
              copyFunctionToClipboard(formManager.form.getValues())
            }
          />
        ) : (
          <FunctionDisplay
            key={func.id}
            data={func}
            onEdit={() => switchFunction(func.id)}
            onDelete={() => deleteFunction(func.id)}
          />
        ),
      )}
      <button
        className="p-2 place-self-center border rounded-lg w-30"
        onClick={addNewFunction}
      >
        新規関数+
      </button>
    </div>
  );
}
