import React, {Suspense, useState} from "react";
import { createRootRoute, Outlet } from '@tanstack/react-router';
import Header from "../common/components/header";
import FontSwitcher, {options, type Value} from "../common/components/font-switcher";
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

export const Route = createRootRoute( {
    component: () => {
        const [font, setFont] = useState<Value>(options[9].value);
        const onFontSelected = (value: Value) => {
            setFont(value)
        }
        return (
            <Suspense>
                <div {...(font && {className: fonts[font]})} >
                    <Header />
                    <FontSwitcher onFontSelected={onFontSelected} defaultFont={options[9].value} />
                    <Outlet/>
                </div>
                <TanStackRouterDevtools initialIsOpen={false}/>
            </Suspense>
            )
    },
} );