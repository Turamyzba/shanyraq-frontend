import React from "react";

interface FormSelectProps {
    label: string;
    options: { value: string; label: string }[];
    value: string; // Controlled value
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    name: string;
    disabled?: boolean;
}

const FormSelect: React.FC<FormSelectProps> = ({
                                                   label,
                                                   options,
                                                   value, // Now controlled via value prop
                                                   onChange,
                                                   name,
                                                   disabled = false
                                               }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <select
                value={value}
                onChange={onChange}
                disabled={disabled}
                name={name}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 bg-white"
            >
                <option value="" disabled>
                    Select an option
                </option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FormSelect;