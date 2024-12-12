import React, {MouseEvent, Suspense, useContext, useEffect, useState} from "react";
import { createRootRoute, Outlet } from '@tanstack/react-router';
import Header from "../common/components/header";
import FontSwitcher from "../common/components/font-switcher";
import {FontContext} from "../contexts/FontContext.tsx";
import Modal from "../common/components/modal";
import ModalContent from "../common/components/modal/modal-content.tsx";

import fonts from "../common/modern-fonts.module.css";

const TanStackRouterDevtools =
    process.env.NODE_ENV === 'production'
        ? () => null // Render nothing in production
        : React.lazy( () =>
            // Lazy load in development
            import( '@tanstack/router-devtools' ).then( ( res ) => ( {
                default: res.TanStackRouterDevtools,
                // For Embedded Mode
                // default: res.TanStackRouterDevtoolsPanel
            } ) ),
        );

const AppRoot = () => {
    const {font} = useContext(FontContext);
    const [showModal, setShowModal] = useState(false);
    const toggleModal = (e: MouseEvent<HTMLDivElement|HTMLButtonElement>) => {
        const target = e.target;
        if((target as (HTMLDivElement|HTMLButtonElement)).getAttribute("data-js") === "modal") {
            setShowModal(showModal => !showModal)
        }
    }

    useEffect(() => {
        const body = document.querySelector("body")
        if(!body) return;
        if (showModal) {
            body.style.overflow = "hidden"
            body.style.height = "100vh"
        } else {
            body.style.overflow = ""
            body.style.height = ""
        }
    },[showModal])

    return (
        <Suspense>
            <div {...(font && {className: fonts[font]})} >
                <Header/>
                <button style={{display: "block", margin: "auto"}} data-js="modal" onClick={toggleModal} className="button">Change font</button>
                <Outlet/>
                {showModal && (
                    <Modal>
                        <ModalContent toggleModal={toggleModal}>
                            <FontSwitcher />
                        </ModalContent>
                    </Modal>
                )}
            </div>
            <TanStackRouterDevtools initialIsOpen={false}/>
        </Suspense>
    )
 }
    export const Route = createRootRoute( { component: AppRoot } );