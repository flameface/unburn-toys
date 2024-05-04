import styles from "@/styles/home.module.css";
import Card from "@/components/card";
import Footer from "@/components/footer";
import Nav from "@/components/nav";
import { Button } from "@nextui-org/react";

export default async function Home() {
  return (
    <>
      <Nav />
      <div className={`${styles.headerImage} fadeIn`}></div>
      <div className={`${styles.mainHead} fadeIn`}>
        <h1>Everyday AI Tools: Unburn Toys</h1>
        <p>Empower your daily tasks with our versatile AI toolbox, delivering essential tools for every need.</p>

        <a href="#gen-tools">
          <Button
            variant="solid"
            style={{
              background: "rgba(255, 255, 255, 0.01)",
              border: "1px solid rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(5px)",
              width: "100%",
              height: "40px",
            }}
          >
            Explore
          </Button>
        </a>
      </div>

      <Card />
      <Footer />
    </>
  );
}