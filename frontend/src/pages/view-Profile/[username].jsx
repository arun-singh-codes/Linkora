import React from "react";
import styles from "./index.module.css";
import ViewProfileLayout from "../../layout/viewProfileLayout/ViewProfileLayout";
import { useSearchParams } from "next/navigation";
import { clientServer } from "@/config";
import { ContactsOutlined } from "@mui/icons-material";

export default function ViewProfile({ userProfile, posts }) {
  const searchParamers = useSearchParams();

  return (
    <>
      <ViewProfileLayout>
        <div className={styles.profileDetailsContainer}>
          <div className={styles.profilePhotoContainer}>
            <div
              className={styles.profilePhoto}
              style={{
                backgroundImage: `url(${userProfile.userId.profilePicture})`,
              }}
            ></div>
          </div>

          <div className={styles.profileDetails}>
            <div className={styles.userInfo}>
              <h6>{userProfile.userId.name}</h6>
              <p style={{ fontWeight: "400" }}>
                {" "}
                {userProfile.userId.username}
              </p>
              <p> Email : {userProfile.userId.email}</p>
            </div>

            {/* User Posts */}
            <div className={styles.userPosts}>

              My Posts: 

              <div className={styles.postsContainer}>
                {posts.map((post) => (
                  <div className={styles.postCard}> 
                    {/* User Info */}
                    <div className={styles.postHeader}>
                      <div className={styles.avatar}></div>

                      <div className={styles.userInfo}>
                        <h4>{post.userId.name}</h4>
                        <span>@{post.userId.username}</span>
                      </div>
                    </div>

                    {/* Post Body */}
                    <div className={styles.postBody}>{post.body}</div>

                    {/* Media (optional) */}
                    {post.media && (
                      <img src={post.media} className={styles.postMedia} />
                    )}

                    {/* Footer */}
                    <div className={styles.postFooter}>
                      <button>❤️ {post.likes}</button>
                      <button>💬 Comment</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ViewProfileLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { username } = context.query;

  const request = await clientServer.get("/user/getUserProfileByUsername", {
    // request from Next.js server → Backend server
    params: { username },
    headers: {
      cookie: context.req.headers.cookie || "",
    },
  });

  const postsByUser = await clientServer.get(
    `/post/postsByUser/${request.data.userProfile.userId._id}`,
  );


  console.log("arun");
  return {
    props: {
      userProfile: request.data.userProfile,
      posts: postsByUser.data.posts,
    },
  };
}

// {
//     "profile": {
//         "_id": "6a2c1cb79ad292d06956c7af",
//         "userId": {
//             "_id": "6a2c1cad9ad292d06956c7ad",
//             "name": "Reet Babu",
//             "username": "Reet@username",
//             "email": "reej@gmail.com",
//             "profilePicture": "https://res.cloudinary.com/dwk7mhksr/image/upload/v1781291387/LinkedIn/piivhzmgizlzzaygk9p3.jpg"
//         },
//         "bio": "",
//         "currentPost": "",
//         "pastWork": [],
//         "education": []
//     }
