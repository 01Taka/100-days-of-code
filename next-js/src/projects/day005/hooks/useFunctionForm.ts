import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FunctionStructure,
  FunctionStructureSchema,
} from "@/src/projects/day005/types/functions.schema";
import { v7 as uuidv7 } from "uuid";

// 初期値のデフォルト
const defaultValues: Partial<FunctionStructure> = {
  id: uuidv7(),
  name: "",
  role: "",
  args: [
    { id: uuidv7(), name: "", description: "", types: [{ type: "AUTO" }] },
  ],
  return: [
    { id: uuidv7(), name: "", description: "", types: [{ type: "AUTO" }] },
  ],
  examples: [],
  edgeCases: [],
  sideEffects: [],
  supplementary: [],
};

export const useFunctionForm = (
  initial?: Partial<FunctionStructure>,
  onSubmit?: (data: FunctionStructure) => void,
) => {
  const form = useForm<FunctionStructure>({
    resolver: zodResolver(FunctionStructureSchema),
    defaultValues: {
      ...defaultValues,
      ...initial,
    },
    // 入力中のバリデーションタイミングの設定
    mode: "onChange",
  });

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = form;

  return {
    form,
    control,
    register,
    errors,
    handleSubmit: onSubmit ? handleSubmit(onSubmit) : undefined,
  };
};
