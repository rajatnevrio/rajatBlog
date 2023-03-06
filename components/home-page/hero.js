import Image from "next/image";
import classes from "./hero.module.css";
function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/user.png"
          alt="An image showing me"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Rajat</h1>
      <p>
        I blog about web development - especially frontebd frameworks like react
        and nextjs
      </p>
    </section>
  );
}

export default Hero;
