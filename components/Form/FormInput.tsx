import { FormikErrors, useField } from "formik";
import React from "react";
import { useFormContext } from "react-hook-form";

type FormInputProps = {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    value: string;
    errors: {[key : string] : any};
    touched: {[key : string] : any};
    disabled?: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const FormInput: React.FC<FormInputProps> = ({ label, name, type = "text", placeholder, touched, value, errors, disabled = false, onChange }) => {
    // const { register, formState: { errors }, } = useFormContext();
    // const [field, meta, helpers] = useField(props);
    
    return (
        <div className="">
            <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <input
                disabled={disabled}
                type={type}
                placeholder={placeholder}
                className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6"
                value={value}
                onChange={onChange}
                name={name}
                // {...field}
                // {...props}
            />
            {errors[name] && touched[name] && (
                <span className="text-red-500 text-xs pt-1 block">
                    {errors[name] as string}
                </span>
            )}
        </div>
    );
};

export default FormInput;