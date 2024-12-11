import { createLazyFileRoute } from '@tanstack/react-router';

import fonts from "../common/modern-fonts.module.css";

export const Route = createLazyFileRoute( '/about' )( {
    component: About,
} );

function About() {
    return <main className={fonts.oldStyle}>
        <h1>About</h1>
    </main>;
}