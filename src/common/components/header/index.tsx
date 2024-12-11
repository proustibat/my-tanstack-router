import { ReactElement } from "react";
import {Link, LinkProps} from "@tanstack/react-router";

import {StyledNav} from "./header.style.tsx";
import fonts from "../../modern-fonts.module.css";


const links: LinkProps[] = [
    {to: "/", children: "Home" },
    {to: "/todo", children: "Todo" },
    {to: "/rps", children: "Rock Paper Scissors" },
    {to: "/about", children: "About" },
];

const Header = (): ReactElement => {
    return (
        <StyledNav className={fonts.industrial}>
            {
                links.map(linkOptionsProps => {
                    return <Link key={linkOptionsProps.to} activeProps={{ className: "active"}} {...linkOptionsProps} />
                })
            }
        </StyledNav>
    );
};

export default Header;