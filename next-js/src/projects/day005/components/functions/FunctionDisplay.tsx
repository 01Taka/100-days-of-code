"use client";

import { FunctionStructure } from "@/src/projects/day005/types/functions.schema";
import {
  Code2,
  FileText,
  ArrowRightLeft,
  ChevronRight,
  Trash,
} from "lucide-react";
import PropertyDisplay from "@/src/projects/day005/components/PropertyDisplay";

interface FunctionDisplayProps {
  data: FunctionStructure;
  onEdit?: () => void; // 編集モードに切り替えるためのコールバック
  onDelete?: () => void;
}

export default function FunctionDisplay({
  data,
  onDelete,
  onEdit,
}: FunctionDisplayProps) {
  return (
    <div className="w-full max-w-6xl mx-auto bg-zinc-950 rounded-xl shadow-2xl border border-zinc-800 overflow-hidden group">
      {/* Header Section */}
      <div className="w-full p-6 border-b border-zinc-800 bg-zinc-900/30">
        <div className="w-full flex justify-between items-start">
          <div className="w-full space-y-2">
            <div className="flex justify-between w-full">
              <div className="flex items-center gap-2" onClick={onEdit}>
                <div className="p-1.5 bg-blue-500/10 rounded-md">
                  <Code2 className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-2xl font-mono font-bold text-zinc-100 tracking-tight">
                  {data.name || "Untitled_Function"}
                </h2>
              </div>
              <div className="place-self-end text-red-700">
                <Trash onClick={onDelete} />
              </div>
            </div>

            {data.role && (
              <div className="flex gap-2 items-start text-zinc-400 max-w-2xl">
                <FileText className="w-4 h-4 mt-1 shrink-0 opacity-50" />
                <p className="text-sm leading-relaxed">{data.role}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content: Arguments & Returns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800 bg-zinc-950/50">
        {/* Arguments Section */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">
                Arguments
              </h3>
            </div>
            <span className="text-[10px] font-mono text-zinc-600">
              {data.args.length} {data.args.length === 1 ? "param" : "params"}
            </span>
          </div>

          <PropertyDisplay
            name={`${data.name}Args`}
            properties={data.args}
            mode="full"
          />
        </div>

        {/* Return Value Section */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">
                Return Value
              </h3>
            </div>
            <ArrowRightLeft className="w-3 h-3 text-zinc-700" />
          </div>

          <PropertyDisplay
            name={`${data.name}Response`}
            properties={data.return}
            mode="full"
          />
        </div>
      </div>

      {/* Footer / Meta (Optional) */}
      {(data.examples?.length ?? 0) > 0 && (
        <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-900/20">
          <div className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer w-fit">
            <ChevronRight className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Show Examples ({data.examples?.length})
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
