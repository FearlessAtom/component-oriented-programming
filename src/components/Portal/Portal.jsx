import { createPortal } from "react-dom";

const modalRootEl = document.querySelector("#portal");

function Portal(props)
{
    return  createPortal(<>{ props.children }</>, modalRootEl);
}

export default Portal
