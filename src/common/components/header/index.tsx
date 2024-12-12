import { ReactElement } from "react";
import {Link, LinkProps} from "@tanstack/react-router";

import {StyledNav} from "./header.style.tsx";


const links: LinkProps[] = [
    {to: "/", children: "Home" },
    {to: "/todo", children: "Todo" },
    {to: "/rps", children: "Rock Paper Scissors" },
    {to: "/about", children: "About" },
    {to: "/universe", children: "Universe" },
];

const Header = (): ReactElement => {
    return (
        <StyledNav>
            {
                links.map(linkOptionsProps => {
                    return <Link key={linkOptionsProps.to} activeProps={{ className: "active"}} {...linkOptionsProps} />
                })
            }
        </StyledNav>
    );
};

export default Header;