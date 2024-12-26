import { createLazyFileRoute } from '@tanstack/react-router'
import Wip from "../pages/wip";

export const Route = createLazyFileRoute('/wip')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Wip />
}
