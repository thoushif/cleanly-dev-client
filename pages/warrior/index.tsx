import Head from "next/head";
import { Fragment } from "react";
import Warrior from "../../components/warrior/warrior";

function WarriorIntro() {
  return (
    <Fragment>
      <Head>
        <title>Warrior Intro</title>
        <meta name="description" content="warrior intro page" />
      </Head>
      <Warrior />
    </Fragment>
  );
}

export default WarriorIntro;
