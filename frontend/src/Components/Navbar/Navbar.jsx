import style from "./navbar.module.css";
import WorkIcon from "@mui/icons-material/Work";
import MessageIcon from "@mui/icons-material/Message";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { searchUsers } from "../../config/redux/action/authAction/index.js";
import HamburgerMenu from "../HamburgerMenu/index.jsx";
import { useRouter } from "next/router";
import {
  getAboutUser,
  checkAuth,
} from "../../config/redux/action/authAction/index.js";
import HomeIcon from "@mui/icons-material/Home";

export default function Navbar({
  searchModal,
  setSearchModal,
  setSearchModalPosition,
}) {
  const authState = useSelector((state) => state.auth);
  const [searchInputValue, setSearchInputValue] = useState("");
  const inputRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (!searchModal) {
      setSearchInputValue("");
    }
  }, [searchModal]); // 👈 dependency add karo

  useEffect(() => {
    dispatch(checkAuth());
  }, [authState.isAuthenticated]);

  useEffect(() => {
    console.log("Effect Ran", authState.isAuthenticated);
    if (authState.isAuthenticated) {
      dispatch(getAboutUser());
    }
  }, [authState.isAuthenticated]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInputValue.trim()) {
        dispatch(searchUsers(searchInputValue));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInputValue]);

  useEffect(() => {
    //Run only once first time   useEffect sirf event listener attach karne ke liye ek baar chala
    // Uske baad browser khud handleResize ko call karta hai jab bhi resize hota hai
    const handleResize = () => {
      const rect = inputRef.current.getBoundingClientRect();
      setSearchModalPosition({
        top: rect.bottom,
        left: rect.left,
        width: rect.width,
      });
    };
    handleResize(); // Call it initially to set the position when the component mounts
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize); // jab ye use effect barbar rerender pe chalega to
    // upar wali line addingEventListener kai bar add hoga usko rokne ke liye ye return likha hai
    //  ye pehle wali line ko rempve kar dega
  }, []);

  return (
    <>
      <div className={style.navbarContainer}>
        <div className={style.navbar}>
          <div className={style.HamburgerMenuContainer}>
            <HamburgerMenu />
          </div>

          <div className={style.logo}>
            <img src="/images/mainIcon.png" alt="" />
          </div>

          {/* searchBarContainer */}
          <div className={style.searchBarContainer}>
            <div
              ref={inputRef}
              className={style.searchBar}
              style={{ border: searchModal ? "1px solid black" : "none" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "absolute",
                  height: "fit-content",
                }}
                className={style.inputContainer}
              >
                <svg
                  style={{ height: "1rem" }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>

                <input
                  onClick={() => {
                    const rect = inputRef.current.getBoundingClientRect();
                    setSearchModalPosition({
                      top: rect.bottom,
                      left: rect.left,
                      width: rect.width,
                    });
                    setSearchModal(true);
                  }}
                  style={{
                    outline: "none",
                    border: "none",
                    paddingInline: "0.5rem",
                    width: "100%",
                  }}
                  onChange={(e) => {
                    setSearchInputValue(e.target.value);
                  }}
                  value={searchInputValue}
                  placeholder="Search..."
                  type="text"
                ></input>
              </div>
            </div>
          </div>

          {/* Nav - options */}

          <div className={style.navOptionsContainer}>
            <div
              className={style.navOption}
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              <HomeIcon fontSize="medium" />
              <p>Home</p>
            </div>
            <div
              className={style.navOption}
              onClick={() => {
                router.push("/MyConnections");
              }}
            >
              <img src="/images/network.png" alt="" />
              <p>My Networks</p>
            </div>
            <div className={style.navOption}>
              <WorkIcon />
              <p>Jobs</p>

              <span className={style.tooltip}>Coming Soon 🚀</span>
            </div>

            <div className={style.navOption}>
              <MessageIcon />
              <p>Messages</p>

              <span className={style.tooltip}>Coming Soon 🚀</span>
            </div>
            <div className={style.navOption}></div>
          </div>

          <div className={style.profile}>
            <div className={style.profileIcon}>
              <img src={authState.user.profilePicture} alt="" />
            </div>
            <div
              style={{
                fontSize: ".8rem",
                fontWeight: "700",
                color: "green",
                padding: "none",
              }}
              className={style.username}
            >
              <p>Hello,{authState.user.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
