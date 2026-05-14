// import React, { forwardRef } from "react";
// import { LucideIcon } from "lucide-react";

// interface IconButtonProps {
//   value?: boolean; // react-hook-form の value
//   onChange?: (val: boolean) => void; // react-hook-form の onChange
//   onBlur?: () => void; // フォーカス外れた時の処理
//   icon: LucideIcon;
//   activeColor?: string;
//   inactiveColor?: string;
//   size?: number;
//   label: string;
// }

// // forwardRef で囲むことで RHF が内部の button 要素にアクセス可能にする
// export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
//   (
//     {
//       value = false,
//       onChange,
//       onBlur,
//       icon: Icon,
//       activeColor = "",
//       inactiveColor = "",
//       size = 24,
//       label,
//     },
//     ref,
//   ) => {
//     return (
//       <button
//         ref={ref}
//         // 重要: type="button" をつけないと、クリック時にフォームが送信されてしまう
//         type="button"
//         onBlur={onBlur}
//         onClick={() => onChange?.(!value)}
//         aria-label={label}
//         aria-pressed={value}
//         className={value ? activeColor : inactiveColor}
//       >
//         <Icon
//           size={size}
//           className={`transition-transform ${value ? "scale-110" : "scale-100"}`}
//         />
//       </button>
//     );
//   },
// );

// IconButton.displayName = "IconButton";
