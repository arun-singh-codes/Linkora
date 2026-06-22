import styles from "./SplitButton.module.css";
import { useState, useRef, useEffect } from "react";
import OptionsModal from "./OptionsModal";


const SplitButton = ({selectedOption ,setSelectedOption , options}) => {

  const [openModal, setOpenModal] = useState(false);

  const [styleObject, setStyleObject] = useState({
    bottom: 0,
    left: 0,
    width: 0,
  });

  const splitButtonContainerRef = useRef(null);
  useEffect(() => {
    const handleResize = () => {
      const rect = splitButtonContainerRef.current?.getBoundingClientRect();
      if (rect) {
        setStyleObject({
          bottom: rect.bottom,
          left: rect.left,
          width: rect.width,
        });
      }
    };
    handleResize(); // Call it initially
    window.addEventListener("scroll", handleResize);
    window.addEventListener("resize", handleResize);
    return () => {
      (window.removeEventListener("resize", handleResize),
        window.removeEventListener("scroll", handleResize));
    };
  }, []);


  return (
    <>
      <div
        className={styles["split-Button-Container"]}
        ref={splitButtonContainerRef}
      >
        <div className={styles["selected-Option"]}>{selectedOption}</div>
        <div
          className={styles["button-Options-Toggler"]}
          onClick={() => {
            setOpenModal(!openModal);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
          </svg>
        </div>
      </div>
      {openModal && <OptionsModal styleObject={styleObject} openModal={openModal} setOpenModal={setOpenModal} options={options} setSelectedOption ={setSelectedOption} />}
    </>
  );
};

export default SplitButton;
