import { useRouter } from "next/router";
import classes from "../home-page/intro.module.css";

export default function Emperor() {
  const router = useRouter();

  return (
    <article className={classes.content}>
      <div className={classes.image}></div>
      <h1>Helps battle for kingdom - Emperor!!</h1>
      <p>place where you can salvage all weapons</p>
      <button
        onClick={() => {
          router.push(`${router.asPath}/signup`);
        }}
      >
        Login / Sign up
      </button>
    </article>
  );
}
