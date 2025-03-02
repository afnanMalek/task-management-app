import React from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string | number;
  className?: string;
  placeholder?: string;
  name: string;
  register: UseFormRegister<FieldValues> | any;
  errors: Record<string, any>;
}

const InputField: React.FC<TextFieldProps> = ({ label, className, placeholder, name, register, errors, ...props }) => {
  const errorMessage = errors[name]?.message;

  return (
    <div className={`flex flex-col gap-1`}>
      <label className="text-sm font-medium text-white">{label}</label>
      <input
        {...register(name)}
        className={`px-3 py-2 border rounded-lg focus:outline-none bg-gray-700 text-white placeholder-gray-400 ${
          errorMessage ? "border-red-500 focus:ring-red-500" : "border-gray-600 focus:ring-blue-500"
        } ${className}`}
        placeholder={placeholder}
        {...props}
      />
      {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
    </div>
  );
};

export default InputField;
