import React, { FC } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FormikErrors, FormikTouched } from "formik";

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?:
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
    | undefined;
  touched?:
    | boolean
    | boolean[]
    | FormikTouched<any>
    | FormikTouched<any>[]
    | undefined;
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
  const errorMessage = typeof error === "string" ? error : undefined;
  const isTouched = typeof touched === "boolean" ? touched : false;

  return (
    <div className="form-group flex flex-col">
      <label htmlFor={id} className="mb-2 ml-1 text-xs font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          className="w-full rounded-lg bg-secondary px-4 py-3 text-sm outline-none placeholder:font-light"
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
      {isTouched && errorMessage && (
        <div className="ml-1 mt-1 text-xs text-red-500">{errorMessage}</div>
      )}
    </div>
  );
};

export default InputField;
