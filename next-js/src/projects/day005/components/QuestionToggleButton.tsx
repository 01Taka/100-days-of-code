"use client";

import React, { forwardRef } from "react";

interface QuestionToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const QuestionToggle = forwardRef<HTMLInputElement, QuestionToggleProps>(
  ({ className, ...props }, ref) => {
    return (
      <label className="inline-flex items-center justify-center cursor-pointer select-none px-2">
        {/* 隠しチェックボックス */}
        <input type="checkbox" className="peer hidden" ref={ref} {...props} />

        {/* 未チェック時 (-- の表示) */}
        <span
          className="
          text-2xl font-bold transition-all duration-200
          peer-checked:hidden 
        "
        >
          :
        </span>

        {/* チェック時 (? の表示) */}
        <span
          className="
          hidden text-2xl font-bold transition-all duration-200
          peer-checked:inline-block 
          peer-checked:scale-110 
          peer-checked:drop-shadow-[0_0_8px_rgba(37,99,235,0.4)]
        "
        >
          ? :
        </span>

        {/* キーボード操作用のフォーカスリング（アクセシビリティ用） */}
        <span className="sr-only">トグル</span>
        <span className="peer-focus-visible:ring-2 rounded-md absolute w-10 h-10 pointer-events-none" />
      </label>
    );
  },
);

QuestionToggle.displayName = "QuestionToggle";
