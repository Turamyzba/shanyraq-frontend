interface FormSelectProps {
    label: string;
    options: { value: string; label: string }[];
    defaultValue?: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FormSelect: React.FC<FormSelectProps> = ({
                                                   label,
                                                   options,
                                                   defaultValue = "",
                                                   onChange = () => {
                                                   },
                                               }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <select
                defaultValue={defaultValue}
                onChange={onChange}
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
