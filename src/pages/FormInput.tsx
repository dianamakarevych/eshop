import { useState } from "react";
import "./Form.css";

interface FormInputProps {
    label: string;
    errorMessage?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    id?: number;           // ← changed string to number
    name?: string;
    type?: string;
    placeholder?: string;
    pattern?: string;
    required?: boolean;
    value?: string;        // ← added missing value prop
}

const FormInput = ({ label, errorMessage, onChange, id, ...inputProps }: FormInputProps) => {
    const [focused, setFocused] = useState(false);

    return (
        <div className="formInput">
            <label>{label}</label>
            <input
                {...inputProps}
                onChange={onChange}
                onBlur={() => setFocused(true)}
                onFocus={() =>
                    inputProps.name === "confirmPassword" && setFocused(true)
                }
                data-focused={focused.toString()}
            />
            <span>{errorMessage}</span>
        </div>
    );
};

export default FormInput;