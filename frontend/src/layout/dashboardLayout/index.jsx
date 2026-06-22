import React from "react";
import styles from "./index.module.css";
import UserLayout from "../userLayout/index.jsx";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAboutUser ,   checkAuth } from "../../config/redux/action/authAction/index.js";


import { useState } from "react";
import { updateUserProfilePhoto } from "../../config/redux/action/authAction/index.js";
import {
  getReceivedRequests,
  acceptRequest,
  rejectRequest,
} from "../../config/redux/action/connectionAction/index.js";
import Button from "@mui/material/Button";

export default function DashboardLayout({
  children,
  handleModal,
  photoUpdateModal,
}) {
  const authState = useSelector((state) => state.auth);
  const connectionState = useSelector((state) => state.connection);
  const dispatch = useDispatch();

  // const [photoUpdateModal, setPhotoUpdateModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleAcceptRequest = (connectionId) => {
    dispatch(acceptRequest(connectionId));
  };
  const handlePhotoUpdate = async () => {
    await dispatch(updateUserProfilePhoto(selectedPhoto));
    await setSelectedPhoto(null);
    dispatch(getAboutUser());
  };

  useEffect(() => {
    dispatch(checkAuth());
  }, [authState.isAuthenticated]);

  useEffect(() => {
    if (authState.isAuthenticated) {
      dispatch(getAboutUser());
    }
  }, [authState.isAuthenticated]);

  useEffect(() => {
    dispatch(getReceivedRequests());
  }, []);

  useEffect(() => {
    if (selectedPhoto) {
      handlePhotoUpdate();
    }
  }, [selectedPhoto]);

  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.leftContainer}>
            <div className={styles.myProfile}>
              <div
                onClick={() => {
                  handleModal();
                }}
                className={styles.profileImage}
              >
                <img src={authState.user.profilePicture} alt="" />
              </div>
              <div className={styles.profileDetails}>
                <div className={styles.name}>
                  <p>{authState.user.name}</p>
                </div>
                <div className={styles.moreDetails}>
                  <p>{authState.user.email}</p>
                  <p>
                    Aspiring Software Developer and Problem Solver | DSA | JAVA
                  </p>
                </div>
              </div>
            </div>
            <div></div>
            <div></div>
          </div>

          <div className={styles.scrollableDivs}>
            <div className={styles.midContainer}>{children}</div>

            <div className={styles.rightContainer}>
              <h2>Notifications</h2>
              <br />
              <br />
              <div className={styles.allNotifications}>
                {connectionState.requestsReceived?.map((request) => {
                  return (
                    <div key={request._id} className={styles.requestContainer}>
                      <div className={styles.requestHeader}>
                        <div
                          style={{
                            backgroundImage: `url(${request.senderId.profilePicture})`,
                          }}
                          className={styles.profilePhoto}
                        ></div>
                        <p>{request.senderId.name}</p>
                      </div>
                      <div className={styles.requestButtons}>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => {
                            handleAcceptRequest(request._id);
                          }}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            console.log("clicked");
                            dispatch(rejectRequest(request._id));
                          }}
                          size="small"
                        >
                          {" "}
                          Decline
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
              LinkedIn News Top stories SpaceX shares surge in debut, making
              Musk a trillionaire 13h ago
              <br />
              <br />
              Top stories SpaceX shares surge in debut, making Musk a
              trillionaire 13h ago
              <br />
              <br />
              43,068 readers Gold, silver ETFs see record outflows 1d ago
              <br />
              <br />
              1,944 readers Wedding bells ring louder at hotels this season 1d
              ago
              <br />
              <br />
              1,288 readers India shows strong demand for FIFA World Cup 1d ago
              <br />
              <br />
              1,178 readers India eases bond market for foreign investors 1d ago
            </div>
          </div>
        </div>
      </div>

      {photoUpdateModal && (
        <div
          className={styles.photoUpdateModalContainer}
          onClick={() => {
            handleModal();
          }}
        >
          <div
            className={styles.photoUpdateModal}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className={styles.roundPhotoModal}>
              <img src={authState.user.profilePicture} alt="" />
            </div>
            <div className={styles.editOptions}>
              <label className={styles.updateIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-6"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                  <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                </svg>
                update
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    setSelectedPhoto(e.target.files[0]);
                  }}
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </UserLayout>
  );
}
