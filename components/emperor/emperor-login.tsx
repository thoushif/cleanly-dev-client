import { FormEvent, useEffect, useState } from "react";
import { firebaseClient } from "../../firebaseClient";
import { getNotification } from "../../lib/notification-util";
import Notification from "../ui/notification";
import classes from "./login.module.css";

async function setLoginData(loginFormData) {
  // const response = await fetch("/api/contact", {
  //   method: "POST",
  //   body: JSON.stringify(loginFormData),
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  // });
  // const data = await response.json();
  // if (!response.ok) {
  //   throw new Error(data.message || "Something went wrong");
  // }

  return loginFormData;
}

export default function LoginForm() {
  const initLoginForm = { email: "", password: "" };
  const [loginFormData, setLoginFormData] = useState(initLoginForm);
  const initReqStatus = {
    status: undefined,
    title: undefined,
    message: undefined
  };
  const [reqStatusObj, setReqStatusObj] = useState(initReqStatus);

  useEffect(() => {
    if (reqStatusObj.status === "success" || reqStatusObj.status === "error") {
      const timer = setTimeout(() => {
        setReqStatusObj(initReqStatus);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [reqStatusObj]);

  async function loginHandler(event: FormEvent) {
    event.preventDefault();
    setReqStatusObj(getNotification("pending"));
    try {
      await setLoginData(loginFormData);
      setReqStatusObj(getNotification("success"));

      await firebaseClient
        .auth()
        .signInWithEmailAndPassword(
          loginFormData.email,
          loginFormData.password
        );
    } catch (err) {
      setReqStatusObj({ ...getNotification("error"), message: err.message });
    }
  }

  async function signupHandler(event: FormEvent) {
    event.preventDefault();
    setReqStatusObj(getNotification("pending"));
    try {
      await setLoginData(loginFormData);
      setReqStatusObj(getNotification("success"));

      await firebaseClient
        .auth()
        .createUserWithEmailAndPassword(
          loginFormData.email,
          loginFormData.password
        );
    } catch (err) {
      setReqStatusObj({ ...getNotification("error"), message: err.message });
    }
  }
  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const value = evt.target.value;
    setLoginFormData({
      ...loginFormData,
      [evt.target.id]: value
    });
  }
  return (
    <section className={classes.contact}>
      <form className={classes.form}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              value={loginFormData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              value={loginFormData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>{" "}
        <div className={classes.actions}>
          <button type="submit" onClick={signupHandler}>
            Sign Up
          </button>
        </div>
        <button onClick={loginHandler}>Already Signed Up? Login</button>
      </form>
      {reqStatusObj.status && (
        <Notification
          status={reqStatusObj.status}
          title={reqStatusObj.title}
          message={reqStatusObj.message}
        />
      )}
    </section>
  );
}
