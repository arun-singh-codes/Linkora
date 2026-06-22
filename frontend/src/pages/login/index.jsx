
import { useRouter } from "next/router.js";
import UserLayout from "../../layout/userLayout/index.jsx"
import React from "react";
import{useSelector  , useDispatch} from "react-redux";
import styles from "./index.module.css";
import {useEffect ,useState } from "react";
import SignUp from "./SignUp.jsx"
import Login from "./Login.jsx"
import {checkAuth} from "../../config/redux/action/authAction/index.js";

export default function LoginPage() {

  const authState = useSelector((state)=> state.auth);  // state = whole Redux store
  const router = useRouter();
  let[signup , setSignup] = useState(true);

  const dispatch = useDispatch();

  let handleForm = ()=>{
    setSignup(!signup);

  }

  useEffect(()=>{
    if(authState.isAuthenticated){
      router.push("/dashboard");
      console.log("Logged in redirected to /dashboard");
    }
  } , [authState.isAuthenticated])

  useEffect(()=>{
    dispatch(checkAuth());
  } , [])


  return (
    <>
    
    {/* <UserLayout> */}
 
        <div className={styles.container}>
          <div className={styles.leftContainer}>
            {signup?<SignUp handleForm={handleForm}/> : <Login handleForm={handleForm}/>}
          </div>
          <div className={styles.rightContainer}>
            <img src="/images/linkedin_1549994884.webp" alt="" />
          </div>
        </div>
    {/* </UserLayout> */}
    </>
  )
  
}
