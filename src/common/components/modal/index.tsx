import {createPortal} from "react-dom";
import {PropsWithChildren} from "react";

const Modal = ({children}: PropsWithChildren) => {
    const modalEl = document.querySelector("#modal");
    return modalEl
        ? createPortal(children, modalEl)
        : null;
}

export default Modal;