import React, { useEffect } from "react";
import UserLayout from "../../layout/userLayout";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllConnections } from "@/config/redux/action/connectionAction";


export default function MyConnections() {
  const authState = useSelector((state) => state.auth);
  const connnectionState = useSelector((state) => state.connection);
  const currentUserId = authState?.user?._id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllConnections());
  }, []);

  return (
    <UserLayout>
      <div className={styles.container}>
        <h1 className={styles.heading}>My Connections</h1>

        <div className={styles.connectionsContainer}>
          {connnectionState.connections?.map((connection) => {
            const otherUser =
              connection.senderId._id === currentUserId
                ? connection.receiverId
                : connection.senderId;

            return (
              <div key={connection._id} className={styles.connectionCard}>
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

                <button className={styles.messageBtn}>Message</button>
              </div>
            );
          })}
        </div>
      </div>
    </UserLayout>
  );
}
