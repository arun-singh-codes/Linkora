import React, { useState } from "react";
import UserLayout from "../../layout/userLayout";
import { clientServer } from "@/config";
import styles from "./index.module.css";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import {
  acceptRequest,
  rejectRequest,
} from "../../config/redux/action/connectionAction";

export default function Notifications({ requests }) {
  const dispatch = useDispatch();

  const [allRequests, setAllRequests] = useState(requests);

  const handleAccept = async (requestId) => {
    await dispatch(acceptRequest(requestId));

    setAllRequests((prev) =>
      prev.filter((request) => request._id !== requestId),
    );
  };

  const handleReject = async (requestId) => {
  await dispatch(rejectRequest(requestId));

  setAllRequests((prev) =>
    prev.filter((request) => request._id !== requestId)
  );
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
                    onClick={() =>handleAccept(request._id) }
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

// export async function getServerSideProps(context) {
//   const res = await clientServer.get(
//     "/connection/getReceivedRequests",
//     {
//       headers: {
//         cookie: context.req.headers.cookie || "",
//       },
//     },
//   );

//   return {
//     props: {
//       requests: res.data,
//     },
//   };
// }
export async function getServerSideProps(context) {
  try {
    console.log("SSR COOKIE:", context.req.headers.cookie);

    const res = await clientServer.get(
      "/connection/getReceivedRequests",
      {
        headers: {
          cookie: context.req.headers.cookie || "",
        },
      }
    );

    console.log("SUCCESS");

    return {
      props: {
        requests: res.data,
      },
    };
  } catch (err) {
    console.log("STATUS:", err?.response?.status);
    console.log("DATA:", err?.response?.data);
    console.log("MESSAGE:", err?.message);

    return {
      props: {
        requests: [],
      },
    };
  }
}