import React from "react";

interface FormFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  required?: boolean;
  type?: string;
  as?: "input" | "select";
  min?: string | number;
  max?: string | number;
  children?: React.ReactNode;
}

export const FormField = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  required = false,
  type = "text",
  as = "input",
  min,
  max,
  children,
}: FormFieldProps) => {
  return (
    <div className="form_field space-y-2 text-left">
      <label htmlFor={name} className="block text-sm font-medium text-white">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {as === "input" ? (
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          min={min}
          max={max}
          className="w-full px-4 py-2  text-white border border-[#37383e] rounded-lg focus:border-indigo-500 transition-colors"
        />
      ) : (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full px-4 py-2 border text-white border-[#37383e] rounded-lg focus:border-indigo-500  transition-colors"
        >
          {children}
        </select>
      )}
    </div>
  );
};
