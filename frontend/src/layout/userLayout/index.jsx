import { React, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import Style from "./index.module.css";
import { useSelector } from "react-redux";

export default function UserLayout({ children }) {
  const authState = useSelector((state) => state.auth);

  const [searchModal, setSearchModal] = useState(false);
  const [searchModalPosition, setSearchModalPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  return (
    <>
      <div className={Style.container}>
        <div className={Style.navbar}>
          <Navbar
            searchModal={searchModal}
            setSearchModal={setSearchModal}
            setSearchModalPosition={setSearchModalPosition}
          />
          
        </div>

        {children}

        {searchModal && (
          <div
            className={Style.searchModalHistoryContainer}
            style={{
              position: "fixed",
              top: searchModalPosition.top,
              left: searchModalPosition.left,
              width: searchModalPosition.width,
              backgroundColor: "white",
              zIndex: 100,
              borderRadius: "0.3rem",
              marginTop: "0.15rem",
              padding: "0.2rem",
              overflow:"none"
            }}
          >
            {authState.searchedUsers.map((user) => (
              <div className={Style.searchUserCard}>
                <div className={Style.imageWrapper}>
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className={Style.searchUserImage}
                  />
                </div>

                <div className={Style.searchUserInfo}>
                  <div className={Style.searchUserName}>{user.name}</div>

                  <div className={Style.searchUserUsername}>
                    @{user.username}
                  </div>
                </div>
              </div>
            ))}
            
          </div>
        )}
      </div>

      {searchModal && (
        <div
          onClick={() => {
            setSearchModal(false);
          }}
          className={Style.searchModalContainer}
        ></div>
      )}
    </>
  );
}
