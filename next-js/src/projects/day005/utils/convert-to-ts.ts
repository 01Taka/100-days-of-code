import { PropertiesFormValues } from "@/src/projects/day005/types/005.schema";

/**
 * Converts a PropertyGroup (PropertiesFormValues) to a TypeScript interface string.
 */
export const convertToTypeScriptType = (
  group: PropertiesFormValues,
): string => {
  const interfaceName = "TempName"; // group.name || "GeneratedInterface";

  const propertiesStrings = group.properties.map((prop) => {
    const key = prop.name;
    const isOptional = prop.optional ? "?" : "";

    // Resolve all types in the union
    const typeUnion = prop.types
      .map((t) => {
        if (t.type === "REFERENCE") {
          return t.id; // Use the reference ID as the type name
        }

        // Map internal enum to TS types
        let tsType = "";
        switch (t.type) {
          case "INT":
          case "FLOAT":
          case "NUMBER":
            tsType = "number";
            break;
          case "STRING":
          case "CHAR":
            tsType = "string";
            break;
          case "DATE":
          case "DATETIME":
          case "TIME":
            tsType = "Date";
            break;
          case "BOOLEAN":
            tsType = "boolean";
            break;
          case "NULL":
            tsType = "null";
            break;
          case "UNDEFINED":
            tsType = "undefined";
            break;
          case "AUTO":
            tsType = "any";
            break;
          default:
            tsType = "unknown";
        }

        return t.isArray ? `${tsType}[]` : tsType;
      })
      .join(" | ");

    const comment = prop.description ? `  /** ${prop.description} */\n` : "";
    return `${comment}  ${key}${isOptional}: ${typeUnion || "any"};`;
  });

  return `export interface ${interfaceName} {\n${propertiesStrings.join("\n")}\n}`;
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
