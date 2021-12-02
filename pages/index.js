import Head from "next/head";
import styles from "../styles/Home.module.css";
import { SiSpotify } from "react-icons/si";

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/spotify");
  const data = await res.json();

  return {
    props: { spotify: data },
    revalidate: 1,
  };
};

export default function Home({ spotify }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Spotify Connection using Next.js</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Spotify Connection using <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Display Spotify {"Currently Playing"} Status From It{"'"}s Official
          API.
        </p>

        <div className={styles.grid}>
          <h2>Online Status:</h2>
          <a
            href={
              spotify?.isPlaying
                ? spotify.songUrl
                : "https://open.spotify.com/user/31mfhvof7jt4iunmo5sbs7xk3nye?si=62f0a47200fb49fb"
            }
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <div className={styles.box}>
              {spotify?.isPlaying ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className={styles.image}
                  src={spotify?.albumImageUrl}
                  alt={spotify?.album}
                  width="72px"
                />
              ) : (
                <SiSpotify size={64} color={"#1ED760"} />
              )}
            </div>

            <div className={styles.info}>
              <h2>
                {spotify?.isPlaying ? spotify.title : "Currently offline"}
              </h2>
              <p>{spotify?.isPlaying ? spotify.artist : "Spotify"}</p>
            </div>
          </a>

          <h2>Offline Status:</h2>
          <a className={styles.card}>
            <div className={styles.box}>
              <SiSpotify size={72} color={"#1ED760"} />
            </div>

            <div className={styles.info}>
              <h2>{"Currently offline"}</h2>
              <p>{"Spotify"}</p>
            </div>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/ilhambara"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made in {"🚀"}
          <strong>{"@ilhambara"}</strong>
        </a>
      </footer>
    </div>
  );
}
