

import React from "react";
import UserLayout from "../../layout/userLayout";
import { clientServer } from "@/config";
import styles from "./index.module.css";
import { useSelector } from "react-redux";

export default function MyConnections({ connections }) {
  const authState = useSelector((state) => state.auth);
  const currentUserId = authState?.user?._id;

  return (
    <UserLayout>
      <div className={styles.container}>
        <h1 className={styles.heading}>My Connections</h1>

        <div className={styles.connectionsContainer}>
          {connections?.map((connection) => {
            const otherUser =
              connection.senderId._id === currentUserId
                ? connection.receiverId
                : connection.senderId;

            return (
              <div
                key={connection._id}
                className={styles.connectionCard}
              >
                <img
                  src={otherUser.profilePicture}
                  alt={otherUser.name}
                  className={styles.profileImage}
                />

                <div className={styles.userInfo}>
                  <h3>{otherUser.name}</h3>
                  <p>{otherUser.email}</p>
                  <span>Connected</span>
                </div>

                <button className={styles.messageBtn}>
                  Message
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </UserLayout>
  );
}

export async function getServerSideProps(context) {
  try {
    console.log("SSR COOKIE:", context.req.headers.cookie);
    const res = await clientServer.get(
      "/connection/getAllConnections",
      {
        headers: {
          cookie: context.req.headers.cookie || "",
        },
      }
    );

    return {
      props: {
        connections: res.data,
      },
    };
  } catch (err) {
    console.log(err?.response?.data || err.message);

    
  }
}
