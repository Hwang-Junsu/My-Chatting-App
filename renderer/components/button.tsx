import { IButtonProps } from "../types/common";
import { cls } from "../utils/cls";

export default function Button({
  large = false,
  onClick,
  text,
  type = "button",
  ...rest
}: IButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      {...rest}
      className={cls(
        "bg-blue-400 w-full tracking-tighter font-bold whitespace-nowrap flex justify-center items-center hover:scale-105 px-4 border border-transparent rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 focus:outline-none",
        large ? "py-3 text-base" : "py-2 text-sm "
      )}
    >
      {text}
    </button>
  );
}
