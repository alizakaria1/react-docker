import { ChangeEvent } from "react";
import styles from "./Input.module.css";

interface InputProps {
  type: string;
  placeholder?: string;
  value?: string | number;
  min?: number;
  max?: number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  type,
  placeholder,
  value,
  min,
  max,
  onChange,
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={styles.input}
      min={min}
      max={max}
    />
  );
}
