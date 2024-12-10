import { createLazyFileRoute } from '@tanstack/react-router';
import TodoApp from "../pages/todo";

export const Route = createLazyFileRoute( '/todo' )( {
    component: Todo,
} );

function Todo() {
    return <TodoApp />;
}