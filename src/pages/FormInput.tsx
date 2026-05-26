import { useState } from "react";
import "./Form.css"

interface FormInputProps {
    label: string;
    errorMessage?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    id?: string;
    name?: string;
    type?: string;
    placeholder?: string;
    pattern?: string;
    required?: boolean;
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
                    inputProps.name === "confirmPassword" && setFocused(true)}
                data-focused={focused.toString()}
            />
            <span>{errorMessage}</span>
        </div>
    );
};

export default FormInput;