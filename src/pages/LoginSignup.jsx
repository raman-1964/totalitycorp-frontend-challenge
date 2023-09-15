import React, { useState } from "react";
import { loginAllValidation, signUpAllValidation } from "../utils/validation";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(true);
  const [error, setError] = useState([]);
  const [loginCont, setLoginCont] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState({
    email: "",
    password: "",
  });
  const [signupCont, setSignupCont] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });
  const [signupError, setSignupError] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const onChange = (str, e) => {
    if (str === "login")
      setLoginCont((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    else
      setSignupCont((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
  };

  const login = (e) => {
    e.preventDefault();
    const { isValid, errors } = loginAllValidation(loginCont);
    if (isValid) {
      const allMember = JSON.parse(
        localStorage.getItem("Raman-Current-SignUped")
      );
      for (let member of allMember) {
        if (
          member.email === loginCont.email &&
          member.password === loginCont.password
        ) {
          localStorage.setItem("Raman-Current-LoggedIn-Email", loginCont.email);
          localStorage.setItem("Raman-Current-LoggedIn-Name", member.name);
          navigate("/");
          return;
        }
      }
      setError(["login", "User Not Found"]);
      setLoginError({ email: "", password: "" });
      setTimeout(() => {
        setError([]);
      }, 2500);
    } else setLoginError(errors);
  };
  const signup = (e) => {
    e.preventDefault();
    if (signupCont.password !== signupCont.cPassword) {
      setError(["signup", "password and confirm password doesn't match"]);
      setSignupError({ name: "", email: "", password: "", cPassword: "" });
      setTimeout(() => {
        setError([]);
      }, 2500);
      return;
    }
    const { isValid, errors } = signUpAllValidation(signupCont);
    if (isValid) {
      const allMember =
        JSON.parse(localStorage.getItem("Raman-Current-SignUped")) || [];
      for (let member of allMember) {
        if (member.email === signupCont.email) {
          setError(["signup", "user already exist"]);
          setSignupError({ name: "", email: "", password: "", cPassword: "" });
          setTimeout(() => {
            setError([]);
          }, 2500);
          return;
        }
      }

      allMember.push({
        name: signupCont.name,
        email: signupCont.email,
        password: signupCont.password,
      });
      localStorage.setItem("Raman-Current-SignUped", JSON.stringify(allMember));
      localStorage.setItem("Raman-Current-LoggedIn-Email", signupCont.email);
      localStorage.setItem("Raman-Current-LoggedIn-Name", signupCont.name);
      navigate("/");
    } else setSignupError(errors);
  };

  return (
    <div className="checkoutCont">
      {show ? (
        <div className="adressCont">
          <h1>Login</h1>

          <div className="inputCont">
            <h1>Email</h1>
            <input
              type="text"
              name="email"
              value={loginCont.email}
              placeholder="raman@example.com"
              onChange={(e) => onChange("login", e)}
            />
            <p className="error">
              {loginError && loginError["email"]
                ? loginError["email"][0]
                : null}
            </p>
          </div>
          <div className="inputCont">
            <h1>Password</h1>
            <input
              type="password"
              name="password"
              value={loginCont.password}
              placeholder="Your Password"
              onChange={(e) => onChange("login", e)}
            />
            <p className="error">
              {loginError && loginError["address"]
                ? loginError["address"][0]
                : null}
            </p>
          </div>
          <h1 className="login-to-signup">
            Don't have an account?{" "}
            <span onClick={() => setShow(false)}> Signup</span>
          </h1>
          {error.length && error[0] === "login" ? (
            <h1 className="cError">{error[1]}</h1>
          ) : null}
          <button className="btn" onClick={(e) => login(e)}>
            Login
          </button>
        </div>
      ) : (
        <div className="paymentCont">
          <h1>SignUp</h1>
          <div className="inputCont">
            <h1>Name</h1>
            <input
              type="text"
              name="name"
              placeholder="Raman Kumar"
              value={signupCont.name}
              onChange={(e) => onChange("signup", e)}
            />
            <p className="error">
              {signupError && signupError["name"]
                ? signupError["name"][0]
                : null}
            </p>
          </div>
          <div className="inputCont">
            <h1>Email</h1>
            <input
              type="text"
              name="email"
              value={signupCont.email}
              placeholder="raman@example.com"
              onChange={(e) => onChange("signup", e)}
            />
            <p className="error">
              {signupError && signupError["email"]
                ? signupError["email"][0]
                : null}
            </p>
          </div>
          <div className="inputCont">
            <h1>Password</h1>
            <input
              type="password"
              name="password"
              placeholder="Your Password"
              value={signupCont.password}
              onChange={(e) => onChange("signup", e)}
            />
            <p className="error">
              {signupError && signupError["month"]
                ? signupError["month"][0]
                : null}
            </p>
          </div>
          <div className="inputCont">
            <h1>Conform Password</h1>
            <input
              type="text"
              name="cPassword"
              placeholder="Confirm your password"
              value={signupCont.cPassword}
              onChange={(e) => onChange("signup", e)}
            />
            <p className="error">
              {signupError && signupError["year"]
                ? signupError["year"][0]
                : null}
            </p>
          </div>
          <h1 className="login-to-signup">
            Have an account. <span onClick={() => setShow(true)}> Login</span>
          </h1>
          {error.length && error[0] === "signup" ? (
            <h1 className="cError">{error[1]}</h1>
          ) : null}
          <button className="btn" onClick={(e) => signup(e)}>
            Signup
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
