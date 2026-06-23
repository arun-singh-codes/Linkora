import {useDispatch , useSelector} from "react-redux";
import {loginUser} from "../../config/redux/action/authAction";
import {useState} from "react";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import styles from "./index.module.css";


export default function Login({handleForm}){
    const dispatch = useDispatch();
    let [formData, setFormData] = useState({
    password: "",
    username: "",
  });

  let handleOnChange=(e)=>{
    setFormData((prevData)=>({
        ...prevData , 
        [e.target.name] : e.target.value
    }))
  }
  let handleFormSubmit =(e)=>{
    e.preventDefault();
    dispatch(loginUser({...formData}))
  }

  const authState = useSelector((state) => state.auth);
  return (
    <>

    <div className={styles.formContainer} style={{ height: "17rem" }}>
      <h1 className={styles.heading}>Login on LinkedIn</h1>

      <p style={{color:authState.isError?"red" : "green"}}>{authState.message}</p>

      <form onSubmit={handleFormSubmit} method="post">
        <div className={styles.formItems}>
          <TextField
            id="outlined-basic"
            name="username"
            label="Username"
            variant="outlined"
            onChange={handleOnChange}
            value={formData.username}
          />
          <TextField
            id="outlined-basic"
            type="password"
            name="password"
            label="Password"
            variant="outlined"
            onChange={handleOnChange}
            value={formData.password}
          />

          <Button variant="contained" type="submit">
            SubmitForm
          </Button>
          {/* <ToastContainer position="top-right" autoClose={3000} /> */}
        </div>
      </form>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "-0.6rem",
        }}
      >
        <p className="smalltext">
          Create an Account?{" "}
          <a
            style={{
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={handleForm}
          >
            SignUp
          </a>
        </p>
      </div>
    </div>
    </>
  )


}