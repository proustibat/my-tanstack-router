import { createLazyFileRoute } from '@tanstack/react-router';

import fonts from "../common/modern-fonts.module.css";

export const Route = createLazyFileRoute( '/' )( {
    component: Index,
} );

function Index() {
    return (
        <main className={fonts.roundedSans}>
            <h1>Hello world!</h1>
        </main>
    );
}