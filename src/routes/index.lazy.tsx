import { createLazyFileRoute } from '@tanstack/react-router';
import styles from "../styles/index.module.css";

export const Route = createLazyFileRoute( '/' )( {
    component: Index,
} );

function Index() {
    return (
        <main className={styles.main}>
            <h1>Hello world!</h1>
        </main>
    );
}