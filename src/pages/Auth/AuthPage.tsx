import { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../FormInput";
import "./AuthPage.css";

type AuthMode = "login" | "register";

type AuthPageProps = {
  mode: AuthMode;
};

type RegisterValues = {
  username: string;
  email: string;
  birthday: string;
  password: string;
  confirmPassword: string;
};

type LoginValues = {
  email: string;
  password: string;
};

type GoogleUser = {
  name?: string;
  email?: string;
};

const registerInitialValues: RegisterValues = {
  username: "",
  email: "",
  birthday: "",
  password: "",
  confirmPassword: "",
};

const loginInitialValues: LoginValues = {
  email: "",
  password: "",
};

const PASSWORD_PATTERN =
  "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[^A-Za-z0-9\\s])\\S{8,20}$";
const PASSWORD_ERROR_MESSAGE =
  "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character.";
const passwordRegex = new RegExp(PASSWORD_PATTERN);

function AuthPage({ mode }: AuthPageProps) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(mode === "login");
  const [registerValues, setRegisterValues] = useState<RegisterValues>(
    registerInitialValues
  );
  const [loginValues, setLoginValues] = useState<LoginValues>(
    loginInitialValues
  );
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLogin(mode === "login");
    setError("");
  }, [mode]);

  const registerInputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and should not include special characters.",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address.",
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
      errorMessage: PASSWORD_ERROR_MESSAGE,
      label: "Password",
      pattern: PASSWORD_PATTERN,
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords do not match.",
      label: "Confirm Password",
      pattern: registerValues.password.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      required: true,
    },
  ];

  const loginInputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address.",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password is required.",
      label: "Password",
      required: true,
    },
  ];

  const saveCurrentUser = (username: string, email: string) => {
    localStorage.setItem(
      "eshop-current-user",
      JSON.stringify({ username, email })
    );
    window.dispatchEvent(new Event("auth-change"));
    navigate("/");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLogin) {
      if (!loginValues.email || !loginValues.password) {
        setError("Please fill in all fields.");
        return;
      }

      if (loginValues.password.length < 8) {
        setError("Password must have at least 8 characters.");
        return;
      }

      saveCurrentUser(loginValues.email, loginValues.email);
      return;
    }

    if (registerValues.password !== registerValues.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!passwordRegex.test(registerValues.password)) {
      setError(PASSWORD_ERROR_MESSAGE);
      return;
    }

    if (registerValues.username.length < 3) {
      setError("Username is too short.");
      return;
    }

    saveCurrentUser(registerValues.username, registerValues.email);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isLogin) {
      setLoginValues({
        ...loginValues,
        [event.target.name]: event.target.value,
      });
      return;
    }

    setRegisterValues({
      ...registerValues,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <section className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <Link to="/" className="auth-home-link">
          Back to shop
        </Link>

        <h1>{isLogin ? "Sign In" : "Register"}</h1>
        {error && <p className="form-error">{error}</p>}

        {isLogin
          ? loginInputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={loginValues[input.name as keyof LoginValues]}
                onChange={handleChange}
              />
            ))
          : registerInputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={registerValues[input.name as keyof RegisterValues]}
                onChange={handleChange}
              />
            ))}

        <button className="auth-submit" type="submit">
          {isLogin ? "Sign In" : "Create Account"}
        </button>

        <div className="divider">
          <span>or</span>
        </div>

        <GoogleLogin
          onSuccess={(credentialResponse) => {
            if (!credentialResponse.credential) {
              setError("Google login did not return credentials.");
              return;
            }

            const decoded = jwtDecode<GoogleUser>(
              credentialResponse.credential
            );
            saveCurrentUser(
              decoded.name || decoded.email || "Google user",
              decoded.email || ""
            );
          }}
          onError={() => setError("Google login failed.")}
        />

        <p className="signin-text">
          {isLogin ? "Do not have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            className="signin-btn"
            onClick={() => navigate(isLogin ? "/register" : "/login")}
          >
            {isLogin ? "Register" : "Sign In"}
          </button>
        </p>
      </form>
    </section>
  );
}

export default AuthPage;
