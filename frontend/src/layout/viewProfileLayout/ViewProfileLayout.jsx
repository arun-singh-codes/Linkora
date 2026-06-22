import React from "react";
import UserLayout from "../userLayout/index.jsx";
import styles from "./ViewProfileLayout.module.css";

export default function ViewProfileLayout({ children }) {
  return (
    <>
      <UserLayout>
        <div className={styles["View-Profile-Layout"]}>
            {children}
          <div className={styles["More-Matching-Profiles"]}>
            {" "}
            More Matching Profiles
          </div> 
        </div>
      </UserLayout>
    </>
  );
}
