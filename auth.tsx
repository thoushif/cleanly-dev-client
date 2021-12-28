import React, { useState, useEffect, useContext, createContext } from "react";
import nookies from "nookies";
import { firebaseClient } from "./firebaseClient";
import axios from "axios";
import { useRouter } from "next/router";

enum Role {
  WARRIOR = "warrior",
  EMPEROR = "emperor",
  GUEST = "guest",
  MINISTER = "minister"
}
// class BattleUser implements firebaseClient.User {
//   role: Role;
//   constructor(role: Role) {
//     this.role = role;
//   }
// }

type UserWithRole = {
  user: firebaseClient.User | null;
  userRole: Role;
};

const AuthContext = createContext<UserWithRole>({
  user: null,
  userRole: Role.GUEST
});

export function AuthProvider({ children }: any) {
  const [userWithRoleNow, setUserWithRoleNow] = useState<UserWithRole>({
    user: null,
    userRole: Role.GUEST
  });
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).nookies = nookies;
    }
    return firebaseClient.auth().onIdTokenChanged(async (user) => {
      console.log(`token changed!`);
      if (!user) {
        console.log(`no token found...`);
        setUserWithRoleNow({
          user: null,
          userRole: Role.GUEST
        });
        nookies.destroy(null, "token");
        nookies.set(null, "token", "", { path: "/" });
        return;
      }
      const roleNow = router.asPath.replaceAll("/", "").toUpperCase();

      console.log(`updating token...${roleNow}`);
      const token = await user.getIdToken();
      const url = process.env["NEXT_PUBLIC_SERVER_URL"];
      console.log(`aaaaaaaaaaaaaaaaaaaaaaaaaaaa ${token} `);
      axios
        .post(`${url}/api/current-user`, {
          headers: {
            token: `${token}`
          }
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.error(error);
        });

      setUserWithRoleNow({
        user: user,
        userRole: Role[(roleNow as unknown) as keyof typeof Role]
      });
      nookies.destroy(null, "token");
      nookies.set(null, "token", token, { path: "/" });
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      console.log(`refreshing token...`);
      const user = firebaseClient.auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: userWithRoleNow.user, userRole: userWithRoleNow.userRole }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
