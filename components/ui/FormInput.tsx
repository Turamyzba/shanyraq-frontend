import React from "react";

interface FormInputProps {
    label: string;
    type?: string;
    defaultValue?: string;
    disabled?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({label, type = "text", defaultValue = "", disabled = false}) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                type={type}
                defaultValue={defaultValue}
                disabled={disabled}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
            />
        </div>
    );
};

export default FormInput;