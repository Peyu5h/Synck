import React, { FC } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  placeholder?: string;
  showPass?: boolean;
  setShowPass?: (show: boolean) => void;
}

const InputField: FC<InputFieldProps> = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  showPass,
  setShowPass,
}) => {
  return (
    <div className="form-group flex flex-col">
      <label htmlFor={id} className="mb-2 ml-1 text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          className="w-full rounded-lg bg-slate-300 px-4 py-3 text-sm outline-none placeholder:font-light"
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required
        />
        {type === "password" && showPass !== undefined && setShowPass && (
          <div className="absolute right-5 top-3 transform text-lg">
            {showPass ? (
              <FaRegEye
                onClick={() => setShowPass(!showPass)}
                className="text-dark_svg_1 cursor-pointer"
              />
            ) : (
              <FaRegEyeSlash
                onClick={() => setShowPass(!showPass)}
                className="text-dark_svg_1 cursor-pointer"
              />
            )}
          </div>
        )}
      </div>
      {touched && error && (
        <div className="ml-1 mt-1 text-xs text-red-500">{error}</div>
      )}
    </div>
  );
};

export default InputField;
