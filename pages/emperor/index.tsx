import Head from "next/head";
import { Fragment } from "react";
import Emperor from "../../components/emperor/emperor";

function EmperorInro() {
  return (
    <Fragment>
      <Head>
        <title>Emperor Intro</title>
        <meta name="description" content="emperor intro page" />
      </Head>
      <Emperor />
    </Fragment>
  );
}

export default EmperorInro;
