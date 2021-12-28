import Head from "next/head";
import { Fragment } from "react";
import BattleDescription from "../components/home-page/battledescription";
import Hero from "../components/home-page/hero";

function HomePage() {
  return (
    <Fragment>
      <Head>
        <meta name="description" content="battles for good earth" />
      </Head>
      <Hero />
      <BattleDescription />
    </Fragment>
  );
}

export default HomePage;
