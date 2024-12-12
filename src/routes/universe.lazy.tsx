import { createLazyFileRoute } from '@tanstack/react-router'
import Universe from "../pages/universe";

export const Route = createLazyFileRoute('/universe')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Universe />;
}
