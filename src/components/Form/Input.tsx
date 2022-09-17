import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = (props: InputProps) => {
  return (
    <input
      className="bg-zinc-900 py-3 px-4 rounded text-small placeholder:text-zinc-500"
      {...props}
    />
  );
};
