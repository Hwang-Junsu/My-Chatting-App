import { IInputProps } from "types/input";

export default function Input({
  type,
  placeholder,
  value,
  maxLength = 200,
  onChange,
}: IInputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      maxLength={maxLength}
      className="w-full px-3 py-2 placeholder-gray-400 bg-white border border-gray-500 rounded-md shadow-lg appearance-none outline-blue-500 focus:outline-2 focus:ring-blue-500 focus:border-blue-500"
    />
  );
}
