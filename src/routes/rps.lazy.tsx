import { createLazyFileRoute } from '@tanstack/react-router';
import RockPaperScissorsApp from "../pages/rps";

export const Route = createLazyFileRoute( '/rps' )( {
    component: RPS,
} );

function RPS() {
    return <RockPaperScissorsApp />;
}
