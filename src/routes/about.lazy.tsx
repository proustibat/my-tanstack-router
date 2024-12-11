import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute( '/about' )( {
    component: About,
} );

function About() {
    return <main>
        <h1>About</h1>
    </main>;
}