import { useState } from "react";
import "./App.css";
import FormInput from "../../pages/FormInput";
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

function App() {
  const [isLogin, setIsLogin] = useState(false);
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
  const [error, setError] = useState(""); // ✅ move it here

  const registerInputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
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
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,20}`,
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
      // Fake validation — replace with real API call later
      if (signInValues.email === "" || signInValues.password === "") {
        setError("Please fill in all fields.");
      } else if (signInValues.password.length < 8) {
        setError("Wrong password!");
      } else {
        setError("");
        alert(`Welcome back ${signInValues.email}!`);
      }
    } else {
      if (values.password !== values.confirmPassword) {
        setError("Passwords don't match!");
      } else if (values.username.length < 3) {
        setError("Username is too short!");
      } else {
        setError("");
        alert(`Account created for ${values.username}!`);
      }
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
    <div className="app">
      <a href="/" className="home-link">
        ← Go to main page
      </a>

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
            alert(`Welcome ${decoded.name}!`);
          }}
          onError={() => alert("Google Login Failed")}
        />

        <p className="signin-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            className="signin-btn"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
          >
            {isLogin ? "Register" : "Sign In"}
          </button>
        </p>
      </form>
    </div>
  );
}

export default App;
