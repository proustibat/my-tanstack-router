import { createLazyFileRoute } from '@tanstack/react-router';
import RockPaperScissors from "../pages/rps";

export const Route = createLazyFileRoute( '/rps' )( {
    component: RPS,
} );

function RPS() {
    return <RockPaperScissors />;
}
