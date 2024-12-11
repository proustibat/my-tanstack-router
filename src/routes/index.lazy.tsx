import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute( '/' )( {
    component: Index,
} );

function Index() {
    return (
        <main>
            <h1>Hello world!</h1>
        </main>
    );
}