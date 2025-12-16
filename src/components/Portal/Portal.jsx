import { createPortal } from "react-dom";
import styles from "../Portal/Portal.module.css";

const modalRootEl = document.querySelector("#portal");

function Portal(props)
{
    return  createPortal(<>{ props.children }</>, modalRootEl);
}

export default Portal
