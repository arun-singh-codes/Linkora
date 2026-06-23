import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.css";
import Button from "@mui/material/Button";
import {
  togglePostLike,
  getAllCommentsOnPost,
  deletePost
} from "../../config/redux/action/postAction/index.js";

import { addPostId } from "../../config/redux/reducer/postReducer";
import {
  sendConnectionRequest,
  getSentRequests,
  getAllConnections,
  
} from "../../config/redux/action/connectionAction";
import { useRouter } from "next/router";

export default function index({ toggleCommentContainer }) {
  const postState = useSelector((state) => state.post);
  const authState = useSelector((state) => state.auth);
  const connectionState = useSelector((state) => state.connection);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleIncrementLikes = async (postId) => {
    await dispatch(togglePostLike(postId));
  };

  

  const handleConnect = async (id) => {
    await dispatch(sendConnectionRequest(id));
  };

  useEffect(() => {
    dispatch(getSentRequests());
    dispatch(getAllConnections());
  }, []);

  return (
    <>
      <div className={styles.AllUsersWithPostContainer}>
        {postState.posts.map((post) => {
          const isConnected = connectionState.connections.some((connection) => {
            const otherUser =
              connection.senderId._id === authState.user._id
                ? connection.receiverId
                : connection.senderId;

            return otherUser._id === post.userId._id;
          });
          return (
            <div key={post._id} className={styles.postDiv}>
              {/* Post hearder */}
              <div
                className={styles.postHeader}
                onClick={() => {
                  router.push(`/view-Profile/${post.userId.username}`);
                }}
              >
                <div className={styles.roundImageDiv}>
                  <img
                    src={post.userId?.profilePicture || "/images/image.png"}
                    alt=""
                    className={styles.roundImage}
                  />{" "}
                </div>
                <div className={styles.NameAndSchool}>
                  {<p>{post.userId?.name}</p>}
                </div>

                {post.userId._id !== authState.user._id && (
                  <div className={styles.connectButton}>
                    {" "}
                    {isConnected ? (
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          borderRadius: "1rem",
                          textTransform: "none",
                          backgroundColor: "green"
                        }}
                      >
                        Connected
                      </Button>
                    ) : connectionState.requestsSent[post.userId._id] ? (
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          borderRadius: "1rem",
                          textTransform: "none",
                          opacity: 0.7,
                        }}
                      >
                        Sent
                      </Button>
                    ) : (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConnect(post.userId._id);
                        }}
                        variant="contained"
                        size="small"
                        sx={{
                          borderRadius: "1rem",
                          textTransform: "none",
                          backgroundColor: "#1C6FD3",
                        }}
                      >
                        Connect +
                      </Button>
                    )}
                  </div>
                )}
              </div>

              {/* Post Body */}
              <div className={styles.postBody}>
                <p>{post.body}</p>
              </div>

              {/* Post Image */}
              <div className={styles.postImage}>
                {<img src={post.media} alt="" />}
              </div>

              {/* Post Feedback (Like , Comment  ,Share) */}
              <div className={styles.postFeedbackContainer}>
                {/* Like */}
                <div
                  className={styles.postFeedback}
                  onClick={() => {
                    handleIncrementLikes(post._id);
                  }}
                >
                  <div
                    className={styles.postFeedbackIcon}
                    style={{
                      color: post.likedBy.includes(authState.user._id)
                        ? "blue"
                        : "black",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                     
                    >
                      <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontSize: ".6rem" }}>{post.likes}</p>
                  </div>
                </div>

                {/* Comment */}
                <div className={styles.postFeedback}>
                  <div
                    onClick={() => {
                      toggleCommentContainer();
                      dispatch(getAllCommentsOnPost(post._id));
                      dispatch(addPostId(post._id));
                    }}
                    className={styles.postFeedbackIcon}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      
                      stroke="currentColor"
                      
                    >
                      <path
                        
                        d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                      />
                    </svg>
                  </div>

                  <div>
                    <p
                      style={{
                        fontSize: "0.6rem",
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      {post.comments.length}
                    </p>
                  </div>
                </div>

                {/* Share */}
                <div className={styles.postFeedback}>
                  <div className={styles.postFeedbackIcon2}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      
                      stroke="currentColor"
                      
                    >
                      <path
                        
                        d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                      />
                    </svg>
                  </div>
                </div>

                {/* More Options */}
                <div className={styles.postFeedback}>
                  <div className={styles.postFeedbackIcon2}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      
                      stroke="currentColor"
                      
                    >
                      <path
                        
                        d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Delete Button of Post for Logged in User only
              .............................. */}
              {post.userId &&
                authState.user &&
                post.userId._id === authState.user._id && (
                  <div
                    className={styles.deletePost}
                    onClick={() => dispatch(deletePost(post._id))}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      
                      stroke="currentColor"
                      
                    >
                      <path
                       
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </div>
                )}
            </div>
          );
        })}
      </div>
      hello
    </>
  );
}
