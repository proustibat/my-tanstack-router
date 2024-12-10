import React, { Suspense } from "react";
import { createRootRoute, Outlet } from '@tanstack/react-router';
import Header from "../common/components/header";

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
    component: () => (
        <Suspense>
            <Header />
            <Outlet />
            <TanStackRouterDevtools initialIsOpen={false} />
        </Suspense>
    ),
} );