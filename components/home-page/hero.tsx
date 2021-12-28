import classes from "./hero.module.css";
import Image from "next/image";

export default function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src={"/images/site/battle-blog-hero.jpg"}
          alt="Helps battles for kingdom!"
          width={600}
          height={600}
        />
      </div>
      <h1>Helps battle for kingdom</h1>
      <p>place where you can salvage all weapons</p>
    </section>
  );
}
