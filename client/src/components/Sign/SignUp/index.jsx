import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../../redux/features/auth";
import styles from "../SignUp/signup.module.css";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState(
    "поле ввода не может быть пустым"
  );
  const [passwordError, setPasswordError] = useState(
    "поле ввода не может быть пустым"
  );
  const [formValid, setFormValid] = useState(false);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    let regEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(String(e.target.value).toLowerCase())) {
      setEmailError("неправильно введен емейл");
    } else {
      setEmailError("");
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 8) {
      setPasswordError("пароль должен быть длиннее 3 и меньше 8");
      if (!e.target.value) {
        setPasswordError("поле ввода не может быть пустым");
      }
    } else {
      setPasswordError("");
    }
  };

  const error = useSelector((state) => state.authReducer.error);

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  const handleSubmit = () => {
    dispatch(createUser(email, password));
    navigate("/signin");
  };

  const blurHandler = (e) => {
    switch (e.target) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.gradient}>
      <div className={styles.login__box}>
        <h2>регистрация</h2>
        <div>
          {error}
          {emailDirty && emailError && (
            <div style={{ color: "red" }}>{emailError}</div>
          )}
          <div className={styles.user__box}>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => handleChangeEmail(e)}
              onBlur={(e) => blurHandler(e)}
              name="email"
            />
          </div>
          {passwordDirty && passwordError && (
            <div style={{ color: "red" }}>{passwordError}</div>
          )}
          <div className={styles.user__box}>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => passwordHandler(e)}
              onBlur={(e) => blurHandler(e)}
              name="password"
            />
          </div>
          <Link to="/signin">
            {" "}
            <button
              onClick={handleSubmit}
              disabled={!formValid}
              className={styles.button5}
            >
              зарегистрироваться
            </button>
          </Link>
        </div>
        <div className={styles.main}>
          <Link to="/" className={styles.a}>
            Главное меню
          </Link>
        </div>
        <div className={styles.main}>
          <Link to="/signin" className={styles.a}>
            Вход
          </Link>
        </div>
      </div>
    </div>
  );
}
