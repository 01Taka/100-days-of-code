import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FunctionStructure,
  FunctionStructureSchema,
} from "@/src/projects/day005/types/functions.schema";

// 初期値のデフォルト
const defaultValues: Partial<FunctionStructure> = {
  name: "",
  role: "",
  args: {
    name: "arguments",
    properties: [],
  },
  return: {
    name: "return",
    properties: [],
  },
  examples: [],
  edgeCases: [],
  sideEffects: [],
  supplementary: [],
};

export const useFunctionForm = (initial?: Partial<FunctionStructure>) => {
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

  const onSubmit = (data: FunctionStructure) => {
    console.log("Form Data:", data);
    // ここで保存処理やAIへの送信処理を行う
  };

  return {
    form,
    control,
    register,
    errors,
    handleSubmit: handleSubmit(onSubmit),
  };
};
