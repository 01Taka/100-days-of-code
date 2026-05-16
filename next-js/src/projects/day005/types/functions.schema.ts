import * as z from "zod";
import {
  PropertiesFormSchema,
  PropertySchema,
} from "@/src/projects/day005/types/005.schema";

/**
 * 具体的な入出力例のスキーマ
 */
export const FunctionExampleSchema = z.object({
  input: z.array(z.string()).describe("引数の順番に合わせた入力値"),
  output: z
    .union([z.string(), z.array(z.string())])
    .describe("期待される出力値"),
  description: z.string(),
});

/**
 * 関数全体の構造定義スキーマ
 * return も args と同じ PropertiesFormSchema に統一
 */
export const FunctionStructureSchema = z.object({
  // 1. コンセプト
  name: z.string().min(1, "関数名を入力してください"),
  role: z.string().min(1, "役割を入力してください"),

  // 2. インターフェース（入力と出力の両方を同じスキーマで管理）
  args: PropertySchema.array().describe("引数の定義"),
  return: PropertiesFormSchema.describe(
    "返り値の定義（要素1つなら単一、複数ならオブジェクト）",
  ),

  // 3. 具体例
  examples: z.array(FunctionExampleSchema),

  // 4. 詳細設定
  edgeCases: z.array(z.string()),
  sideEffects: z.array(z.string()),
  supplementary: z.array(z.string()),
});

export type FunctionStructure = z.infer<typeof FunctionStructureSchema>;
