import {PropsWithChildren, ReactElement, useContext, MouseEvent} from "react";
import styles from "./modal.module.css"
import {FontContext} from "../../../contexts/FontContext.tsx";
import classnames from "classnames";
import fonts from "../../modern-fonts.module.css";

interface ModalContentProps {
   toggleModal: (e: MouseEvent<HTMLDivElement>) => void;
}

const ModalContent = ( { toggleModal, children }: PropsWithChildren<ModalContentProps> ): ReactElement => {
    const {font} = useContext(FontContext);
    return (
        <div
            data-js="modal"
            className={classnames(
                styles.modalContent,
                fonts[font]
            )}
            onClick={toggleModal}
    >
            {children}
            <button data-js="modal" className="button">Close</button>

        </div>
    );
};

export default ModalContent;