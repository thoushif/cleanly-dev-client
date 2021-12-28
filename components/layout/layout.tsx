import { Fragment } from "react";
import MainNavigation from "./main-navigation";

export default function Layout(props: any) {
  return (
    <Fragment>
      <MainNavigation />
      <main> {props.children} </main>
    </Fragment>
  );
}
