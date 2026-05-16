// components/ToggleArrayIconButton.tsx
"use client";

import { Control, Controller } from "react-hook-form";
import { Dot, Brackets } from "lucide-react";
import { FunctionStructure } from "@/src/projects/day005/types/functions.schema";

interface ToggleArrayIconButtonProps {
  name: string;
  control: Control<FunctionStructure>;
  label?: string;
}

export const ToggleArrayIconButton = ({
  name,
  control,
  label,
}: ToggleArrayIconButtonProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <Controller
        name={name as any}
        control={control}
        render={({ field: { value, onChange } }) => (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => onChange(!value)}
            className={`
              flex items-center justify-center w-10 h-full transition-all
            `}
            aria-label="ToggleArray Icon"
          >
            {value ? (
              // "[]" に相当するアイコン
              <Brackets size={24} strokeWidth={2.5} />
            ) : (
              // "・" に相当するアイコン
              <Dot size={24} strokeWidth={2.5} />
            )}
          </button>
        )}
      />
    </div>
  );
};
