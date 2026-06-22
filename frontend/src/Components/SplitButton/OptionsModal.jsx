import { color, width } from "@mui/system";
import styles from "./OptionsModal.module.css";

const OptionsModal = ({ styleObject  ,setSelectedOption ,options , openModal ,  setOpenModal}) => {

  return (
    <div className={styles["options-Container"]} style={{top: styleObject.bottom, left: styleObject.left }}>
      <div onClick={()=>{setSelectedOption(options[1]) , setOpenModal(!openModal)}}>Show All Users</div>
      <div onClick={()=>{setSelectedOption(options[0]), setOpenModal(!openModal)}}>Show All Users With Posts</div>
    </div>
  );
};

export default OptionsModal;
