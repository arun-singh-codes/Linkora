// import { useRouter } from "next/router";
// import styles from "@/styles/Home.module.css";
// import UserLayout from "../layout/userLayout";
// export default function Home() {
//   const router = useRouter();

//   return (
//       <div className={styles.container}>
//         <div className={styles.mainContainer}>
//           <div className={styles.mainContainer_left}>
//             <h1>Connect With friends Without Exaggeration </h1>
//             <p>A True Social Media Platform ,With Stories no blufs! </p>
//           </div>
//           <div className={styles.mainContainer_right}>
//             <img src="/images/connection.jpg" alt="" /> 
//           </div>
          
//         </div>
//          <button className={styles.button}  onClick={()=>{router.push("/login")}}>
//           Join now
//         </button>
//       </div>
  
//   );
// }


import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import UserLayout from "../layout/userLayout";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <span className={styles.logo}>Linkora</span>
        <button
          className={styles.navButton}
          onClick={() => {
            router.push("/login");
          }}
        >
          Log in
        </button>
      </nav>

      <div className={styles.mainContainer}>
        <div className={styles.mainContainer_left}>
          <span className={styles.eyebrow}>No filters. No filler.</span>

          <h1>
            Connect with friends, <em>without</em> the exaggeration.
          </h1>

          <p>
            Inspired by the way professionals build genuine connections, reimagined for friendships. Real moments, real people, no exaggeration.
          </p>

          <div className={styles.ctaRow}>
            <button
              className={styles.button}
              onClick={() => {
                router.push("/login");
              }}
            >
              Join now
            </button>
            <span className={styles.ctaNote}>Free forever. No ads, no noise.</span>
          </div>

          <div className={styles.statRow}>
            <div className={styles.stat}>
              <strong>2.4M+</strong>
              <span>real stories shared</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <strong>180+</strong>
              <span>countries connected</span>
            </div>
          </div>
        </div>

        <div className={styles.mainContainer_right}>
          <div className={styles.imageStack}>
            <div className={styles.bgBlob} aria-hidden="true" />

            <div className={styles.chip + " " + styles.chipOne}>
              🎉 Sara just posted a story
            </div>
            <div className={styles.chip + " " + styles.chipTwo}>
              💬 12 friends are online
            </div>

            <div className={styles.photoCard}>
              <img src="/images/connection.jpg" alt="Friends connecting on Linkora" />
            </div>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Linkora — connect for real.</span>
      </footer>
    </div>
  );
}

