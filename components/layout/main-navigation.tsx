import Logo from "./logo";
import Link from "next/link";
import classes from "./main-navigation.module.css";
import { firebaseClient } from "../../firebaseClient";
import { useAuth } from "../../auth";
import router from "next/router";

export default function MainNavigation() {
  const { user, userRole } = useAuth();
  const title = `${user?.displayName} - ${userRole}`;
  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <nav>
        <ul>
          {user ? (
            <>
              <li>
                <Link href="/profile">{title}</Link>
              </li>
              <li>
                <button
                  onClick={async () => {
                    await firebaseClient
                      .auth()
                      .signOut()
                      .then(() => {
                        console.log(
                          "signed out successfully!!, Now to home page"
                        );
                        router.push("/");
                      });
                  }}
                >
                  Sign out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/warrior">Warrior </Link>
              </li>
              <li>
                <Link href="/emperor">Emperor</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
