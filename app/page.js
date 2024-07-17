import Image from "next/image";
import { SearchBar } from "./components/SearchBar.js";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.title} style={{ marginBottom: "25px" }}>
          TMDB Demo Application
        </h1>
        <SearchBar />
      </main>
      <footer>
        <p className={styles.center}>
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
      </footer>
    </>
  );
}
