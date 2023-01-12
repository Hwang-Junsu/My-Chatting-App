import { forwardRef, RefObject } from "react";
import { IInputProps } from "types/input";

const Input = forwardRef(
  (
    { type, placeholder, value, maxLength = 200, onChange }: IInputProps,
    ref: RefObject<HTMLInputElement>
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        maxLength={maxLength}
        className="w-full px-3 py-2 placeholder-gray-400 bg-white border border-gray-500 rounded-md shadow-lg appearance-none outline-blue-500 focus:outline-2 focus:ring-blue-500 focus:border-blue-500"
      />
    );
  }
);
export default Input;
