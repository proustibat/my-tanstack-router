import React, {Suspense, useContext} from "react";
import { createRootRoute, Outlet } from '@tanstack/react-router';
import Header from "../common/components/header";
import FontSwitcher from "../common/components/font-switcher";
import fonts from "../common/modern-fonts.module.css";
import {FontContext} from "../contexts/FontContext.tsx";

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

export const Route = createRootRoute( {
    component: () => {
        const {font} = useContext(FontContext);
        return (
            <Suspense>
                <div {...(font && {className: fonts[font]})} >
                    <Header />
                    <FontSwitcher />
                    <Outlet/>
                </div>
                <TanStackRouterDevtools initialIsOpen={false}/>
            </Suspense>
            )
    },
} );