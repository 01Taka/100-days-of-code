"use client";

import PropertyForm from "@/src/projects/day005/components/functions/PropertyFormForFunction";
import { FunctionStructure } from "@/src/projects/day005/types/functions.schema";
import { BaseSyntheticEvent } from "react";
import { Control, UseFormRegister } from "react-hook-form";

interface FunctionFormProps {
  control: Control<FunctionStructure>;
  register: UseFormRegister<FunctionStructure>;
  handleCopyToClipboard: () => void;
  handleSubmit?: (
    e?: BaseSyntheticEvent<object, any, any> | undefined,
  ) => Promise<void>;
}

export default function FunctionForm({
  control,
  register,
  handleCopyToClipboard,
  handleSubmit,
}: FunctionFormProps) {
  return (
    <div className="w-full max-w-6xl mx-auto bg-zinc-950 rounded-xl shadow-2xl border border-zinc-800 overflow-hidden text-zinc-300">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        {/* Header: ダークモード向けに明度を調整 */}
        <div className="p-5 border-b border-zinc-800 bg-zinc-900/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
            <div className="md:col-span-1 space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">
                Function Name
              </label>
              <input
                {...register("name")}
                placeholder="fetch_user_data"
                className="w-full px-3 py-2 text-base font-mono font-bold text-blue-400 bg-zinc-900 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-zinc-700"
              />
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">
                Role / Description
              </label>
              <textarea
                {...register("role")}
                rows={1}
                placeholder="Describe what this function does..."
                className="w-full px-3 py-2 field-sizing-content resize-none text-sm text-zinc-400 bg-zinc-900 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-zinc-700"
              />
            </div>
          </div>
        </div>

        {/* Body: 左右分割パネル */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800">
          {/* Arguments Panel */}
          <div className="p-5 bg-zinc-950">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                Arguments
              </h3>
            </div>
            <PropertyForm
              type="args"
              control={control}
              register={register}
              onSubmit={() => console.log("save Arg")}
            />
          </div>

          {/* Return Panel */}
          <div className="p-5 bg-zinc-950">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                Return Value
              </h3>
            </div>
            <PropertyForm
              type="return"
              control={control}
              register={register}
              onSubmit={() => console.log("save Return")}
            />
          </div>
        </div>

        <div className="w-full flex flex-row justify-end p-2 gap-2">
          <button
            type="button"
            className="w-30 p-2 rounded-lg bg-gray-600"
            onClick={handleCopyToClipboard}
          >
            コピー
          </button>
          <button type="submit" className="w-30 p-2 rounded-lg bg-emerald-500">
            保存
          </button>
        </div>
      </form>
    </div>
  );
}
