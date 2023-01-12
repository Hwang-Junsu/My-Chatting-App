export type InputValue = string | number | ReadonlyArray<string>;
export type InputChangeEvent = ChangeEvent<HTMLInputElement>;

export interface IInputProps {
  type: string;
  placeholder: string;
  maxLength?: number;
  value?: InputValue;
  onChange?: (ev: InputChangeEvent) => void;
}
