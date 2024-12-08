import { createLazyFileRoute } from '@tanstack/react-router';
import RockPaperScissors from "../components/rps/rock-paper-scissors.tsx";

export const Route = createLazyFileRoute( '/rps' )( {
    component: RPS,
} );

function RPS() {
    return <RockPaperScissors />;
}
