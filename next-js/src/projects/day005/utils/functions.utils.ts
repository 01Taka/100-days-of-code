import { FunctionStructure } from "@/src/projects/day005/types/functions.schema";
import { PropertiesFormValues } from "@/src/projects/day005/types/005.schema";
import { convertToTypeScriptType } from "@/src/projects/day005/utils/convert-to-ts";

/**
 * 既存の convertToTypeScriptType をラップして、
 * 任意のインターフェース名で出力できるようにしたヘルパー
 */
const convertPropertiesToInterface = (
  name: string,
  properties: any[], // Property[]
): string => {
  // PropertiesFormValues の形式にアダプトして既存のロジックを利用
  const mockGroup: PropertiesFormValues = {
    name: name,
    properties: properties,
  };

  // 既存の関数を呼び出す
  // ※元の関数が TempName をハードコードしている場合は、
  // 下記の replace を使うか、元の関数を少し修正して name を受け取れるようにしてください。
  const rawType = convertToTypeScriptType(mockGroup);
  return rawType.replace("TempName", name);
};

/**
 * FunctionStructure を人間およびAIが読みやすいテキスト形式に変換する
 */
export const generateFunctionDefinition = (data: FunctionStructure): string => {
  const { name, role, args, return: returnProps } = data;

  const safeName = name || "unnamed_function";
  const argsInterfaceName = `${toPascalCase(safeName)}Args`;
  const responseInterfaceName = `${toPascalCase(safeName)}Response`;

  // 1. 各インターフェースの生成
  const argsInterface = convertPropertiesToInterface(argsInterfaceName, args);
  const responseInterface = convertPropertiesToInterface(
    responseInterfaceName,
    returnProps,
  );

  // 2. JSDoc と関数シグネチャの組み立て
  const jsDoc = `/**\n * ${role || "No description provided."}\n */`;

  const functionSignature = `export declare function ${safeName}(args: ${argsInterfaceName}): Promise<${responseInterfaceName}>;`;

  // 3. 全体を結合
  return [
    "// --- Type Definitions ---",
    argsInterface,
    "",
    responseInterface,
    "",
    "// --- Function Signature ---",
    jsDoc,
    functionSignature,
  ].join("\n");
};

/**
 * スネークケースなどをパスカルケースに変換 (例: fetch_user -> FetchUser)
 */
const toPascalCase = (str: string) => {
  return str
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
};

/**
 * Copies the generated string to the clipboard.
 */
export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};

/**
 * クリップボードへのコピーを実行する統合関数
 */
export const copyFunctionToClipboard = async (data: FunctionStructure) => {
  const text = generateFunctionDefinition(data);
  await copyToClipboard(text);
};
