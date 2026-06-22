import React, { useEffect } from "react";
import styles from "./AllUsers.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersProfile } from "../../config/redux/action/authAction/index.js";
import { useRouter } from "next/router";

export default function AllUsers() {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  
  useEffect(() => {
    dispatch(getAllUsersProfile());
  }, []);

  return (
    <div className={styles["All-Users-Profile-Container"]}>

      {authState.allUsersProfile.map((user) => (
        <div
          key={user.userId._id}
          onClick={() => {
            router.push(`/view-Profile/${user.userId.username}`);
          }}
          className={styles["single-User-Profile-Container"]}
        >
          <div className={styles["user-Profile-Photo-Container"]}>
            <div
              style={{
                backgroundImage: `url(${user.userId.profilePicture ? user.userId.profilePicture : ""})`,
              }}
              className={styles["user-Profile-Photo"]}
            ></div>
          </div>
          <div className={styles["user-Profile-Details"]}>
            {user.userId.name}
          </div>
        </div>

      ))}
    </div>
  );
}
