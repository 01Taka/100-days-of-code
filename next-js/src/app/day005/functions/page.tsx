"use client";

import FunctionDisplay from "@/src/projects/day005/components/functions/FunctionDisplay";
import FunctionForm from "@/src/projects/day005/components/functions/FunctionForm";
import { useFunctionsManager } from "@/src/projects/day005/hooks/useFunctionsManager";
import { copyFunctionToClipboard } from "@/src/projects/day005/utils/functions.utils";

interface PageProps {}

export default function Page({}: PageProps) {
  const { functions, formManager, activeId } = useFunctionsManager();

  return (
    <div className="">
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
          <FunctionDisplay key={func.id} data={func} />
        ),
      )}
    </div>
  );
}
