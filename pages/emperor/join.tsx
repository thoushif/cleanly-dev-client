import Head from "next/head";
import { Fragment } from "react";
import EmperorSignup from "../../components/emperor/emperor-signup";

function EmperorInro() {
  return (
    <Fragment>
      <Head>
        <title>Emperor Intro</title>
        <meta name="description" content="emperor intro page" />
      </Head>
      <EmperorSignup />
    </Fragment>
  );
}

export default EmperorInro;
