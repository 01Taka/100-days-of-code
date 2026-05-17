import { Property } from "@/src/projects/day005/types/005.schema";

interface FunctionPropertyProps {
  type: "args" | "return";
  properties: Property[];
}

export default function FunctionProperty({}: FunctionPropertyProps) {
  return (
    <div className="">
      <h1>FunctionProperty</h1>
    </div>
  );
}
