import React, { useEffect, useState } from "react";
import UserLayout from "../../layout/userLayout";
import { clientServer } from "@/config";
import styles from "./index.module.css";
import { useDispatch , useSelector } from "react-redux";
import Button from "@mui/material/Button";
import {
  acceptRequest,
  rejectRequest,
  getReceivedRequests
} from "../../config/redux/action/connectionAction";

export default function Notifications() {
  const dispatch = useDispatch();
  const connnectionState = useSelector((state) => state.connection);

  const allRequests = connnectionState.requestsReceived;
  useEffect(() => {
    dispatch(getReceivedRequests());
  }, []);

  const handleAccept = async (requestId) => {
    await dispatch(acceptRequest(requestId));
  };

  const handleReject = async (requestId) => {
    await dispatch(rejectRequest(requestId));
  };
  return (
    <UserLayout>
      <div className={styles.container}>
        <h1 className={styles.heading}>Notifications</h1>

        <div className={styles.notificationsContainer}>
          {allRequests?.length > 0 ? (
            allRequests.map((request) => (
              <div key={request._id} className={styles.notificationCard}>
                <img
                  src={request.senderId.profilePicture}
                  alt={request.senderId.name}
                  className={styles.profileImage}
                />

                <div className={styles.userInfo}>
                  <h3>{request.senderId.name}</h3>
                  <p>{request.senderId.email}</p>
                  <span>Sent you a connection request</span>
                </div>

                <div className={styles.actions}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleAccept(request._id)}
                  >
                    Accept
                  </Button>

                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleReject(request._id)}
                  >
                    Decline
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <h3>No Notifications Found</h3>
          )}
        </div>
      </div>
    </UserLayout>
  );
}
