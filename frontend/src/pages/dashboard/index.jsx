import React, { useEffect } from "react";
import { useRouter } from "next/router.js";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { PhotoCamera } from "@mui/icons-material";
import DoneIcon from "@mui/icons-material/Done";

import {
  checkAuth,
  getAboutUser,
} from "../../config/redux/action/authAction/index.js";

import {
  getAllPosts,
  createPost,
  deletePost,
  commmentOnPost,
  getAllCommentsOnPost,
} from "../../config/redux/action/postAction/index.js";

import DashboardLayout from "../../layout/dashboardLayout/index.jsx";
import styles from "./index.module.css";
import SplitButton from "../../Components/SplitButton/SplitButton.jsx";
import AllUsers from "../../Components/AllUsers/AllUsers.jsx";
import AllUsersWithPost from "../../Components/All_Users_With_post/index.jsx";

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const postState = useSelector((state) => state.post);

  const options = ["Show Users With Their Posts", "Show All Users"];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const [uploadedFile, setUploadedFile] = useState("");
  const [postContent, setPostContent] = useState("");

  const [commentContainer, setCommentContainer] = useState(false);
  const [commentBody, setCommentBody] = useState("");

  const [showPostModal, setShowPostModal] = useState(false);
  const [photoUpdateModal, setPhotoUpdateModal] = useState(false);

  const handleModal = () => {
    setPhotoUpdateModal(!photoUpdateModal);
  };

  const handlePostSubmit = async () => {
    await dispatch(createPost({ postContent, uploadedFile }));
    setPostContent("");
    setUploadedFile("");
    dispatch(getAllPosts());
  };

  const handleCommenting = async () => {
    await dispatch(
      commmentOnPost({ postId: postState.postId, commentBody: commentBody }),
    );
    await dispatch(getAllCommentsOnPost(postState.postId));
    setCommentBody("");
  };

  const toggleCommentContainer = async () => {
    setCommentContainer(!commentContainer);
  };

  useEffect(() => {
    dispatch(checkAuth());
  }, [authState.isAuthenticated]);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      router.push("/login");
    }
  });

  useEffect(() => {
    if (authState.isAuthenticated) {
      dispatch(getAllPosts());
      dispatch(getAboutUser());
    }
  }, [authState.isAuthenticated]);

  return (
    <DashboardLayout
      handleModal={handleModal}
      photoUpdateModal={photoUpdateModal}
    >
      <div className={styles.container}>
        {/* Post Something */}
        <div className={styles.postSomethingContainer}>
          <div className={styles.postSomething}>
            <div
              className={styles.myProfilePic}
              onClick={() => {
                handleModal();
              }}
            >
              <img
                src={authState.user?.profilePicture || "/images/image.png"}
                alt="Profile"
              />
            </div>
            <div className={styles.writeToPost}>
              <input
                onClick={() => setShowPostModal(true)}
                placeholder="Create A New Post ..."
              />
            </div>
            <label htmlFor="addFile">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </label>
          </div>
        </div>

        <div className={styles.showUserAndPostToggleButtonContainer}>
          <SplitButton
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            options={options}
          />
        </div>

        {/* All feeds */}

        {selectedOption == options[1] ? (
          <AllUsers />
        ) : (
          <AllUsersWithPost toggleCommentContainer={toggleCommentContainer} />
        )}
      </div>

      {/* Create New Post Modal */}

      {showPostModal && (
        <div
          className={styles.postModalContainer}
          onClick={() => setShowPostModal(false)}
        >
          <div
            className={styles.postModal}
            onClick={(e) => e.stopPropagation()}
          >
            <h1>New Post</h1>

            <TextField
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Start A Post ..."
              type="text"
              label="Kya soch rahe hain...?"
              multiline
              rows={6}
              variant="outlined"
              fullWidth
            />

            <div className={styles.uploadFile}>
              <div
                style={{ border: uploadedFile ? "5px solid green" : "none" }}
                className={styles.uploadFileButton}
              >
                <input
                  onChange={(e) => {
                    setUploadedFile(e.target.files[0]);
                  }}
                  id="addFile"
                  type="file"
                  className={styles.fileInput}
                ></input>

                <label htmlFor="addFile" style={{ cursor: "pointer" }}>
                  <p style={{ color: "white", marginRight: "0.3rem" }}>
                    AddFiles
                  </p>
                  <PhotoCamera />
                </label>
              </div>
              {uploadedFile ? <DoneIcon /> : <></>}
            </div>

            <div className={styles.postModalFooter}>
              <Button
                variant="outlined"
                onClick={() => setShowPostModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  handlePostSubmit();
                  setShowPostModal(false);
                }}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      )}

      {commentContainer && (
        // CommentBoxContainerModal
        <div
          className={styles.commentBoxContainer}
          onClick={() => {
            toggleCommentContainer();
          }}
        >
          <div
            className={styles.commentBox}
            onClick={(e) => {
              e.stopPropagation(); // 🔥 ye parent tak event jaane se rokega
            }}
          >
            <h2>Comments</h2>
            <div className={styles.commentList}>
              {postState.comments.map((comment) => (
                <div className={styles.eachComment} key={comment._id}>
                  <div>
                    <h6>{comment.userId.name}</h6>
                  </div>
                  <div>{comment.body}</div>
                </div>
              ))}
            </div>

            <div className={styles.commentInputContainer}>
              <TextField
                id="standard-multiline-flexible"
                label="Comment Something ..."
                multiline
                variant="standard"
                fullWidth
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
              />
              <Button
                onClick={() => {
                  handleCommenting();
                }}
                variant="contained"
                sx={{ height: "2rem" }}
                size="small"
              >
                send
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
