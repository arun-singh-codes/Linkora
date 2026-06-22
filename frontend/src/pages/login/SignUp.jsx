import {useDispatch  ,useSelector} from "react-redux";
import {registerUser , getAllUsersProfile} from "../../config/redux/action/authAction";
import {useState} from "react";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import styles from "./index.module.css";


export default function Signup({ handleForm }) {
  let [formData, setFormData] = useState({
    email: "",
    name:"",
    password: "",
    username: "",
  });

  let handleOnChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };
  const dispatch = useDispatch();

  let handleFormSubmit =async(event)=>{
    event.preventDefault();
     await dispatch(registerUser({...formData}));
     dispatch(getAllUsersProfile());

  }
  const authState = useSelector((state) => state.auth);
  


  return (
    <div className={styles.formContainer}>
      <h1 className={styles.heading}>SignUp on LinkedIn</h1>

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
                name="name"
                label="Name"
                variant="outlined"
                onChange={handleOnChange}
                value={formData.name}
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
              <TextField
                id="outlined-basic"
                name="email"
                label="Email"
                variant="outlined"
                onChange={handleOnChange}
                value={formData.email}
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
          marginTop: "0.4rem",
        }}
      >
        <p className="smalltext">
          Already Have an Account?{" "}
          <a
            
            style={{
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={handleForm}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}