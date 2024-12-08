import { createLazyFileRoute } from '@tanstack/react-router';
import styles from '../styles/about.module.css';

export const Route = createLazyFileRoute( '/about' )( {
    component: About,
} );

function About() {
    return <main className={styles.main}>
        <h1>About</h1>
    </main>;
}