import { ReactElement } from "react";
import { Link } from "@tanstack/react-router";

import styles from "./header.module.css";

const Header = (): ReactElement => {
    return (
        <nav className={styles.header}>
            <Link to="/" className="[&.active]:font-bold">
                Home
            </Link>
            <Link to="/rps" className="[&.active]:font-bold">
                RPS
            </Link>
            <Link to="/about" className="[&.active]:font-bold">
                About
            </Link>
        </nav>
    );
};

export default Header;