import { useState } from "react";
import "./Register.css";
import { useLocation } from "react-router-dom";
import FormInput from "../FormInput";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

type FormValues = {
    username: string;
    email: string;
    birthday: string;
    password: string;
    confirmPassword: string;
};

type SignInValues = {
    email: string;
    password: string;
};

function Register() {
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(location.pathname === "/login");
    const [values, setValues] = useState<FormValues>({
        username: "",
        email: "",
        birthday: "",
        password: "",
        confirmPassword: "",
    });
    const [signInValues, setSignInValues] = useState<SignInValues>({
        email: "",
        password: "",
    });
    const [error, setError] = useState(""); 

    const registerInputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Username",
            errorMessage: "Username should be 3-16 characters and shouldn't include any special character!",
            label: "Username",
            pattern: "^[A-Za-z0-9]{3,16}$",
            required: true,
        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "Email",
            errorMessage: "It should be a valid email address!",
            label: "Email",
            required: true,
        },
        {
            id: 3,
            name: "birthday",
            type: "date",
            placeholder: "Birthday",
            errorMessage: "",
            label: "Birthday",
        },
        {
            id: 4,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMessage: "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
            label: "Password",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*_])[A-Za-z0-9!@#$%^&*_]{8,20}`,
            required: true,
        },
        {
            id: 5,
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password",
            errorMessage: "Passwords don't match",
            label: "Confirm Password",
            pattern: values.password.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
            required: true,
        },
    ];

    const signInInputs = [
        {
            id: 1,
            name: "email",
            type: "email",
            placeholder: "Email",
            errorMessage: "It should be a valid email address!",
            label: "Email",
            required: true,
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMessage: "Incorrect password!",
            label: "Password",
            required: true,
        },
    ];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (isLogin) {
            const usersString = localStorage.getItem("users");
            
            if (!usersString) {
                setError("The database is empty. Please sign up first!");
                return;
            }

            const users = JSON.parse(usersString);
            const foundUser = users.find(
                (u: any) => u.email === signInValues.email && u.password === signInValues.password
            );

            if (foundUser) {
                localStorage.setItem("currentUser", JSON.stringify(foundUser));
                setError("");
                window.location.href = "/";
            } else {
                setError("Invalid email or password!");
            }
            
        } else {
            if (values.password !== values.confirmPassword) {
                setError("Passwords don't match!");
                return;
            } 
            
            if (values.username.length < 3) {
                setError("Username is too short!");
                return;
            }

            const usersString = localStorage.getItem("users") || "[]";
            const users = JSON.parse(usersString);

            const isEmailTaken = users.some((u: any) => u.email === values.email);
            if (isEmailTaken) {
                setError("This email is already registered!");
                return;
            }

            const newUser = {
                id: Date.now(),
                username: values.username,
                email: values.email,
                password: values.password,
                birthday: values.birthday
            };

            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));

            setError("");
            setIsLogin(true); 
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (isLogin) {
            setSignInValues({ ...signInValues, [e.target.name]: e.target.value });
        } else {
            setValues({ ...values, [e.target.name]: e.target.value });
        }
    };

    return (
        <div className="register-wrapper">

            <form onSubmit={handleSubmit}>
                <h1>{isLogin ? "Sign In" : "Register"}</h1>
                {error && <p className="form-error">{error}</p>}

                {isLogin
                    ? signInInputs.map((input) => (
                        <FormInput
                            key={input.id}
                            {...input}
                            value={signInValues[input.name as keyof SignInValues]}
                            onChange={onChange}
                        />
                    ))
                    : registerInputs.map((input) => (
                        <FormInput
                            key={input.id}
                            {...input}
                            value={values[input.name as keyof FormValues]}
                            onChange={onChange}
                        />
                    ))}

                <button type="submit">{isLogin ? "Sign In" : "Submit"}</button>

                <div className="divider">
                    <span>or</span>
                </div>

                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        const decoded: any = jwtDecode(credentialResponse.credential!);
                        console.log("Google user:", decoded);
                    }}
                    onError={() => alert("Google Login Failed")}
                />

                <p className="signin-text">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                        type="button"
                        className="signin-btn"
                        onClick={() => { setIsLogin(!isLogin); setError(""); }}
                    >
                        {isLogin ? "Register" : "Sign In"}
                    </button>
                </p>
            </form>
        </div>
    );
}

export default Register;