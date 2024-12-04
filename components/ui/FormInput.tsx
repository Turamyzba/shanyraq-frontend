import React from "react";

interface FormInputProps {
    label: string;
    type?: string;
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    name: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
                                                 label,
                                                 type = "text",
                                                 value,
                                                 defaultValue = "",
                                                 disabled = false,
                                                 name,
                                                 onChange,
                                             }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                type={type}
                value={value}
                name={name}
                defaultValue={defaultValue}
                disabled={disabled || type === "email"}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
            />
        </div>
    );
};

export default FormInput;
