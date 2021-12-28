import { firebaseClient } from "../../firebaseClient";
import classes from "../home-page/intro.module.css";
import LoginForm from "./emperor-login";

export default function EmperorSignup() {
  return (
    <article className={classes.content}>
      <div className={classes.image}></div>
      <LoginForm />
      <button
        onClick={async () => {
          await firebaseClient
            .auth()
            .signInWithPopup(new firebaseClient.auth.GoogleAuthProvider());
        }}
      >
        Sign up as Emperor
      </button>
    </article>
  );
}
