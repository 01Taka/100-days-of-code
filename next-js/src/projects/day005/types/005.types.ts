// type TypeLiteral =
//   // 数字型
//   | "INT"
//   | "FLOAT"
//   | "NUMBER"
//   // 文字型
//   | "STRING"
//   | "CHAR"
//   // 日付型
//   | "DATE"
//   | "DATETIME"
//   | "TIME"
//   //
//   | "BOOLEAN"
//   // 例外値
//   | "NULL"
//   | "UNDEFINED";

// interface Validations {
//   array?: {
//     min?: number;
//     max?: number;
//   };
//   int?: boolean;
//   min?: number;
//   max?: number;
//   minLength?: number;
//   maxLength?: number;
//   positive?: boolean;
//   negative?: boolean;
// }

// interface Enum {
//   id: string;
//   options: string[];
// }

// interface Reference {
//   id: string;
//   kinds: "ENUM" | "PROPERTY";
// }

// interface Type {
//   type: TypeLiteral;
//   isArray?: boolean;
//   validations?: Validations; // より詳細な制限が必要な場合
// }

// interface Property {
//   id: string;
//   name: string;
//   types: (Type | Reference)[];
//   description: string;
//   validations?: Validations; // 全体に適用される制限
//   default?: string;
//   optional?: boolean;
// }

// type PromptProperty = Record<
//   string,
//   {
//     type: string | PromptProperty;
//     description: string;
//     default?: string;
//   }
// >;
