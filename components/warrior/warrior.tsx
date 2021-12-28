import { useRouter } from "next/router";
import { firebaseClient } from "../../firebaseClient";
import classes from "../home-page/intro.module.css";

export default function Warrior() {
  const router = useRouter();

  return (
    <article className={classes.content}>
      <div className={classes.image}></div>
      <h1>Helps battle for kingdom - Warrior!!</h1>
      <p>you can salvage all weapons here! Sign in Now</p>
      <button
        onClick={async () => {
          await firebaseClient
            .auth()
            .signInWithPopup(new firebaseClient.auth.GoogleAuthProvider());
          router.push(router.route);
        }}
      >
        Register as Warrior
      </button>
    </article>
  );
}
