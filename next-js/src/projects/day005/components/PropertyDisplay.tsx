import React from "react";
import {
  Property,
  TypeOrReference,
} from "@/src/projects/day005/types/005.schema";
import { cn } from "@/src/shared/lib/utils";

// --- カラーパレットの定義 ---
const VSCODE_COLORS = {
  bg: "bg-[#1e1e1e]",
  border: "border-[#333]",
  text: "text-[#d4d4d4]",
  keyword: "text-[#569cd6]", // interface, type
  type: "text-[#4EC9B0]", // Class, Interface名
  property: "text-[#9CDCFE]", // 変数名
  comment: "text-[#6A9955]", // JSDoc
  string: "text-[#ce9178]", // 値, 文字列
  punctuation: "text-[#d4d4d4]", // 記号
};

type DisplayMode = "full" | "no-comment" | "list";

interface PropertyDisplayProps {
  name: string;
  properties: Property[];
  mode?: DisplayMode; // モード切替用
}

export default function PropertyDisplay({
  name,
  properties,
  mode = "full",
}: PropertyDisplayProps) {
  // 型表示コンポーネント
  const RenderTypes = ({ types }: { types: TypeOrReference[] }) => {
    const filteredTypes = types.filter((t) => t.type !== "REFERENCE");
    return (
      <>
        {filteredTypes.map((type, index) => (
          <span key={index}>
            <span className={VSCODE_COLORS.type}>{type.type}</span>
            {type.isArray && (
              <span className={VSCODE_COLORS.punctuation}>[]</span>
            )}
            {index < filteredTypes.length - 1 && (
              <span className={`${VSCODE_COLORS.punctuation} mx-1`}>|</span>
            )}
          </span>
        ))}
      </>
    );
  };

  // 1. リスト形式（一行）の表示
  if (mode === "list") {
    return (
      <div
        className={cn(
          VSCODE_COLORS.bg,
          VSCODE_COLORS.text,
          VSCODE_COLORS.border,
          "p-3 rounded border font-mono text-sm shadow-md",
        )}
      >
        <span className={VSCODE_COLORS.comment}>{`// ${name} properties`}</span>
        <div className="mt-1">
          {properties.map((p, i) => (
            <React.Fragment key={p.id}>
              <span className={VSCODE_COLORS.property}>{p.name}</span>
              {i < properties.length - 1 && <span className="mr-2">,</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  // 2. 通常形式（full または no-comment）
  return (
    <div
      className={cn(
        "p-3 rounded border font-mono text-sm shadow-md w-full",
        VSCODE_COLORS.bg,
        VSCODE_COLORS.text,
        VSCODE_COLORS.border,
      )}
    >
      {/* 宣言ヘッダー */}
      <div className="mb-1">
        <span className={VSCODE_COLORS.keyword}>interface</span>{" "}
        <span className={VSCODE_COLORS.type}>{name}</span>{" "}
        <span className={VSCODE_COLORS.punctuation}>{`{`}</span>
      </div>

      {/* プロパティ一覧 */}
      <div className="space-y-1">
        {properties?.map((property) => (
          <div key={property.id} className="pl-4">
            {/* コメント表示 (fullモードのみ) */}
            {mode === "full" && property.description && (
              <div className={VSCODE_COLORS.comment}>
                {`/** ${property.description} */`}
              </div>
            )}

            <div>
              <span className={VSCODE_COLORS.property}>{property.name}</span>
              {property.optional && (
                <span className={VSCODE_COLORS.punctuation}>?</span>
              )}
              <span className={VSCODE_COLORS.punctuation}>: </span>

              <RenderTypes types={property.types} />

              {property.default && (
                <>
                  <span className={VSCODE_COLORS.punctuation}> = </span>
                  <span
                    className={VSCODE_COLORS.string}
                  >{`'${property.default}'`}</span>
                </>
              )}
              <span className={VSCODE_COLORS.punctuation}>;</span>
            </div>
          </div>
        ))}
      </div>

      {/* 閉じカッコ */}
      <div className={`mt-1 ${VSCODE_COLORS.punctuation}`}>{`}`}</div>
    </div>
  );
}
